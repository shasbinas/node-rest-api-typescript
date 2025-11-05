import express, { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { verifyAdmin, verifyUser } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validation.middleware.js';
import {
  createProductValidation,
  updateProductValidation,
} from '../validation/productValidation.js';

const productRoutes: Router = express.Router({ mergeParams: true });

// ✅ POST /api/products → Add a new product (Admin only)
productRoutes.post('/', verifyAdmin, validate(createProductValidation), addProduct);

// ✅ GET /api/products → Get all products (User or Admin)
productRoutes.get('/', verifyUser, getProducts);

// ✅ PATCH /api/products/:id → Update product (Admin only)
productRoutes.patch('/:id', verifyAdmin, validate(updateProductValidation), updateProduct);

// ✅ DELETE /api/products/:id → Delete product (Admin only)
productRoutes.delete('/:id', verifyAdmin, deleteProduct);

export default productRoutes;
