import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7765DA",
    },
    secondary: {
      main: "#4F0DCE",
    },
    background: {
      default: "#F2F2F2",
    },
    text: {
      primary: "#373737",
      secondary: "#6E6E6E",
    },
  },
  typography: {
    fontFamily: "Sora, Arial, sans-serif",
  },
  customGradient: {
    start: "#7765DA",
    middle: "#5767D0",
    end: "#4F0DCE",
  },
});

export default theme;
