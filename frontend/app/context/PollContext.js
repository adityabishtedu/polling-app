"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const PollContext = createContext();

const socket = io(process.env.NEXT_PUBLIC_API_URL);

export const PollProvider = ({ children }) => {
  const [currentPoll, setCurrentPoll] = useState(null);
  const [pollResults, setPollResults] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const fetchPollResults = async (pollId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/results`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch poll results");
      }
      const data = await response.json();
      setPollResults(data.results);
    } catch (error) {
      console.error("Error fetching poll results:", error);
    }
  };

  useEffect(() => {
    fetchActivePoll();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("newPoll", (poll) => {
      setCurrentPoll(poll);
      setHasVoted(false);
    });

    socket.on("pollEnded", ({ pollId }) => {
      if (currentPoll && currentPoll.id === pollId) {
        setCurrentPoll(null);
      }
    });

    socket.on("pollResults", ({ pollId, results }) => {
      if (currentPoll && currentPoll.id === pollId) {
        setPollResults(results);
        console.log("Received updated poll results:", results);
      }
    });

    return () => {
      socket.off("newPoll");
      socket.off("pollEnded");
      socket.off("pollResults");
    };
  }, [currentPoll]);

  const fetchActivePoll = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/polls/active`
      );
      if (response.ok) {
        const activePoll = await response.json();
        // Ensure options is always an array
        activePoll.options = Array.isArray(activePoll.options)
          ? activePoll.options
          : JSON.parse(activePoll.options || "[]");
        setCurrentPoll(activePoll);
      }
    } catch (error) {
      console.error("Error fetching active poll:", error);
    }
  };

  const createPoll = async (pollData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/polls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pollData),
      });

      if (!response.ok) {
        throw new Error("Failed to create poll");
      }

      const createdPoll = await response.json();
      return createdPoll;
    } catch (error) {
      console.error("Error creating poll:", error);
      throw error;
    }
  };

  const submitAnswer = async (pollId, studentId, selectedOption) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, selectedOption }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const data = await response.json();
      setPollResults(data.results);
      setHasVoted(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
      throw error;
    }
  };

  const endPoll = async (pollId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/end`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to end poll");
      }
    } catch (error) {
      console.error("Error ending poll:", error);
      throw error;
    }
  };

  const fetchPoll = async (pollId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch poll");
      }
      const pollData = await response.json();

      // Ensure options is always an array
      pollData.options = Array.isArray(pollData.options)
        ? pollData.options
        : JSON.parse(pollData.options || "[]");

      setCurrentPoll((prevPoll) => {
        if (JSON.stringify(prevPoll) !== JSON.stringify(pollData)) {
          return pollData;
        }
        return prevPoll;
      });
      await fetchPollResults(pollId);
      return pollData;
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
        hasVoted,
        fetchPoll,
        fetchPollResults,
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
