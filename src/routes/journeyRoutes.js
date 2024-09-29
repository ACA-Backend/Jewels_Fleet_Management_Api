import express from 'express';
import { createJourney, getJourneys, updateJourneyStatus } from '../app/controllers/journeyController.js';
import { authenticateJWT, isAdmin } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateJWT, isAdmin, createJourney);
router.get('/', authenticateJWT, getJourneys);
router.put('/:id/status', authenticateJWT, isAdmin, updateJourneyStatus);

export default router;