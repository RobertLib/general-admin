import { Avatar, Container, Paper, Stack, Typography } from "@mui/material";
import { getDictionary } from "@/dictionaries";
import ResetPasswordForm from "./reset-password-form";

export default async function ResetPasswordPage({
  searchParams: { token },
}: Readonly<{
  searchParams: { token?: string };
}>) {
  const dict = await getDictionary();

  if (!token) {
    throw new Error("Missing token.");
  }

  return (
    <Container sx={{ maxWidth: "500px !important", mb: 6, mt: "13vh" }}>
      <Paper sx={{ p: 5 }}>
        <Stack spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
          <Avatar alt="Avatar" sx={{ height: 45, width: 45 }} />

          <Typography component="h1" variant="h4">
            {dict.resetPassword.title}
          </Typography>

          <Typography color="text.secondary">
            {dict.resetPassword.subtitle}
          </Typography>
        </Stack>

        <ResetPasswordForm dict={dict} token={token} />
      </Paper>
    </Container>
  );
}
