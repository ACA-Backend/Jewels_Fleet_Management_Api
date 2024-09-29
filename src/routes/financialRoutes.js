import express from 'express';
import { getTransactions, generateFinancialReport } from '../app/controllers/financialController.js';
import { authenticateJWT, isAdmin } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.get('/transactions', authenticateJWT, isAdmin, getTransactions);
router.get('/report', authenticateJWT, isAdmin, generateFinancialReport);

export default router;