import React from "react";
import { Transaction } from "../models/Transaction";
import TransactionService from "../services/TransactionService";

// create a table with transactions data sortable by all porps order by date

const TransactionListPage: React.FC = () => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const fetchedTransactions = await TransactionService.getTransactions();
      setTransactions(fetchedTransactions);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category?.name}</td>
              <td>{transaction.description}</td>
              <td>{transaction.time.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionListPage;
