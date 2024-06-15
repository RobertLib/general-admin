"use client";

import { Box, InputAdornment } from "@mui/material";
import { createUser } from "./actions";
import { EmailOutlined, LockOpenOutlined } from "@mui/icons-material";
import { ErrorMessage, TextField } from "@/components/ui";
import { getDictionary } from "@/dictionaries";
import { LoadingButton } from "@mui/lab";
import { useActionState, useState } from "react";

export default function RegisterForm({
  dict,
}: Readonly<{
  dict: Awaited<ReturnType<typeof getDictionary>>;
}>) {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [state, formAction, pending] = useActionState(createUser, null);

  const handleChange = (value: string, name: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box action={formAction} component="form">
      <ErrorMessage message={state?.errorMessage} sx={{ mb: 1, mt: 3 }} />

      <TextField
        autoComplete="email"
        error={state?.errors?.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined />
            </InputAdornment>
          ),
        }}
        label={dict.user.email}
        margin="normal"
        name="email"
        onChange={handleChange}
        required
        type="email"
        value={data.email}
        variant="outlined"
      />

      <TextField
        autoComplete="new-password"
        error={state?.errors?.password}
        inputProps={{ minLength: 8 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOpenOutlined />
            </InputAdornment>
          ),
        }}
        label={dict.user.password}
        margin="normal"
        name="password"
        onChange={handleChange}
        required
        type="password"
        value={data.password}
        variant="outlined"
      />

      <TextField
        autoComplete="new-password"
        error={state?.errors?.confirmPassword}
        inputProps={{ minLength: 8 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOpenOutlined />
            </InputAdornment>
          ),
        }}
        label={dict.user.confirmPassword}
        margin="normal"
        name="confirmPassword"
        onChange={handleChange}
        required
        type="password"
        value={data.confirmPassword}
        variant="outlined"
      />

      <LoadingButton
        fullWidth
        loading={pending}
        size="large"
        sx={{ mt: 2.5 }}
        type="submit"
        variant="contained"
      >
        {dict.registerForm.submit}
      </LoadingButton>
    </Box>
  );
}
