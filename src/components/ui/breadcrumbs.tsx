import { Breadcrumbs as BreadcrumbsMUI, Link, Typography } from "@mui/material";

export default function Breadcrumbs({
  current,
  links = [],
}: Readonly<{
  current?: string;
  links?: { href: string; label: string }[];
}>) {
  return (
    <BreadcrumbsMUI aria-label="breadcrumb" sx={{ mb: 1.5 }}>
      <Link color="inherit" href="/" underline="hover">
        Home
      </Link>
      {links.map((link, index) => (
        <Link color="inherit" href={link.href} key={index} underline="hover">
          {link.label}
        </Link>
      ))}

      <Typography color="text.primary">{current ?? "..."}</Typography>
    </BreadcrumbsMUI>
  );
}
