"use client";

import { Box, InputAdornment } from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import { ErrorMessage, TextField } from "@/components/ui";
import { forgotPassword } from "./actions";
import { getDictionary } from "@/dictionaries";
import { LoadingButton } from "@mui/lab";
import { useActionState, useState } from "react";

export default function ForgotPasswordForm({
  dict,
}: Readonly<{
  dict: Awaited<ReturnType<typeof getDictionary>>;
}>) {
  const [data, setData] = useState({
    email: "",
  });

  const [state, formAction, pending] = useActionState(forgotPassword, null);

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

      <LoadingButton
        fullWidth
        loading={pending}
        size="large"
        sx={{ mt: 2.5 }}
        type="submit"
        variant="contained"
      >
        {dict.forgotPasswordForm.submit}
      </LoadingButton>
    </Box>
  );
}
