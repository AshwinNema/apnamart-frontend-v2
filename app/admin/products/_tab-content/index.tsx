import { Button, useDisclosure } from "@nextui-org/react";
import { MdCategory } from "react-icons/md";
import React, { useEffect } from "react";
import { queryTableData } from "../helper";
import DataTable from "./table";
import Autocomplete from "./autocomplete";
import CreateUpdateModal from "../_modals/create-update";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import {
  setDetails,
  tabKeys,
} from "@/lib/product/slices/component-details.slice";
import { clearModalDetails } from "@/lib/product/slices/modal-details.slice";

export default function TabContent() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    componentDetails: { tab, id, refreshData, closeModal },
    table,
  } = useProductSelector((state) => state);
  const dispatch = useProductDispatch();
  const loadData = (page?: number, id?: number) => {
    const params: { page: number; limit: number; id?: number } = {
      page: page || table.page,
      limit: table.limit,
    };
    if (id) {
      params.id = id;
    }
    queryTableData(tab, params, dispatch);
  };

  useEffect(() => {
    loadData(id ? 1 : table.page, id ? id : undefined);
  }, [tab, id, refreshData]);

  useEffect(() => {
    !isOpen && dispatch(clearModalDetails());
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (!closeModal) return;
    onClose();
    setDetails({ closeModal: false });
  }, [closeModal]);

  return (
    <div>
      <div className="flex justify-between gap-3 items-center">
        <Autocomplete />
        <Button onPress={onOpen} startContent={<MdCategory />} color="primary">
          Create{" "}
          {tab === tabKeys.category
            ? "Category"
            : tab === tabKeys.subCategory
              ? "Sub Category"
              : "Item"}
        </Button>
      </div>
      <CreateUpdateModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <DataTable loadData={loadData} onOpen={onOpen} />
    </div>
  );
}
