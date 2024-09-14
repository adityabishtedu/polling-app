import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // You can customize your theme here
  palette: {
    primary: {
      main: "#7565D9",
    },
    secondary: {
      main: "#4D0ACD",
    },
    text: {
      primary: "#101828",
      secondary: "#667085",
    },
  },
  typography: {
    fontFamily: "Sora, Arial, sans-serif",
  },
});

export default theme;

export const globalStyles = {
  // ... existing styles ...

  ".live-results-container": {
    width: "727px",
    margin: "0 auto",
    fontFamily: "Sora, sans-serif",
  },

  ".question-title": {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "20px",
  },

  ".results-frame": {
    border: "1px solid #AF8FF1",
    borderRadius: "9px",
    overflow: "hidden",
  },

  ".option-row": {
    display: "flex",
    alignItems: "center",
    height: "55px",
    background: "#F7F7F7",
    borderBottom: "1px solid rgba(141, 141, 141, 0.19)",
  },

  ".option-progress": {
    display: "flex",
    alignItems: "center",
    height: "100%",
    background: "#6766D5",
    borderRadius: "6px",
    padding: "0 20px",
    color: "#FFFFFF",
  },

  ".option-number": {
    width: "24px",
    height: "24px",
    background: "#FFFFFF",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#6766D5",
    fontWeight: 600,
    fontSize: "11px",
    marginRight: "10px",
  },

  ".option-text": {
    fontWeight: 400,
    fontSize: "16px",
  },

  ".option-percentage": {
    marginLeft: "auto",
    marginRight: "20px",
    fontWeight: 600,
    fontSize: "16px",
  },

  ".new-question-button": {
    background: "linear-gradient(99.18deg, #8F64E1 -46.89%, #1D68BD 223.45%)",
    borderRadius: "34px",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: "18px",
    padding: "17px 70px",
    border: "none",
    cursor: "pointer",
    marginTop: "30px",
  },

  ".view-poll-history-button": {
    background: "#8F64E1",
    borderRadius: "34px",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: "18px",
    padding: "17px 70px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },

  ".eye-icon": {
    marginRight: "10px",
  },

  ".button-container": {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
};
