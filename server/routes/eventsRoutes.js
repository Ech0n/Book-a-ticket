import express from 'express';
import { handleGetAllEvents, handleGetFeatured, handleGetEvent, handleAddEvent } from '../controllers/eventsController.js';

const router = express.Router();

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     description: Get list of all events
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', handleGetAllEvents);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Add an event
 *     description: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               endDate:
 *                 type: string
 *                 format: date
 *               endTime:
 *                 type: string
 *                 format: time
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', handleAddEvent);

/**
 * @swagger
 * /api/events/featured:
 *   get:
 *     summary: Get featured events
 *     description: Get list of all featured events
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/featured', handleGetFeatured);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Get a specific event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Event not found
 */
router.get('/:id', handleGetEvent);

export default router;
