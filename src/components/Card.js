import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const BaseballCard = ({ card }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={card.imageUrl}
        alt="Baseball card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BaseballCard;
