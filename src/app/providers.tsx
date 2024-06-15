"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </SessionProvider>
  );
}
