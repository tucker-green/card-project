import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { List, ListItem, ListItemText } from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userData = await getDocs(usersCollection);
      setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchUsers();
  }, []);

  return (
    <List>
      {users.map((user) => (
        <ListItem
          button
          component={Link}
          to={`/users/${user.id}`}
          key={user.id}
        >
          <ListItemText primary={user.displayName} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
