import { useCallback } from "react";
import {
  categoryComponentState,
  categoryTableColumns,
  categoryTableData,
} from "../helper";
import { ImageComponent, RenderTable } from "@/app/_custom-components";
import { TableActions } from "../_components/actions";
import { setKeyVal } from "@/app/_utils";

export const CatTable = ({
  setData,
  loadData,
  onOpen,
  config,
}: {
  setData: setKeyVal;
  loadData: (page?: number) => void;
  onOpen: () => void;
  config: categoryComponentState;
}) => {
  const renderCell = useCallback(
    (category: categoryTableData, columnKey: React.Key) => {
      const cellValue = category[columnKey as keyof categoryTableData];
      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-3 text-lg">
              <ImageComponent
                width={100}
                height={100}
                src={category.photo}
                alt="category image"
                isBlurred={true}
              />{" "}
              <div>{cellValue}</div>
            </div>
          );
        case "actions":
          return (
            <TableActions
              id={category.id}
              fetchData={loadData}
              type="category"
              onClick={() => {
                setData("modalDetails")(category);
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
      ariaLabel="Category Table"
      columns={categoryTableColumns}
      items={config.table.results}
      renderCell={renderCell}
      page={config.table.page}
      totalPages={config.table.totalPages}
      setPage={(page: number) => {
        setData("table.page")(page);
        loadData(page);
      }}
      emptyContent="No categories found"
    />
  );
};
