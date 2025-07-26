import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import axios from "axios";

const User = () => {
  const [userId, setUserId] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://btechng-backend.onrender.com/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(res.data.userId);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to fetch user");
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={fetchUser}>Get User Info</Button>
      {userId && <Typography mt={2}>User ID: {userId}</Typography>}
    </div>
  );
};

export default User;