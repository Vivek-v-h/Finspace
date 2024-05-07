import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";

const fetchIncomeSum = async () => {
  try {
    const response = await axios.get('/api/v1/sum/income/sum');
    return response.data; // This will contain the sum of income amounts
  } catch (error) {
    console.error('Error fetching income sum:', error);
    return null;
  }
};

const fetchExpenseSum = async () => {
  try {
    const response = await axios.get('/api/v1/sum/expense/sum');
    return response.data; // This will contain the sum of expense amounts
  } catch (error) {
    console.error('Error fetching expense sum:', error);
    return null;
  }
};

const Budget = () => {
    const [incomeSum, setIncomeSum] = useState(null);
    const [expenseSum, setExpenseSum] = useState(null);
  
    useEffect(() => {
      const getIncomeSum = async () => {
        const sum = await fetchIncomeSum();
        setIncomeSum(sum?.totalIncome); // Access the 'totalIncome' property from the 'sum' object
      };
  
      const getExpenseSum = async () => {
        const sum = await fetchExpenseSum();
        setExpenseSum(sum?.totalExpense); // Access the 'totalExpense' property from the 'sum' object
      };
  
      getIncomeSum();
      getExpenseSum();
    }, []);
    var sam=incomeSum-expenseSum
    return (
      <div className=''>
        <div class="container">
          <h1 class="H">BUDGET</h1>
  
          <div class="financial-info">
            <div class="info-field horizontal-left">
              <strong className="S">Expected Income:</strong>{" "}
              <span className="s" id="expected-income">
                {incomeSum}
              </span>
            </div>
  
            <div class="info-field horizontal-right">
              <strong className="S">Expected Expense:</strong>
              <span className="s" id="total-income">
                {expenseSum}
              </span>
            </div>
            <br />
            <br />
            <div class="info-field center">
              <strong className="S">Expected Saving:</strong>{" "}
              <span className="s" id="expected-saving">
                {sam}
              </span>
            </div>
          </div>
  
          <br />
        </div>
      </div>
    );
  }
  

export default Budget;
