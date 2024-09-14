"use client";

import { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function StudentName() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("studentName", name.trim());
      router.push("/student/polls");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter Your Name
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Continue
        </Button>
      </form>
    </Box>
  );
}
