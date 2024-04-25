import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { List, ListItem, ListItemText } from "@mui/material";

function UserList({ onUserSelect }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "users/");

    const unsubscribe = onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedUsers = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setUsers(loadedUsers);
        } else {
          console.log("No users found");
        }
      },
      (error) => {
        console.error("Firebase read failed: ", error);
      }
    );

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (users.length === 0) {
    return <p>No users available to chat with.</p>;
  }

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id} button onClick={() => onUserSelect(user.id)}>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default UserList;
