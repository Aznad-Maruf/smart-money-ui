// create a page that will fetch all messages from the backend and display them in a list.

import React, { useEffect, useState } from "react";
import { Message } from "../models/Message";
import { MessageService } from "../services/MessageService";

const MessageListPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await MessageService.getMessages();
      setMessages(messages);
    };
    fetchMessages();
  }, []);

  return (
    <div>
      {messages?.map((message) => (
        <div key={message.id}>{message.message}</div>
      ))}
    </div>
  );
};

export default MessageListPage;
