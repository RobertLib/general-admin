"use client";

import { Box, InputAdornment, Link, Typography } from "@mui/material";
import { EmailOutlined, LockOpenOutlined } from "@mui/icons-material";
import { ErrorMessage, TextField } from "@/components/ui";
import { getDictionary } from "@/dictionaries";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import logger from "@/utils/logger";

export default function LoginForm({
  dict,
}: Readonly<{
  dict: Awaited<ReturnType<typeof getDictionary>>;
}>) {
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleChange = (value: string, name: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setErrorMessage("");

      const response = await signIn("credentials", {
        ...data,
        callbackUrl: location.origin,
        redirect: false,
      });

      if (response?.error) {
        logger.error(response.error);

        setErrorMessage(response.error);
      } else {
        router.replace("/");
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <ErrorMessage message={errorMessage} sx={{ mb: 1, mt: 3 }} />

      <TextField
        autoComplete="email"
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
        autoComplete="current-password"
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

      <Typography align="right" sx={{ mt: 0.25 }}>
        <Link href="/auth/forgot-password">
          {dict.loginForm.forgotPassword}
        </Link>
      </Typography>

      <LoadingButton
        fullWidth
        loading={isPending}
        size="large"
        sx={{ mt: 2.5 }}
        type="submit"
        variant="contained"
      >
        {dict.loginForm.submit}
      </LoadingButton>
    </Box>
  );
}
