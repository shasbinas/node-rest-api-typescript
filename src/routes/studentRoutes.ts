import express, { Router } from 'express';
import {
  addStudent,
  deleteStudent,
  getStudentMarks,
  getStudents,
  updateStudent,
} from '../controllers/studentController.js';
import { validate } from '../middleware/validation.middleware.js';
import {
  createStudentValidation,
  studentUpdateValidation,
} from '../validation/studentValidation.js';

// ✅ Create Express Router instance (with type support)
const studentRoutes: Router = express.Router({ mergeParams: true });

/**
 * ============================================
 * 🧠 STUDENT ROUTES
 * Base Path → /api/students
 * ============================================
 */

// ✅ POST /api/students → Add new student
studentRoutes.post('/', validate(createStudentValidation), addStudent);

// ✅ GET /api/students → Fetch all students (optionally filter by class)
studentRoutes.get('/', getStudents);

// ✅ GET /api/students/:id/marks → Get specific student marks
studentRoutes.get('/:id/marks', getStudentMarks);

// ✅ PATCH /api/students/:id → Update student info
studentRoutes.patch('/:id', validate(studentUpdateValidation), updateStudent);

// ✅ DELETE /api/students/:id → Delete a student
studentRoutes.delete('/:id', deleteStudent);

export default studentRoutes;
