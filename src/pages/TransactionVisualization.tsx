// create charts for the transactions data
// create Bar Chart → Total spending per category.,
// Pie Chart → Percentage breakdown of spending per category.
// Line Chart → Spending trend over time.

import React from "react";
import { Transaction } from "../models/Transaction";
import TransactionService from "../services/TransactionService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";

const TransactionVisualization: React.FC = () => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const fetchedTransactions = await TransactionService.getTransactions();
      setTransactions(fetchedTransactions);
    };
    fetchTransactions();
  }, []);

  const totalSpendingPerCategory = transactions.reduce((acc, transaction) => {
    const category = transaction.category?.name || "Uncategorized";
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const spendingPerCategoryData = Object.entries(totalSpendingPerCategory).map(
    ([category, amount]) => ({ category, amount })
  );

  const spendingPerCategoryPercentageData = spendingPerCategoryData.map(
    (data) => ({
      category: data.category,
      percentage:
        (data.amount / transactions.reduce((acc, t) => acc + t.amount, 0)) *
        100,
    })
  );

  const spendingTrendData = transactions.map((transaction) => ({
    time: new Date(transaction.time).toLocaleDateString(),
    amount: transaction.amount,
  }));

  return (
    <div>
      <h1>Transaction Visualization</h1>
      <h2>Total Spending Per Category</h2>
      <BarChart
        width={800}
        height={400}
        data={spendingPerCategoryData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
      <h2>Percentage Breakdown of Spending Per Category</h2>
      <PieChart width={800} height={400}>
        <Pie
          data={spendingPerCategoryPercentageData}
          dataKey="percentage"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
      <h2>Spending Trend Over Time</h2>
      <LineChart
        width={800}
        height={400}
        data={spendingTrendData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default TransactionVisualization;
