"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "@/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function ThemeRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
