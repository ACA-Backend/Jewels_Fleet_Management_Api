import express from 'express';
import { createDestination, getDestinations, updateDestination, deleteDestination } from '../app/controllers/destinationController.js';
import { authenticateJWT, isAdmin } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateJWT, isAdmin, createDestination);
router.get('/', authenticateJWT, getDestinations);
router.put('/:id', authenticateJWT, isAdmin, updateDestination);
router.delete('/:id', authenticateJWT, isAdmin, deleteDestination);

export default router;