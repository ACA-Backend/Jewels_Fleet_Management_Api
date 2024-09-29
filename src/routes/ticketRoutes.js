import express from 'express';
import { bookTicket, cancelTicket, getTickets } from '../app/controllers/ticketController.js';
import { authenticateJWT, isAdmin } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/book', authenticateJWT, bookTicket);
router.put('/:id/cancel', authenticateJWT, cancelTicket);
router.get('/', authenticateJWT, isAdmin, getTickets);

export default router;