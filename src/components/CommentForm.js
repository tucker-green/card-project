import React, { useState } from "react";
import { db } from "../firebase-config";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { TextField, Button } from "@mui/material";

const CommentForm = ({ cardId }) => {
  const [commentText, setCommentText] = useState("");
  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!commentText.trim()) return;

    const commentCollectionRef = collection(db, "comments");
    await addDoc(commentCollectionRef, {
      cardId: cardId,
      userId: auth.currentUser.uid,
      commentText: commentText,
      createdAt: serverTimestamp(),
    });

    setCommentText(""); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        variant="outlined"
        size="small"
        style={{ marginBottom: "8px" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Post Comment
      </Button>
    </form>
  );
};

export default CommentForm;
