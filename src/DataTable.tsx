import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/ui/table";

interface Column<T> {
  title: string;
  field: keyof T;
  width?: number | string;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  rowsPerPage?: number;
}

export function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  caption = "",
  rowsPerPage = 5,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (search) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (filter) {
      filtered = filtered.filter((row) => row.paymentStatus === filter);
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, filter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
  <div className="space-y-4">
  {/* Search + Filter controls */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border px-3 py-2 rounded w-full sm:w-2/3"
    />
    <select
      className="border px-3 py-2 rounded w-full sm:w-1/3"
      value={filter ?? ""}
      onChange={(e) => setFilter(e.target.value || null)}
    >
      <option value="">All Status</option>
      <option value="Paid">Paid</option>
      <option value="Pending">Pending</option>
      <option value="Unpaid">Unpaid</option>
    </select>
  </div>

  {/* Responsive Table */}
  <div className="overflow-x-auto rounded border">
    <Table className="min-w-full w-full">
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={String(col.field)}
             className={`cursor-pointer ${
                col.align === "right"
                  ? "text-right"
                  : col.align === "center"
                  ? "text-center"
                  : "text-left"
              }`}
              onClick={() => handleSort(col.field)}
            >
              {col.title}
              {sortField === col.field ? (sortOrder === "asc" ? " ↑" : " ↓") : ""}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => (
              <TableCell
                key={String(col.field)}
                className={col.align === "right" ? "text-right" : ""}
              >
                {row[col.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={columns.length}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-2 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-center">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page + 1 >= totalPages}
                className="px-3 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
</div>

  );
}
