"use client";

import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_RowData,
  MRT_SortingState,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { useRouter } from "next/navigation";

export type TableState = {
  columnFilters: MRT_ColumnFiltersState;
  pagination: MRT_PaginationState;
  sorting: MRT_SortingState;
};

export default function useTable<T>(
  tableOptions: MRT_TableOptions<T & MRT_RowData>
) {
  const router = useRouter();

  return useMaterialReactTable({
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableGlobalFilter: false,
    enableRowActions: tableOptions.renderRowActions !== undefined,
    enableStickyHeader: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    muiTableContainerProps: { sx: { maxHeight: "calc(100vh - 305px)" } },
    ...(tableOptions.manualFiltering === false
      ? {}
      : {
          onColumnFiltersChange: (updater) => {
            if (!tableOptions.state?.columnFilters) {
              return;
            }

            const { columnFilters } = tableOptions.state;

            if (typeof updater === "function") {
              const url = new URL(location.href);

              url.searchParams.set(
                "columnFilters",
                JSON.stringify(updater(columnFilters))
              );

              router.push(url.toString());
            }
          },
        }),
    ...(tableOptions.manualPagination === false
      ? {}
      : {
          onPaginationChange: (updater) => {
            if (!tableOptions.state?.pagination) {
              return;
            }

            const { pagination } = tableOptions.state;

            if (typeof updater === "function") {
              const url = new URL(location.href);

              url.searchParams.set(
                "pagination",
                JSON.stringify(updater(pagination))
              );

              router.push(url.toString());
            }
          },
        }),
    ...(tableOptions.manualSorting === false
      ? {}
      : {
          onSortingChange: (updater) => {
            if (!tableOptions.state?.sorting) {
              return;
            }

            const { sorting } = tableOptions.state;

            if (typeof updater === "function") {
              const url = new URL(location.href);

              url.searchParams.set("sorting", JSON.stringify(updater(sorting)));

              router.push(url.toString());
            }
          },
        }),
    ...tableOptions,
    initialState: {
      columnPinning: { left: ["mrt-row-actions"] },
      density: "compact",
      showColumnFilters: true,
      ...(tableOptions.initialState ?? {}),
    },
  });
}
