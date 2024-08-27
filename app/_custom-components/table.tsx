import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

export interface columns {
  align?: "start" | "center" | "end";
  key: string;
  label: string;
}

interface tableProps<tableItem> {
  ariaLabel: string;
  columns: columns[];
  items: tableItem[];
  renderCell: (data: tableItem, columnKey: React.Key) => React.JSX.Element;
  emptyContent?: string;
  isStriped?: boolean;
  totalPages?: number;
  page?: number;
  setPage?: (page: number) => void;
}

export const RenderTable = <T extends { id: string | number }>({
  ariaLabel,
  columns,
  items,
  renderCell,
  emptyContent,
  isStriped,
  totalPages,
  page,
  setPage,
}: tableProps<T>) => {
  return (
    <Table
      isStriped={isStriped}
      aria-label={ariaLabel}
      bottomContent={
        <>
          {totalPages && page && setPage ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          ) : null}
        </>
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} align={column.align || "start"}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={`${emptyContent || ""}`} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
