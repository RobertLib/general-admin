import { Box } from "@mui/material";
import { DrawerHeader } from "@/components/ui/navbar";
import { getDictionary } from "@/dictionaries";
import { Navbar } from "@/components/ui";
import { PeopleOutlined } from "@mui/icons-material";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary();

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        dict={dict}
        pages={[
          {
            href: "/users",
            icon: <PeopleOutlined />,
            label: dict.users.title,
          },
        ]}
      />

      <Box component="main" sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
