import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { uploadImage } from "./uploadImage";

const CardUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [year, setYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [refractorType, setRefractorType] = useState("");
  const [customRefractor, setCustomRefractor] = useState("");
  const [file, setFile] = useState(null);
  const auth = getAuth();

  const mlbTeams = [
    "Arizona Diamondbacks",
    "Atlanta Braves",
    "Baltimore Orioles",
    "Boston Red Sox",
    "Chicago Cubs",
    "Chicago White Sox",
    "Cincinnati Reds",
    "Cleveland Guardians",
    "Colorado Rockies",
    "Detroit Tigers",
    "Houston Astros",
    "Kansas City Royals",
    "Los Angeles Angels",
    "Los Angeles Dodgers",
    "Miami Marlins",
    "Milwaukee Brewers",
    "Minnesota Twins",
    "New York Mets",
    "New York Yankees",
    "Oakland Athletics",
    "Philadelphia Phillies",
    "Pittsburgh Pirates",
    "San Diego Padres",
    "San Francisco Giants",
    "Seattle Mariners",
    "St. Louis Cardinals",
    "Tampa Bay Rays",
    "Texas Rangers",
    "Toronto Blue Jays",
    "Washington Nationals",
  ];

  const refractorOptions = [
    "Other",
    "Allen & Ginter X Refractor",
    "Bowman Chrome Atomic Refractor",
    "Bowman Chrome Canary Refractor",
    "Bowman Chrome Gold Refractor",
    "Bowman Chrome Gold Shimmer Refractor",
    "Bowman Chrome Orange Refractor",
    "Bowman Chrome Purple Refractor",
    "Bowman Chrome Refractor",
    "Bowman Chrome Refractor Autograph",
    "Bowman Draft Black Refractor",
    "Bowman Draft Blue Refractor",
    "Bowman Draft Gold Refractor",
    "Bowman Draft Refractor",
    "Bowman Draft Sapphire Refractor",
    "Bowman Platinum Atomic Refractor",
    "Bowman Platinum Gold Refractor",
    "Bowman Platinum Refractor",
    "Bowman Platinum X-Fractor",
    "Bowman Sterling Atomic Refractor",
    "Bowman Sterling Blue Refractor",
    "Bowman Sterling Gold Refractor",
    "Bowman Sterling Refractor",
    "Bowman Sterling X-Fractor",
    "Bowman's Best Atomic Refractor",
    "Bowman's Best Blue Refractor",
    "Bowman's Best Gold Refractor",
    "Bowman's Best Refractor",
    "Bowman's Best Refractor Autograph",
    "Finest Refractor",
    "Panini Optic Refractor",
    "Prizm Refractor",
    "Select Refractor",
    "Stadium Club Chrome Refractor",
    "Topps Chrome Black Refractor",
    "Topps Chrome Blue Refractor",
    "Topps Chrome Green Refractor",
    "Topps Chrome Pink Refractor",
    "Topps Chrome Prism Refractor",
    "Topps Chrome Refractor",
    "Topps Chrome Sapphire Refractor",
    "Topps Chrome Sepia Refractor",
    "Topps Chrome Update Refractor",
    "Topps Finest X-Fractor",
    "Topps Gypsy Queen Chrome Refractor",
    "Topps Gypsy Queen Sepia Refractor",
    "Topps Heritage High Number Chrome Refractor",
    "Topps Museum Collection Refractor",
    "Topps Tribute Refractor",
    "Topps Update Chrome Refractor",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to upload cards.");
      return;
    }

    if (file) {
      const imageUrl = await uploadImage(file);
      await addDoc(collection(db, "cards"), {
        title,
        description,
        playerName,
        teamName,
        year,
        cardNumber,
        refractorType:
          refractorType === "Other" ? customRefractor : refractorType,
        imageUrl,
        userId: user.uid,
        createdAt: new Date(),
      });
      alert("Card uploaded successfully!");
      setTitle("");
      setDescription("");
      setPlayerName("");
      setTeamName("");
      setYear("");
      setCardNumber("");
      setRefractorType("");
      setCustomRefractor("");
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
          label="Player Name"
          variant="outlined"
          fullWidth
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="team-select-label">Team Name</InputLabel>
          <Select
            labelId="team-select-label"
            id="team-select"
            value={teamName}
            label="Team Name"
            onChange={(e) => setTeamName(e.target.value)}
          >
            {mlbTeams.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Year"
          variant="outlined"
          fullWidth
          value={year}
          onChange={(e) => setYear(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Card Number"
          variant="outlined"
          fullWidth
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="refractor-type-label">Refractor Type</InputLabel>
          <Select
            labelId="refractor-type-label"
            id="refractor-type-select"
            value={refractorType}
            label="Refractor Type"
            onChange={(e) => setRefractorType(e.target.value)}
          >
            {refractorOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {refractorType === "Other" && (
          <TextField
            label="Custom Refractor Type"
            variant="outlined"
            fullWidth
            value={customRefractor}
            onChange={(e) => setCustomRefractor(e.target.value)}
            margin="normal"
          />
        )}
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
