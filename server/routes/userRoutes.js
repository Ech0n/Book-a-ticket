import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { getCurrentUser } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current authenticated user
 *     description: Returns information about the currently logged-in user based on JWT in httpOnly cookie.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get('/me', protectedRoute, getCurrentUser);

export default router;
