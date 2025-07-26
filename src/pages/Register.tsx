import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("https://btechng-backend.onrender.com/api/auth/register", {
        email,
        password,
      });
      alert("Registration successful");
    } catch (err: any) {
      alert(err.response?.data?.error || "Error during registration");
    }
  };

  return (
    <Box>
      <Typography variant="h5">Register</Typography>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default Register;