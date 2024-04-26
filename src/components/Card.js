import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import CommentForm from "./CommentForm"; // Adjust the path as necessary
import Comments from "./Comments"; // Adjust the path as necessary

const BaseballCard = ({ card }) => {
  return (
    <Box sx={{ margin: 2 }}>
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
      <Box sx={{ marginTop: 2 }}>
        <CommentForm cardId={card.id} />
        <Comments cardId={card.id} />
      </Box>
    </Box>
  );
};

export default BaseballCard;
