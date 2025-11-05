import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { ProductRequestBody } from '../interfaces/product.interface.js';

/** ==========================================
 * ✅ Add Product (POST /api/products)
 * ========================================== */
export const addProduct = async (
  req: Request<{}, {}, ProductRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title, author, price, category, publisher, isbn, stock } = req.body;

    if (!title || !author || price === undefined) {
      res.status(400).json({ message: 'Title, author, and price are required' });
      return;
    }

    const product = await Product.create({
      title,
      author,
      price,
      category,
      publisher,
      isbn,
      stock,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

/** ==========================================
 * ✅ Get Products (GET /api/products)
 * Optional filters: category, minPrice, maxPrice
 * ========================================== */
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query: Record<string, any> = {};

    // Filter by category (case-insensitive)
    if (req.query.category) {
      query.category = {
        $regex: new RegExp(`^${String(req.query.category).trim()}$`, 'i'),
      };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

/** ==========================================
 * ✅ Update Product (PUT /api/products/:id)
 * ========================================== */
export const updateProduct = async (
  req: Request<{ id: string }, {}, Partial<ProductRequestBody>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid product ID' });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const updates = req.body;
    Object.assign(product, updates);

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

/** ==========================================
 * ✅ Delete Product (DELETE /api/products/:id)
 * ========================================== */
export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid product ID' });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
