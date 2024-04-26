import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase-config";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  CardMedia,
} from "@mui/material";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such user!");
      }
    };

    const fetchCards = async () => {
      const cardsRef = collection(db, "cards");
      const q = query(cardsRef, where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      const fetchedCards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(fetchedCards);
    };

    if (id) {
      fetchUser();
      fetchCards();
    }
  }, [id]);

  return (
    <Box sx={{ flexGrow: 1, m: 3 }}>
      {user ? (
        <>
          <Paper sx={{ p: 3, marginBottom: 3 }} elevation={3}>
            <Typography variant="h3" gutterBottom>
              {user.displayName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Favorite Team: {user.favoriteTeam}
            </Typography>
          </Paper>
          <Typography variant="h4" gutterBottom>
            {user.displayName}'s Cards
          </Typography>
          <Grid container spacing={2}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={card.imageUrl}
                    alt={card.title}
                    sx={{ maxHeight: 300 }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2">{card.description}</Typography>
                    {/* Comment section for each card */}
                    <CommentForm cardId={card.id} />
                    <Comments cardId={card.id} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default UserProfile;
