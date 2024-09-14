"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const PollContext = createContext();

const socket = io(process.env.NEXT_PUBLIC_API_URL);

export const PollProvider = ({ children }) => {
  const [currentPoll, setCurrentPoll] = useState(null);
  const [pollResults, setPollResults] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Fetch active poll on initial load
    fetchActivePoll();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("newPoll", (poll) => {
      setCurrentPoll(poll);
    });

    socket.on("pollEnded", (results) => {
      setCurrentPoll(null);
      // Handle displaying results or updating UI
    });

    socket.on("pollResults", ({ pollId, results }) => {
      console.log("Received poll results:", results);
      setPollResults(results);
    });

    socket.on("pollEnded", (pollId) => {
      setCurrentPoll((prevPoll) => {
        if (prevPoll && prevPoll.id === pollId) {
          return { ...prevPoll, isActive: false };
        }
        return prevPoll;
      });
    });

    return () => {
      socket.off("newPoll");
      socket.off("pollEnded");
      // ... remove other listeners ...
    };
  }, []);

  const fetchActivePoll = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/polls/active`
      );
      if (response.ok) {
        const activePoll = await response.json();
        setCurrentPoll({
          ...activePoll,
          options: Array.isArray(activePoll.options)
            ? activePoll.options
            : JSON.parse(activePoll.options),
          results: {},
        });
      }
    } catch (error) {
      console.error("Error fetching active poll:", error);
    }
  };

  const createPoll = async (pollData) => {
    if (currentPoll && currentPoll.isActive) {
      throw new Error(
        "A poll is already active. End the current poll before creating a new one."
      );
    }

    try {
      console.log("Sending poll creation request:", pollData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/polls`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pollData),
        }
      );
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create poll: ${errorData.message}`);
      }

      const createdPoll = await response.json();
      console.log("Poll created successfully:", createdPoll);
      setCurrentPoll({ ...createdPoll, isActive: true });
      return createdPoll;
    } catch (error) {
      console.error("Error creating poll:", error);
      throw error;
    }
  };

  const submitAnswer = async (pollId, studentId, selectedOption) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/polls/${pollId}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId, selectedOption }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit answer");
      }

      setHasVoted(true);
      // Emit the answer through the socket
      socket.emit("submitAnswer", { pollId, studentId, selectedOption });
    } catch (error) {
      console.error("Error submitting answer:", error);
      // You might want to set an error state here and display it to the user
    }
  };

  const endPoll = (pollId) => {
    socket.emit("endPoll", pollId);
    setCurrentPoll(null);
  };

  const fetchPoll = async (pollId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/polls/${pollId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch poll");
      }
      const pollData = await response.json();
      const parsedPollData = {
        ...pollData,
        options: Array.isArray(pollData.options)
          ? pollData.options
          : JSON.parse(pollData.options || "[]"),
        isActive: true,
      };
      setCurrentPoll(parsedPollData);
      return parsedPollData;
    } catch (error) {
      console.error("Error fetching poll:", error);
      throw error;
    }
  };

  return (
    <PollContext.Provider
      value={{
        currentPoll,
        pollResults,
        createPoll,
        submitAnswer,
        endPoll,
        fetchPoll,
        hasVoted,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export function usePoll() {
  const context = useContext(PollContext);
  if (context === undefined) {
    throw new Error("usePoll must be used within a PollProvider");
  }
  return context;
}
