import express, { Router } from 'express';
import { getUserByIdPublic, getUsers } from '../controllers/userController.js';

const userRoutes: Router = express.Router({ mergeParams: true });

// ✅ GET /api/users → Fetch all users (with optional filters)
userRoutes.get('/', getUsers);

// ✅ GET /api/users/:id → Fetch single user by ID
userRoutes.get('/:id', getUserByIdPublic);

export default userRoutes;
