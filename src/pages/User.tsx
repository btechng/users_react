import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setError("Not authenticated");

      try {
        const res = await axios.get(
          "https://btech-backend-48e8.onrender.com/api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h5">All Users</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText
              primary={`${user.firstName} ${user.lastName}`}
              secondary={`${user.email} — ${user.phoneNumber}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Users;
