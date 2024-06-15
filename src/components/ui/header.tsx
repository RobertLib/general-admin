import { ArrowBackOutlined } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

export default function Header({
  action,
  backHref,
  title,
}: Readonly<{
  action?: React.ReactNode;
  backHref?: string;
  title: string | null;
}>) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Stack direction="row" spacing={2}>
        {backHref && (
          <IconButton href={backHref}>
            <ArrowBackOutlined />
          </IconButton>
        )}

        <Typography component="h1" variant="h4">
          {title}
        </Typography>
      </Stack>

      {action}
    </Stack>
  );
}
