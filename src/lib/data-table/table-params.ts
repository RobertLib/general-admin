import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";

export default function tableParams(params: {
  columnFilters?: string;
  pagination?: string;
  sorting?: string;
}) {
  const columnFilters: MRT_ColumnFiltersState = params.columnFilters
    ? JSON.parse(params.columnFilters)
    : [];

  const pagination: MRT_PaginationState = params.pagination
    ? JSON.parse(params.pagination)
    : {
        pageIndex: 0,
        pageSize: 25,
      };

  const sorting: MRT_SortingState = params.sorting
    ? JSON.parse(params.sorting)
    : [];

  const queryArgs = {
    orderBy:
      sorting.length > 0
        ? ({ [sorting[0].id]: sorting[0].desc ? "desc" : "asc" } as const)
        : ({ createdAt: "desc" } as const),
    skip: pagination.pageIndex * pagination.pageSize,
    take: pagination.pageSize,
  };

  return { queryArgs, state: { columnFilters, pagination, sorting } };
}
