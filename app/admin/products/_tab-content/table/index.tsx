import { useCallback } from "react";
import {
  getTableColumns,
  getCellValue,
  tableDataDataElement,
} from "../../helper";
import { ImageComponent, RenderTable } from "@/app/_custom-components";
import { TableActions } from "./actions";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import {
  updateTableData,
  subCatTableDataElement,
} from "@/lib/product/slices/table.slice";
import { setModalDetails } from "@/lib/product/slices/modal-details.slice";

const DataTable = ({
  loadData,
  onOpen,
}: {
  loadData: (page?: number, id?: number) => void;
  onOpen: () => void;
}) => {
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const table = useProductSelector((state) => state.table);
  const dispatch = useProductDispatch();

  const renderCell = useCallback(
    (data: Partial<tableDataDataElement>, columnKey: React.Key) => {
      const cellValue = getCellValue(tab, data, columnKey);

      switch (columnKey) {
        case "name": {
          const name = cellValue as string;
          return (
            <div className="flex items-center gap-3 text-lg">
              <ImageComponent
                width={100}
                height={100}
                src={data.photo as string}
                alt="category image"
                isBlurred={true}
              />{" "}
              <div>{name}</div>
            </div>
          );
        }

        case "category": {
          const category = cellValue as subCatTableDataElement["category"];
          return <div className="text-lg">{category.name}</div>;
        }
        case "actions":
          return (
            <TableActions
              id={data.id as number}
              fetchData={loadData}
              onClick={() => {
                dispatch(setModalDetails(data));
                onOpen();
              }}
            />
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [],
  );

  return (
    <RenderTable
      ariaLabel="Data Table"
      columns={getTableColumns(tab)}
      items={table.results}
      renderCell={renderCell}
      page={table.page}
      totalPages={table.totalPages}
      setPage={(page: number) => {
        dispatch(updateTableData({ page }));
        loadData(page);
      }}
      emptyContent={`No ${
        tab === tabKeys.category
          ? "categories"
          : tab === tabKeys.subCategory
            ? "sub categories"
            : "items"
      } found`}
    />
  );
};

export default DataTable;
