import {
  Alert,
  Avatar,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getDictionary } from "@/dictionaries";
import ForgotPasswordForm from "./forgot-password-form";

export default async function ForgotPasswordPage({
  searchParams: { resetInstructionsSent },
}: Readonly<{
  searchParams: { resetInstructionsSent?: string };
}>) {
  const dict = await getDictionary();

  return (
    <Container sx={{ maxWidth: "500px !important", mb: 6, mt: "13vh" }}>
      <Paper sx={{ p: 5 }}>
        <Stack spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
          <Avatar alt="Avatar" sx={{ height: 45, width: 45 }} />

          <Typography component="h1" variant="h4">
            {dict.forgotPassword.title}
          </Typography>

          <Typography color="text.secondary">
            {dict.forgotPassword.subtitle}
          </Typography>
        </Stack>

        {resetInstructionsSent === "true" && (
          <Alert sx={{ my: 2 }}>
            {dict.forgotPassword.resetInstructionsSent}
          </Alert>
        )}

        <ForgotPasswordForm dict={dict} />

        <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
          {dict.forgotPassword.backTo}{" "}
          <Link href="/auth/login">{dict.login.title}</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
