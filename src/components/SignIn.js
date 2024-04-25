import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { auth } from "../firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    if (isSignedIn) {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
        });
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
