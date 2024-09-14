"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./createEmotionCache";
import theme from "../lib/theme";

const clientSideEmotionCache = createEmotionCache();

export default function ClientLayout({ children }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
