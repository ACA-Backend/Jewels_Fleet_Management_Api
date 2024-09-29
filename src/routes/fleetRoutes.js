import express from 'express';
import { createVehicle, getVehicles, updateVehicle, deleteVehicle } from '../app/controllers/fleetController.js';
import { authenticateJWT, isAdmin } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateJWT, isAdmin, createVehicle);
router.get('/', authenticateJWT, getVehicles);
router.put('/:id', authenticateJWT, isAdmin, updateVehicle);
router.delete('/:id', authenticateJWT, isAdmin, deleteVehicle);

export default router;