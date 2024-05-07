import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <a href="/Analytics">
          <div className="card">
            <img
              src="https://www.moneywehave.com/wp-content/uploads/2016/03/management-expense-ratio.jpg"
              alt="Card 1 Image"
            />
            <h3>Income Expense</h3>
            <p>Manages income and expense</p>
          </div>
          </a>
        <a href="/budget">
          <div className="card">
            <img
              src="https://www.mce-info.org/wp-content/uploads/2016/05/gerer-son-budget-1080x720.jpg"
              alt="Card 2 Image"
            />
            <h3>Budget Maker</h3>
            <p>Makes and manages expenses</p>
          </div>
        </a>
        <a href="http://localhost:5000/income">
          <div className="card">
            <img
              src="https://inspire.co.tz/wp-content/uploads/2021/04/tax-1080x720.jpg"
              alt="Card 3 Image"
            />
            <h3>Tax Payment Assist</h3>
            <p>Tax calculator</p>
          </div>
        </a>
        
        <div className="clearfix"></div> {/* Clear floats after the cards */}
      </div>
    </div>
  );
}