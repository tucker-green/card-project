import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import CardList from "./components/CardList";
import CardUpload from "./components/CardUpload";
import Comment from "./components/Comment";
import LandingPage from "./components/LandingPage"; // Import the new component
import Chat from "./components/Chat";
import ChatPage from "./components/ChatPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/cards" element={<CardList />} />
          <Route path="/upload" element={<CardUpload />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/comments" element={<Comment cardId={1} />} />
          <Route
            path="/dashboard"
            element={
              currentUser ? <UserDashboard user={currentUser} /> : <SignIn />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
