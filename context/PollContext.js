import React, { createContext, useState, useContext } from "react";

const PollContext = createContext();

export function PollProvider({ children }) {
  const [polls, setPolls] = useState([]);

  return (
    <PollContext.Provider value={{ polls, setPolls }}>
      {children}
    </PollContext.Provider>
  );
}

export function usePoll() {
  return useContext(PollContext);
}
