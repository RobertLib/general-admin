"use client";

import {
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Dropdown({
  items,
  label,
  tooltip,
}: Readonly<{
  items: { href?: string; label: string; onClick?: () => void }[];
  label: React.ReactNode;
  tooltip?: string;
}>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          {label}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        keepMounted
        onClose={handleCloseMenu}
        open={Boolean(anchorEl)}
        sx={{ mt: "45px" }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            component={Link}
            href={item.href ?? ""}
            key={index}
            onClick={() => {
              item.onClick?.();
              handleCloseMenu();
            }}
          >
            <Typography textAlign="center">{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
