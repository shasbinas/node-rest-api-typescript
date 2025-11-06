import mongoose from 'mongoose';
import Product from '../models/Product.js';
export const addProduct = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
export const getProducts = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = {
                $regex: new RegExp(`^${String(req.query.category).trim()}$`, 'i'),
            };
        }
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice)
                query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice)
                query.price.$lte = Number(req.query.maxPrice);
        }
        const products = await Product.find(query);
        res.status(200).json(products);
    }
    catch (err) {
        next(err);
    }
};
export const updateProduct = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
export const deleteProduct = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=productController.js.map