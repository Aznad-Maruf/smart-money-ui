//create a component that will hold a form for transaction to create / update / view / delete
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Category } from "../models/Category";
import { Transaction, TransactionType } from "../models/Transaction";
import { TransactionService } from "../services/TransactionService";
import { CategoryService } from "../services/CategoryService";

interface TransactionFormProps {
  transaction?: Transaction;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Example: Fetch categories from a service or API
  React.useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await CategoryService.getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const [transactionAmount, setTransactionAmount] = useState(
    transaction?.amount || 0
  );
  const [transactionType, setTransactionType] = useState(
    transaction?.type || TransactionType.EXPENSE
  );
  const [transactionCategory, setTransactionCategory] = useState(
    transaction?.category || undefined
  );
  const [transactionDescription, setTransactionDescription] = useState(
    transaction?.description || ""
  );
  const [transactionTime, setTransactionTime] = useState(
    transaction?.time || new Date()
  );
  const isNew = !transaction;

  const handleSave = async () => {
    if (isNew) {
      transaction = {
        amount: 0,
        type: TransactionType.EXPENSE,
        time: new Date(),
      };

      await TransactionService.createTransaction({
        ...transaction,
        amount: transactionAmount,
        type: transactionType,
        category: transactionCategory,
        description: transactionDescription,
        time: transactionTime,
      });
    } else {
      await TransactionService.updateTransaction({
        ...transaction,
        amount: transactionAmount,
        type: transactionType,
        category: transactionCategory,
        description: transactionDescription,
        time: transactionTime,
      });
    }
  };

  return (
    <Form>
      <Form.Group controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          value={transactionType}
          onChange={(e) =>
            setTransactionType(e.target.value as TransactionType)
          }
        >
          <option value={TransactionType.EXPENSE}>Expense</option>
          <option value={TransactionType.INCOME}>Income</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={transactionCategory?.id}
          onChange={(e) => {
            const categoryId = Number(e.target.value);
            setTransactionCategory(categoryId ? { id: categoryId } : undefined);
          }}
        >
          <option value={""}>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={transactionDescription}
          onChange={(e) => setTransactionDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="time">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="datetime-local"
          value={transactionTime.toISOString().substring(0, 16)}
          onChange={(e) => setTransactionTime(new Date(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleSave}>{isNew ? "Save" : "Update"}</Button>
    </Form>
  );
};

export default TransactionForm;
