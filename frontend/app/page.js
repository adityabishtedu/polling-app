"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import PollIcon from "@mui/icons-material/Poll";
import { styled } from "@mui/system";

const GradientBox = styled(Box)`
  background: linear-gradient(90deg, #7565d9 0%, #4d0acd 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 0px 9px;
  gap: 7px;
  height: 31px;
`;

const RoleBox = styled(Box)`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 15px 17px 15px 25px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  width: 387px;
  height: 143px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const GradientButton = styled(Button)`
  background: linear-gradient(99.18deg, #8f64e1 -46.89%, #1d68bd 223.45%);
  border-radius: 34px;
  color: white;
  text-transform: none;
  padding: 17px 70px;
  font-weight: 600;
  font-size: 18px;
`;

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "student") {
      router.push("/student/join");
    } else if (selectedRole === "teacher") {
      router.push("/teacher/create-poll");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GradientBox
        sx={{
          position: "absolute",
          top: "195px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <PollIcon sx={{ color: "#FFFFFF", fontSize: "14.66px" }} />
        <Typography
          sx={{
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "14px",
            color: "#FFFFFF",
          }}
        >
          Intervue Poll
        </Typography>
      </GradientBox>

      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Sora", fontWeight: 400, fontSize: "40px", mb: 1 }}
        >
          Welcome to the Live Polling System
        </Typography>
        <Typography
          sx={{
            fontFamily: "Sora",
            fontWeight: 400,
            fontSize: "19px",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          Please select the role that best describes you to begin using the live
          polling system
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
        <RoleBox
          onClick={() => handleRoleSelect("student")}
          sx={{
            border:
              selectedRole === "student"
                ? "2px solid #7565d9"
                : "1px solid #d9d9d9",
          }}
        >
          <Typography
            sx={{ fontFamily: "Sora", fontWeight: 600, fontSize: "23px" }}
          >
            I'm a Student
          </Typography>
          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 400,
              fontSize: "16px",
              color: "#454545",
            }}
          >
            Join a poll and submit your answers in real-time
          </Typography>
        </RoleBox>
        <RoleBox
          onClick={() => handleRoleSelect("teacher")}
          sx={{
            border:
              selectedRole === "teacher"
                ? "2px solid #7565d9"
                : "1px solid #d9d9d9",
          }}
        >
          <Typography
            sx={{ fontFamily: "Sora", fontWeight: 600, fontSize: "23px" }}
          >
            I'm a Teacher
          </Typography>
          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 400,
              fontSize: "16px",
              color: "#454545",
            }}
          >
            Create polls and view live results in real-time
          </Typography>
        </RoleBox>
      </Box>

      <GradientButton onClick={handleContinue} disabled={!selectedRole}>
        Continue
      </GradientButton>
    </Container>
  );
}
