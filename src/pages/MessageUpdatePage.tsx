// create a page using the MessageForm component. fetch message with id from the backend and pass it to the MessageForm component

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageForm from "../components/MessageForm";
import { Message } from "../models/Message";
import { MessageService } from "../services/MessageService";

const MessageUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<Message>();

  useEffect(() => {
    const fetchMessage = async () => {
      const message = await MessageService.getMessage(Number(id));
      setMessage(message);
    };
    fetchMessage();
  }, [id]);

  return <div>{message && <MessageForm message={message} />}</div>;
};
