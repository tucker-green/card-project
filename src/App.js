import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import CardList from "./components/CardList";
import CardUpload from "./components/CardUpload";
import LandingPage from "./components/Pages/LandingPage"; // Import the new component
//import Chat from "./components/Chat";
//import ChatPage from "./components/ChatPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import UserDashboard from "./components/Pages/UserDashboard";
import PersonalUserProfile from "./components/PersonalUserProfile";
import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
import MembersPage from "./components/Pages/MembersPage";

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
          <Route path="/profile" element={<PersonalUserProfile />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/upload" element={<CardUpload />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/dashboard"
            element={
              currentUser ? <UserDashboard user={currentUser} /> : <SignIn />
            }
          />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/members" element={<MembersPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
