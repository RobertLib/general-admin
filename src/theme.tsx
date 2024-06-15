"use client";

import { forwardRef } from "react";
import { Roboto } from "next/font/google";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import NextLink, { LinkProps } from "next/link";

// eslint-disable-next-line react/display-name
const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <NextLink {...props} ref={ref} />
));

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const defaultTheme = (mode: "light" | "dark"): ThemeOptions => ({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        margin: "dense",
        variant: "standard",
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        margin: "dense",
        variant: "standard",
      },
      styleOverrides: {
        root: {
          borderColor: mode === "light" ? "#d9d9d9" : "#505050",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: "dense",
        variant: "standard",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: mode === "light" ? "#d9d9d9" : "#505050",
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export const lightTheme = createTheme({
  ...defaultTheme("light"),
  palette: {
    background: {
      default: "#fafafb",
    },
    mode: "light",
    primary: {
      main: "#1777ff",
    },
  },
});

export const darkTheme = createTheme({
  ...defaultTheme("dark"),
  palette: {
    background: {
      default: "#030303",
      paper: "#16181c",
    },
    mode: "dark",
    primary: {
      main: "#4682da",
    },
  },
});
