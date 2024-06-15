import { getDictionary } from "@/dictionaries";
import { Navbar } from "@/components/ui";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary();

  return (
    <>
      <Navbar pages={[{ href: "/users", label: dict.users.title }]} />

      <main>{children}</main>
    </>
  );
}
