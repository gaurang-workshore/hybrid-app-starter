import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontSize: 12.5,
    fontFamily: "'Inter', sans-serif",
    body1: {
      fontSize: "12.5px",
      lineHeight: 1.4,
    },
    body2: {
      fontSize: "11.5px",
      lineHeight: 1.4,
      letterSpacing: "-0.115px",
    },
    caption: {
      fontSize: "11.5px",
      letterSpacing: "-0.115px",
      lineHeight: 1.4,
    },
    button: {
      fontSize: "12.5px",
      fontWeight: 600,
      textTransform: "none",
    },
    h6: {
      fontSize: "12.5px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "13.5px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#006ACC",
    },
    secondary: {
      main: "#2E2E2E",
    },
    background: {
      default: "#1E1E1E",
      paper: "#2E2E2E",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#BDBDBD",
    },
    error: {
      main: "#CF313B",
    },
    warning: {
      main: "#F3C831",
    },
    success: {
      main: "#63D489",
    },
    info: {
      main: "#8AC2FF",
    },
    divider: "rgba(255, 255, 255, 0.13)",
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
          boxShadow:
            "0px 0.5px 1px 0px rgba(0, 0, 0, 0.8), 0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.20) inset",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "11.5px",
          borderColor: "rgba(255, 255, 255, 0.13)",
        },
        head: {
          fontSize: "11.5px",
          fontWeight: 600,
          color: "#BDBDBD",
        },
      },
    },
  },
});

export { theme };
