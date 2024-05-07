import budgetModel from '../models/budget.model.js'; // Import your Mongoose model

// Controller function to fetch sum of income amounts
export const getIncomeSum = async (req, res) => {
  try {
    // Use aggregation pipeline to calculate sum of income amounts
    const result = await budgetModel.aggregate([
      {
        $match: { type: 'income' } // Filter documents with type 'income'
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' } // Calculate sum of 'amount' field
        }
      }
    ]);

    // If there are no documents or the sum is null, return 0 as the sum
    const incomeSum = result.length > 0 ? result[0].totalIncome : 0;

    // Return the sum as JSON response
    res.json({ totalIncome: incomeSum });
  } catch (error) {
    // Handle errors
    console.error('Error fetching income sum:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to fetch sum of expense amounts
export const getExpenseSum = async (req, res) => {
  try {
    // Use aggregation pipeline to calculate sum of expense amounts
    const result = await budgetModel.aggregate([
      {
        $match: { type: 'expense' } // Filter documents with type 'expense'
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: '$amount' } // Calculate sum of 'amount' field
        }
      }
    ]);

    // If there are no documents or the sum is null, return 0 as the sum
    const expenseSum = result.length > 0 ? result[0].totalExpense : 0;

    // Return the sum as JSON response
    res.json({ totalExpense: expenseSum });
  } catch (error) {
    // Handle errors
    console.error('Error fetching expense sum:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
