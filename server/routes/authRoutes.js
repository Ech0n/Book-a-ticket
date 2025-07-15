
import express from 'express';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();


/**
 * @swagger
 * /api/auth/register:
*   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       409:
 *         description: Email already used
 */
router.post('/register', registerUser);

export default router;
