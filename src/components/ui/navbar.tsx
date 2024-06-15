"use client";

import { AdminPanelSettings, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Dropdown from "./dropdown";

export default function Navbar({
  pages,
  settings = [],
}: Readonly<{
  pages: { href: string; label: string }[];
  settings?: { href: string; label: string }[];
}>) {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="default" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
          <AdminPanelSettings
            sx={{ display: { md: "flex", xs: "none" }, mr: 1 }}
          />
          <Link
            href="/"
            noWrap
            sx={{
              color: "inherit",
              display: { md: "flex", xs: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              mr: 2,
              textDecoration: "none",
            }}
            variant="h6"
          >
            GADMIN
          </Link>

          <Box sx={{ display: { md: "none", xs: "flex" }, flexGrow: 1 }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              onClick={handleOpenNavMenu}
              size="large"
            >
              <MenuOutlined />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
              }}
              id="menu-appbar"
              keepMounted
              onClose={handleCloseNavMenu}
              open={Boolean(anchorElNav)}
              sx={{
                display: { md: "none", xs: "block" },
              }}
              transformOrigin={{
                horizontal: "left",
                vertical: "top",
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  component={Link}
                  href={page.href}
                  key={index}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdminPanelSettings
            sx={{ display: { md: "none", xs: "flex" }, mr: 1 }}
          />
          <Link
            href="/"
            noWrap
            sx={{
              color: "inherit",
              display: { md: "none", xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              mr: 2,
              textDecoration: "none",
            }}
            variant="h5"
          >
            GADMIN
          </Link>
          <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
            {pages.map((page, index) => (
              <Button
                color="inherit"
                href={page.href}
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ display: "block", my: 1 }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Dropdown
              items={[
                ...settings,
                { label: "Logout", onClick: () => signOut() },
              ]}
              label={<Avatar sx={{ height: 33, width: 33 }} />}
              tooltip="Open settings"
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
