"use client";

import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { deleteUser } from "./actions";
import { getDictionary } from "@/dictionaries";
import { Chip, IconButton, Tooltip } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { Role, User } from "@prisma/client";
import { SearchParams } from "./page";
import { useMemo } from "react";
import { useSnackbar } from "notistack";
import useTable, { TableState } from "@/lib/data-table/use-table";

export default function UserTable({
  data,
  dict,
  rowCount,
  searchParams,
  state,
}: Readonly<{
  data: User[];
  dict: Awaited<ReturnType<typeof getDictionary>>;
  rowCount: number;
  searchParams: SearchParams;
  state: TableState;
}>) {
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "email",
        header: dict.user.email,
      },
      {
        accessorKey: "name",
        header: dict.user.name,
      },
      {
        accessorKey: "role",
        Cell: ({ row }) => (
          <Chip label={row.original.role} size="small" variant="outlined" />
        ),
        filterSelectOptions: Object.entries(Role).map(([key, value]) => ({
          text: key,
          value,
        })),
        filterVariant: "select",
        header: dict.user.role,
      },
    ],
    [dict]
  );

  const table = useTable<User>({
    columns,
    data,
    renderRowActions: ({ row }) => (
      <>
        <Tooltip title={dict.actions.detail}>
          <IconButton
            aria-label="detail"
            color="primary"
            href={`/users/${row.original.id}`}
          >
            <SearchOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title={dict.actions.edit}>
          <IconButton
            aria-label="edit"
            color="warning"
            href={`/users?${new URLSearchParams({
              ...searchParams,
              dialog: "userForm",
              id: row.original.id.toString(),
            })}`}
          >
            <EditOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title={dict.actions.delete}>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={async () => {
              if (confirm(dict.form.deleteConfirm)) {
                await deleteUser(row.original.id);

                enqueueSnackbar(dict.form.deleteSuccess, {
                  variant: "success",
                });
              }
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      </>
    ),
    rowCount,
    state,
  });

  return <MaterialReactTable table={table} />;
}
