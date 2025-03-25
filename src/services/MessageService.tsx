// write a api that will do crud operations on messages

import { Message } from "../models/Message";

const API_URL = "http://localhost:8080/messages";

export class MessageService {
  static async getMessage(id: number): Promise<Message> {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  }

  static async getMessages(): Promise<Message[]> {
    const response = await fetch(API_URL);
    return await response.json();
  }

  static async createMessage(message: Message): Promise<Message> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    return await response.json();
  }

  static async updateMessage(message: Message): Promise<Message> {
    const response = await fetch(`${API_URL}/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    return await response.json();
  }

  static async deleteMessage(message: Message): Promise<void> {
    await fetch(`${API_URL}/${message.id}`, {
      method: "DELETE",
    });
  }
}
