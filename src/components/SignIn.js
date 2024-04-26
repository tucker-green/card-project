import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config"; // Ensure that auth and db are properly imported
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateFirestoreUser(user); // Update Firestore with the user's info
      }
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, [navigate]);

  const updateFirestoreUser = async (user) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "No Name Provided",
        photoURL: user.photoURL || "No Photo URL Provided",
        lastLogin: new Date(), // Record the last login time
      },
      { merge: true }
    ) // Use merge to avoid overwriting existing fields
      .then(() => {
        console.log(`User ${user.uid} added/updated in Firestore.`);
      })
      .catch((error) => {
        console.error("Error adding/updating user in Firestore:", error);
      });
  };

  const handleSignIn = () => {
    if (isSignedIn) {
      signOut(auth)
        .then(() => console.log("User signed out"))
        .catch((error) => console.error(error));
    } else {
      signInWithPopup(auth, provider).catch((error) => console.error(error));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button variant="contained" onClick={handleSignIn}>
        {isSignedIn ? "Sign Out" : "Sign In With Google"}
      </Button>
    </div>
  );
};

export default SignIn;
