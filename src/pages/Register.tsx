import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://btech-backend-48e8.onrender.com/api/auth/register",
        form
      );
      setMessage("Registration successful!");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <Typography variant="h5">Register</Typography>
      {message && <Alert severity="info">{message}</Alert>}
      {["firstName", "lastName", "phoneNumber", "email", "password"].map(
        (field) => (
          <TextField
            key={field}
            name={field}
            label={field.replace(/([A-Z])/g, " $1")}
            type={field === "password" ? "password" : "text"}
            fullWidth
            margin="normal"
            value={(form as any)[field]}
            onChange={handleChange}
          />
        )
      )}
      <Button variant="contained" fullWidth onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
