import express from 'express';
import { getEvents, addEvent, getFeatured } from '../controllers/eventsController.js';

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
router.get('/', getEvents);

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
router.post('/', addEvent);

/**
 * @swagger
 * /api/featured:
 *   get:
 *     summary: Get featured events
 *     description: Get list of all featured events
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/featured', getFeatured);

export default router;
