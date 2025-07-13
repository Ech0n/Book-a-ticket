
import express from 'express';
import { getAllEvents, getFeatured } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/featured', getFeatured);

export default router;