// src/components/ChatPage.js
import React, { useState } from "react";
import UserList from "../UserList";
import Chat from "../Chat";

function startChat(userId, otherUserId) {
  const chatId = [userId, otherUserId].sort().join("_"); // Creates a sorted, consistent chat ID
  return chatId;
}

function ChatPage({ currentUser }) {
  console.log("Current User:", currentUser); // Check if currentUser is passed correctly

  const [activeChatId, setActiveChatId] = useState(null);
  const handleUserSelect = (otherUserId) => {
    const chatId = startChat(currentUser.id, otherUserId);
    setActiveChatId(chatId);
  };

  if (!currentUser) {
    return <p>Please sign in to view chats.</p>; // Shows a message if currentUser is not available
  }

  return (
    <div>
      <UserList onUserSelect={handleUserSelect} />
      {activeChatId ? (
        <Chat chatId={activeChatId} />
      ) : (
        <p>Select a user to start chatting.</p>
      )}
    </div>
  );
}

export default ChatPage;
