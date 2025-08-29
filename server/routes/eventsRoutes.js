import express from 'express';
import { getEvents, getFeatured } from '../controllers/eventsController.js';

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
