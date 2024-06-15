import { AddOutlined } from "@mui/icons-material";
import { Breadcrumbs, Dialog, Header } from "@/components/ui";
import { Button, Container } from "@mui/material";
import { getDictionary } from "@/dictionaries";
import { Prisma, Role } from "@prisma/client";
import prisma from "@/db";
import tableParams from "@/lib/data-table/table-params";
import UserForm from "./user-form";
import UserTable from "./user-table";

export type SearchParams = {
  columnFilters?: string;
  dialog?: string;
  id?: string;
  pagination?: string;
  sorting?: string;
};

export default async function UsersPage({
  searchParams,
}: Readonly<{
  searchParams: SearchParams;
}>) {
  const dict = await getDictionary();

  const { queryArgs, state } = tableParams(searchParams);

  const { dialog, id } = searchParams;

  const query: Prisma.UserFindManyArgs = {
    ...queryArgs,
    where: state.columnFilters.reduce((acc, columnFilter) => {
      switch (columnFilter.id) {
        case "email":
        case "name":
          acc[columnFilter.id] = {
            contains: columnFilter.value as string,
            mode: "insensitive",
          };
          break;
        case "role":
          acc[columnFilter.id] = {
            equals: columnFilter.value as Role,
          };
          break;
      }

      return acc;
    }, {} as Prisma.UserWhereInput),
  };

  const [users, userCount] = await prisma.$transaction([
    prisma.user.findMany(query),
    prisma.user.count({ where: query.where }),
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Breadcrumbs current={dict.users.title} />

      <Header
        action={
          <Button
            href={`/users?${new URLSearchParams({
              ...searchParams,
              dialog: "userForm",
            })}`}
            size="small"
            startIcon={<AddOutlined />}
            variant="contained"
          >
            {dict.actions.addNew}
          </Button>
        }
        title={dict.users.title}
      />

      <UserTable
        data={users}
        dict={dict}
        rowCount={userCount}
        searchParams={searchParams}
        state={state}
      />

      <Dialog
        maxWidth="xs"
        open={dialog === "userForm"}
        title={dict.user.title}
      >
        <UserForm
          dict={dict}
          user={users.find((user) => user.id === Number(id))}
        />
      </Dialog>
    </Container>
  );
}
