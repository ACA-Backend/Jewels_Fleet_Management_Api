import express from 'express';
import { createReport, getReports, generatePassengerManifest } from '../app/controllers/reportController.js';
import { authenticateJWT, isAdmin } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateJWT, isAdmin, createReport);
router.get('/', authenticateJWT, isAdmin, getReports);
router.get('/manifest/:journeyId', authenticateJWT, isAdmin, generatePassengerManifest);

export default router;