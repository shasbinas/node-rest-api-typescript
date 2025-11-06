import express from 'express';
import { getUserByIdPublic, getUsers } from '../controllers/userController.js';
const userRoutes = express.Router({ mergeParams: true });
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserByIdPublic);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map