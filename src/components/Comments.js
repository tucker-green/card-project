import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  query,
  collection,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { getAuth } from "firebase/auth";
import { formatDistanceToNow } from "date-fns";

const Comments = ({ cardId }) => {
  const [comments, setComments] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const q = query(collection(db, "comments"), where("cardId", "==", cardId));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const commentsDataPromises = querySnapshot.docs.map(
        async (docSnapshot) => {
          const commentData = docSnapshot.data();
          const userRef = doc(db, "users", commentData.userId);
          const userSnap = await getDoc(userRef);
          return {
            ...commentData,
            userName: userSnap.exists()
              ? userSnap.data().displayName
              : "Anonymous",
            userPhoto: userSnap.exists()
              ? userSnap.data().photoUrl
              : "/default-avatar.png",
            createdAt: commentData.createdAt?.toDate() || new Date(), // Safely access toDate and provide a default
            id: docSnapshot.id,
          };
        }
      );

      const commentsData = await Promise.all(commentsDataPromises);
      // Sort comments by createdAt date, newest first
      commentsData.sort((a, b) => b.createdAt - a.createdAt);
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [cardId]);

  const toggleLikeComment = async (commentId) => {
    const commentRef = doc(db, "comments", commentId);
    const alreadyLiked = comments
      .find((comment) => comment.id === commentId)
      ?.likes?.includes(auth.currentUser.uid);

    if (alreadyLiked) {
      await updateDoc(commentRef, {
        likes: arrayRemove(auth.currentUser.uid),
      });
    } else {
      await updateDoc(commentRef, {
        likes: arrayUnion(auth.currentUser.uid),
      });
    }
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {comments.map((comment) => (
        <ListItem alignItems="flex-start" key={comment.id}>
          <ListItemAvatar>
            <Avatar
              alt={comment.userName || "Anonymous"}
              src={comment.userPhoto || "/default-avatar.png"}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component="span" variant="body2" color="text.primary">
                {comment.userName || "Anonymous"} — {comment.commentText}
              </Typography>
            }
            secondary={
              <>
                {comment.createdAt && (
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {formatDistanceToNow(comment.createdAt, {
                      addSuffix: true,
                    })}
                  </Typography>
                )}
                <IconButton
                  onClick={() => toggleLikeComment(comment.id)}
                  size="small"
                  color={
                    comment.likes?.includes(auth.currentUser.uid)
                      ? "primary"
                      : "default"
                  }
                >
                  <ThumbUpAltIcon fontSize="small" />
                </IconButton>
                {comment.likes?.length || 0} Likes
              </>
            }
          />
        </ListItem>
      ))}
      {comments.length === 0 && <Typography>No comments yet.</Typography>}
    </List>
  );
};

export default Comments;
