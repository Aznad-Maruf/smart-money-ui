import { Category } from "./Category";

export interface Transaction {
  id?: number;
  uuid?: string;
  amount: number;
  type: TransactionType;
  category?: Category;
  description?: string;
  time: Date;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;
}

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
