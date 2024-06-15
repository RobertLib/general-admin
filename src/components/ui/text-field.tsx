"use client";

import {
  IconButton,
  InputAdornment,
  TextField as TextFieldMUI,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

export default function TextField({
  error,
  InputProps,
  onChange,
  type = "text",
  ...rest
}: Omit<TextFieldProps, "error" | "onChange"> &
  Readonly<{
    error?: string[];
    onChange?: (value: string, name: string) => void;
  }>) {
  const [typeState, setTypeState] = useState(type);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(value, name);
  };

  return (
    <TextFieldMUI
      {...rest}
      error={Boolean(error)}
      helperText={error?.join(", ")}
      InputProps={{
        ...InputProps,
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="password visibility"
                onClick={() =>
                  setTypeState(typeState === "text" ? "password" : "text")
                }
              >
                {typeState === "text" ? (
                  <VisibilityOffOutlined />
                ) : (
                  <VisibilityOutlined />
                )}
              </IconButton>
            </InputAdornment>
          ) : (
            InputProps?.endAdornment
          ),
      }}
      onChange={handleChange}
      type={typeState}
    />
  );
}
