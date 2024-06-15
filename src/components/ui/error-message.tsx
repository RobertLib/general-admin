"use client";

import { Alert, AlertProps, Fade } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

export default function ErrorMessage({
  message,
  ...rest
}: AlertProps &
  Readonly<{
    message?: string;
  }>) {
  return (
    <TransitionGroup>
      {message && (
        <Fade>
          <Alert {...rest} severity="error">
            {message}
          </Alert>
        </Fade>
      )}
    </TransitionGroup>
  );
}
