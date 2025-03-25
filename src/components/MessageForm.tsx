// create a page that will hold a form with a text area to input message and a save/update button based on the props passed to it
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Message } from "../models/Message";
import { MessageService } from "../services/MessageService";

interface MessageFormProps {
  message?: Message;
}

const MessageForm: React.FC<MessageFormProps> = ({ message }) => {
  const [messageText, setMessageText] = useState(message?.message || "");
  const isNew = !message;

  const handleSave = async () => {
    if (isNew) {
      message = {
        message: "",
      };

      await MessageService.createMessage({ ...message, message: messageText });
    } else {
      await MessageService.updateMessage({ ...message, message: messageText });
    }
  };

  return (
    <Form>
      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleSave}>{isNew ? "Save" : "Update"}</Button>
    </Form>
  );
};

export default MessageForm;
