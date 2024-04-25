import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { getAuth } from "firebase/auth";
import { db } from "../firebase-config"; // Ensure this import points to your Firebase config file
import { addDoc, collection } from "firebase/firestore";
import { uploadImage } from "./uploadImage"; // Ensure this function and path are correctly set up for uploading images

const CardUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to upload cards.");
      return;
    }

    if (file) {
      const imageUrl = await uploadImage(file); // Assuming this function returns the URL from Firebase Storage
      await addDoc(collection(db, "cards"), {
        title,
        description,
        imageUrl,
        userId: user.uid, // Storing the user ID with the card details
        createdAt: new Date(),
      });
      alert("Card uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <TextField
          label="Card Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Card Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={{ marginTop: 20 }}
        >
          Upload Card
        </Button>
      </form>
    </Box>
  );
};

export default CardUpload;
