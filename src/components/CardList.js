import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Card from "./Card";
import Grid from "@mui/material/Grid";

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const querySnapshot = await getDocs(collection(db, "cards"));
      const cardData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(cardData);
    };

    fetchCards();
  }, []);

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <Card card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
