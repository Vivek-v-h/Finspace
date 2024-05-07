import express from 'express';
import {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

// Router object
const router = express.Router();

// Routes
// Add transaction POST method
router.post("/add-transaction", addTransaction);
// Edit transaction POST method
router.post("/edit-transaction", editTransaction);
// Delete transaction POST method
router.post("/delete-transaction", deleteTransaction);
// Get transactions
router.post("/get-transaction", getAllTransaction);

export default router;
