// UserCards.js
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const UserCards = () => {
  const [cards, setCards] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const cardsCollection = collection(db, "cards");
      const q = query(cardsCollection, where("userId", "==", user.uid));

      const fetchCards = async () => {
        const querySnapshot = await getDocs(q);
        const fetchedCards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(fetchedCards);
      };

      fetchCards().catch(console.error);
    }
  }, [user]);

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2">{card.description}</Typography>
              {card.imageUrl && (
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  style={{ width: "100%" }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
      {cards.length === 0 && <p>No cards found.</p>}
    </Grid>
  );
};

export default UserCards;
