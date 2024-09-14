import React from "react";
import { PollProvider } from "./context/PollContext";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PollProvider>{children}</PollProvider>
      </body>
    </html>
  );
}
