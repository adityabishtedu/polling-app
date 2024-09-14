"use client";

import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";
import PollIcon from "@mui/icons-material/Poll";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../lib/theme";
import { PollProvider } from "../context/PollContext";

const inter = Inter({ subsets: ["latin"] });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body className={inter.className}>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <PollProvider>
              <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background:
                        "linear-gradient(90deg, #7565D9 0%, #4D0ACD 100%)",
                      borderRadius: "24px",
                      padding: "0px 9px",
                      gap: "7px",
                      height: "31px",
                    }}
                  >
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
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
              </AppBar>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                {children}
              </Container>
            </PollProvider>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
