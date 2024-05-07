import express from 'express';
import {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/budget.controller.js";

// Router object
const router = express.Router();

// Routes
// Add transaction POST method
router.post("/add-btransaction", addTransaction);
// Edit transaction POST method
router.post("/edit-btransaction", editTransaction);
// Delete transaction POST method
router.post("/delete-btransaction", deleteTransaction);
// Get transactions
router.post("/get-btransaction", getAllTransaction);

export default router;
