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
import { tableProps } from "./interfaces";
export * from "./interfaces";
export * from "./table-actions";

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
  className,
}: tableProps<T>) => {
  return (
    <Table
      isStriped={isStriped}
      aria-label={ariaLabel}
      className={`${className}`}
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
            <div className={`font-bold text-base  ${column.headerClass || ""}`}>
              {column.label}
            </div>
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
