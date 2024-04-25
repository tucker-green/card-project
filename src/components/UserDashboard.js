import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import UserCards from "./UserCards";

function UserDashboard({ user }) {
  return (
    <div>
      <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Welcome, {user.displayName || user.email}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Email: {user.email}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary">
                View Profile
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary">
                Edit Profile
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error">
                Logout
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <UserCards></UserCards>
    </div>
  );
}

export default UserDashboard;
