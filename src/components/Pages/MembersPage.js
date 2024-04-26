import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config"; // Adjust the path according to your project structure
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const MembersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userData = await getDocs(usersCollection);
      setUsers(userData.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsers();
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                <Link
                  to={`/profile/${user.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.displayName || "No Name Provided"}
                </Link>
              </Typography>
              <Typography>Favorite Team: {user.favoriteTeam}</Typography>
              {/* You can add more user details here if necessary */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MembersPage;
