import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const PersonalUserProfile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
      setPhotoURL(user.photoURL || "");
      // Fetch additional user data from Firestore
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setFavoriteTeam(docSnap.data().favoriteTeam || "");
        }
      });
    }
  }, [user, db]);

  const handleUpdate = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      // Update favorite team in Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favoriteTeam: favoriteTeam,
      });
      alert("Profile updated successfully!");
    }
  };

  const teams = [
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

  if (!user) {
    return (
      <Typography variant="h6">Please sign in to view this page.</Typography>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, margin: 2 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Avatar sx={{ width: 56, height: 56, marginBottom: 2 }} src={photoURL}>
        {!photoURL && (displayName.charAt(0) || "U")}
      </Avatar>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Display Name"
            variant="outlined"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Photo URL"
            variant="outlined"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="favorite-team-label">Favorite Team</InputLabel>
            <Select
              labelId="favorite-team-label"
              id="favorite-team-select"
              value={favoriteTeam}
              label="Favorite Team"
              onChange={(e) => setFavoriteTeam(e.target.value)}
            >
              {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalUserProfile;
