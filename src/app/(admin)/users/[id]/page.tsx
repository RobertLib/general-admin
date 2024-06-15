import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { getDictionary } from "@/dictionaries";
import { Header } from "@/components/ui";
import prisma from "@/db";

export default async function UserDetailPage({
  params: { id },
}: Readonly<{
  params: { id: string };
}>) {
  const dict = await getDictionary();

  const user = await prisma.user.findUnique({ where: { id: Number(id) } });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <Container sx={{ py: 2 }}>
      <Header backHref="/users" title={user.name} />

      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell variant="head">{dict.user.email}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{dict.user.name}</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{dict.user.role}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
