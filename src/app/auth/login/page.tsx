import {
  Avatar,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getDictionary } from "@/dictionaries";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const dict = await getDictionary();

  return (
    <Container sx={{ maxWidth: "500px !important", mb: 6, mt: "13vh" }}>
      <Paper sx={{ p: 5 }}>
        <Stack spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
          <Avatar alt="Avatar" sx={{ height: 45, width: 45 }} />

          <Typography component="h1" variant="h4">
            {dict.login.title}
          </Typography>
        </Stack>

        <LoginForm dict={dict} />

        <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
          {dict.login.noAccount}{" "}
          <Link href="/auth/register">{dict.login.register}</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
