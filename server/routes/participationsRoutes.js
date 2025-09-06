import express from 'express';
import { addParticipation, getEventsByUser, removeParticipation } from '../controllers/participationController.js';

const router = express.Router();

/**
 * @swagger
 * /api/participations/{userId}:
 *   get:
 *     summary: Get all participations for a user
 *     description: Retrieve a list of all events a user is participating in
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
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

/**
 * @swagger
 * /api/participations:
 *   delete:
 *     summary: Remove a participation
 *     description: Cancel a user's reservation in an event
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
router.delete('/', removeParticipation);

export default router;