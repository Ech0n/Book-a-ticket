import express from 'express';
import { addParticipation, getEventsByUser } from '../controllers/participationController.js';

const router = express.Router();

/**
 * @swagger
 * /api/participations:
 *   get:
 *     summary: Get all participations for a user
 *     description: Retrieve a list of all events a user is participating in
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:userId', getEventsByUser);


/**
 * @swagger
 * /api/participations:
 *   post:
 *     summary: Add a participation
 *     description: Reserve a spot for a user in an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', addParticipation);

export default router;