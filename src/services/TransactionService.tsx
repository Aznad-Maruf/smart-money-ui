// write a api that will do crud operations on transactions
import { Transaction } from "../models/Transaction";

const API_URL = "http://localhost:8080/transactions";

export class TransactionService {
  static async getTransaction(id: number): Promise<Transaction> {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  }

  static async getTransactions(): Promise<Transaction[]> {
    const response = await fetch(API_URL);
    return await response.json();
  }

  static async createTransaction(
    transaction: Transaction
  ): Promise<Transaction> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    return await response.json();
  }

  static async updateTransaction(
    transaction: Transaction
  ): Promise<Transaction> {
    const response = await fetch(`${API_URL}/${transaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    return await response.json();
  }

  static async deleteTransaction(transaction: Transaction): Promise<void> {
    await fetch(`${API_URL}/${transaction.id}`, {
      method: "DELETE",
    });
  }

  static async uploadFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
  }
}

export default TransactionService;
