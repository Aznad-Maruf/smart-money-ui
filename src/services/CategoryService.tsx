// write a api that will do crud operations on categories

import { Category } from "../models/Category";

const API_URL = "http://localhost:8080/categories";

export class CategoryService {
  static async getCategory(id: number): Promise<Category> {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  }

  static async getCategories(): Promise<Category[]> {
    const response = await fetch(API_URL);
    return await response.json();
  }

  static async createCategory(category: Category): Promise<Category> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    return await response.json();
  }

  static async updateCategory(category: Category): Promise<Category> {
    const response = await fetch(`${API_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    return await response.json();
  }

  static async deleteCategory(uuid: string): Promise<void> {
    await fetch(`${API_URL}/${uuid}`, {
      method: "DELETE",
    });
  }
}
