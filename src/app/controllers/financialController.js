import Transaction from '../models/transaction.js';

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate('userId ticketId');
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

const generateFinancialReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    const revenue = transactions.filter(t => t.type === 'purchase').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'refund').reduce((sum, t) => sum + t.amount, 0);
    const netProfit = revenue - expenses;

    res.json({startDate, endDate, revenue, expenses, netProfit });
    
  } catch (error) {
    next(error);
  }
};

export { getTransactions, generateFinancialReport };