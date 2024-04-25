// src/components/Chat.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function Chat({ chatId }) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const db = getDatabase();
  const messagesRef = ref(db, `chats/${chatId}/messages`);

  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedMessages = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setMessages(loadedMessages.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      push(messagesRef, {
        text: newMessage,
        timestamp: Date.now(),
        senderId: "currentUser", // Adjust as needed based on your auth setup
      });
      setNewMessage("");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Chat Room
      </Typography>
      <List sx={{ maxHeight: 300, overflow: "auto" }}>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemText
              primary={msg.text}
              secondary={`Sent at ${new Date(
                msg.timestamp
              ).toLocaleTimeString()}`}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        variant="outlined"
        label="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendMessage}
        sx={{ mt: 2 }}
      >
        Send
      </Button>
    </Box>
  );
}

export default Chat;
