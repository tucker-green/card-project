import React, { useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!acceptTerms) {
      alert("You must accept the terms of service.");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: displayName,
        // Additional fields can be updated here if supported
      })
        .then(() => {
          console.log("Profile updated successfully!");
          navigate("/dashboard"); // Redirect to a profile page or dashboard
        })
        .catch((error) => {
          console.error("Error updating profile", error);
        });
    }
  };

  const handleSkip = () => {
    navigate("/dashboard"); // Redirect if the user decides to skip
  };

  return (
    <Box padding={2} display="flex" flexDirection="column" alignItems="center">
      <TextField
        label="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
        }
        label="I accept the terms of service"
      />
      <Button variant="contained" onClick={handleRegister} sx={{ mt: 2 }}>
        Complete Registration
      </Button>
      <Button variant="text" onClick={handleSkip} sx={{ mt: 1 }}>
        Skip for Now
      </Button>
    </Box>
  );
};

export default Register;
