import express from 'express';
import { getIncomeSum, getExpenseSum } from '../controllers/sum.controller.js';

const router = express.Router();

// Route to get sum of income amounts
router.get('/income/sum', getIncomeSum);

// Route to get sum of expense amounts
router.get('/expense/sum', getExpenseSum);

export default router;
