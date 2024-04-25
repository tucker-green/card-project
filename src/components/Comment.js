import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
} from "@mui/material";

// Mock function to simulate adding a comment
const addComment = (commentData) => {
  console.log("Adding comment:", commentData);
  return Promise.resolve();
};

const Comment = ({ cardId }) => {
  const [comments, setComments] = useState([
    { id: 1, text: "Great card!" },
    { id: 2, text: "Wow, so rare!" },
  ]);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      id: comments.length + 1,
      text: commentText,
    };
    addComment({ cardId, text: commentText }).then(() => {
      setComments([...comments, newComment]);
      setCommentText("");
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        margin: "auto",
        padding: 2,
      }}
    >
      <List component="nav" aria-label="mailbox folders">
        {comments.map((comment) => (
          <ListItem key={comment.id} divider>
            <ListItemText primary={comment.text} />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Comment"
          variant="outlined"
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={{ marginTop: 10 }}
        >
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

export default Comment;
