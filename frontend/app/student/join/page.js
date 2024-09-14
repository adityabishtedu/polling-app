"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { styled } from "@mui/system";
import PollIcon from "@mui/icons-material/Poll";
import { useRouter } from "next/navigation";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "69px",
  padding: "0px",
  width: "981px",
  height: "50px",
  marginTop: "57px",
});

const HeaderBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 9px",
  gap: "7px",
  width: "134px",
  height: "31px",
  background: "linear-gradient(90deg, #7565D9 0%, #4D0ACD 100%)",
  borderRadius: "24px",
  marginBottom: "26px",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F2F2F2",
    borderRadius: "2px",
    height: "60px",
  },
});

const GradientButton = styled(Button)({
  background: "linear-gradient(99.18deg, #8F64E1 -46.89%, #1D68BD 223.45%)",
  borderRadius: "34px",
  padding: "17px 70px",
  fontFamily: "Sora",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "23px",
  color: "#FFFFFF",
  textTransform: "none",
});

export default function JoinPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Store the student's name in localStorage or a global state management solution
      localStorage.setItem("studentName", name.trim());
      // Navigate to the polls page
      router.push("/student/polls");
    }
  };

  return (
    <StyledContainer>
      <HeaderBox>
        <PollIcon sx={{ color: "#FFFFFF", fontSize: "14.66px" }} />
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "14px",
            color: "#FFFFFF",
          }}
        >
          Intervue Poll
        </Typography>
      </HeaderBox>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Sora",
            fontWeight: 400,
            fontSize: "40px",
            lineHeight: "50px",
            mb: 2,
          }}
        >
          Let's Get Started
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Sora",
            fontWeight: 400,
            fontSize: "19px",
            lineHeight: "25px",
            color: "#5C5B5B",
            maxWidth: "762px",
            margin: "0 auto",
          }}
        >
          If you're a student, you'll be able to submit your answers,
          participate in live polls, and see how your responses compare with
          your classmates
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: "507px" }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Sora",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "23px",
            mb: 1.5,
          }}
        >
          Enter your Name
        </Typography>
        <StyledTextField
          fullWidth
          placeholder="Rahul Bajaj"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 3 }}
        />
        <GradientButton type="submit" fullWidth>
          Continue
        </GradientButton>
      </Box>
    </StyledContainer>
  );
}
