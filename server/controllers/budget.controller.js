import budgetModel from "../models/budget.model.js";
import moment from 'moment';

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;
    const transactions = await budgetModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await budgetModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  try {
    await budgetModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edit Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new budgetModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
