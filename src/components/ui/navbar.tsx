"use client";

import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Avatar,
  Box,
  Container,
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { getDictionary } from "@/dictionaries";
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Dropdown from "./dropdown";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.sharp,
  }),
  width: drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: { width: `calc(${theme.spacing(8)} + 1px)` },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  minHeight: "48px !important",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          duration: theme.transitions.duration.enteringScreen,
          easing: theme.transitions.easing.sharp,
        }),
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
  ],
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  boxSizing: "border-box",
  flexShrink: 0,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
  whiteSpace: "nowrap",
  width: drawerWidth,
}));

export default function Navbar({
  dict,
  pages,
  settings = [],
}: Readonly<{
  dict: Awaited<ReturnType<typeof getDictionary>>;
  pages: { href: string; icon: React.ReactNode; label: string }[];
  settings?: { href: string; label: string }[];
}>) {
  const theme = useTheme();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar color="default" open={open} position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            <IconButton
              aria-label="open drawer"
              color="inherit"
              edge="start"
              onClick={handleDrawerOpen}
              sx={[{ marginRight: 5 }, open && { display: "none" }]}
            >
              <MenuOutlined />
            </IconButton>
            <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
              GADMIN
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Dropdown
                items={[
                  ...settings,
                  { label: dict.navbar.logout, onClick: () => signOut() },
                ]}
                label={<Avatar sx={{ height: 33, width: 33 }} />}
                tooltip={dict.navbar.openSettings}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer open={open} variant="permanent">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightOutlined />
            ) : (
              <ChevronLeftOutlined />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map(({ href, icon, label }) => (
            <ListItem disablePadding key={label} sx={{ display: "block" }}>
              <ListItemButton
                href={href}
                selected={pathname === href}
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { justifyContent: "center", minWidth: 0 },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
