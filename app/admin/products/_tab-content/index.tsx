import { Button, useDisclosure } from "@nextui-org/react";
import { MdCategory } from "react-icons/md";
import React, { useEffect, useState } from "react";
import {
  tabComponentState,
  defaultConfig,
  getQueryDataApi,
  categoryTableDataElement,
  subCatTableDataElement,
  tabKeys
} from "../helper";
import { setNestedPath } from "@/app/_utils";
import { CatTable } from "./table";

import Autocomplete from "./autocomplete";
import CreateUpdateModal from "../_modals/create-update";

export default function TabContent({ tabType }: { tabType: tabKeys }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [config, setConfig] = useState<
    tabComponentState<categoryTableDataElement | subCatTableDataElement>
  >(structuredClone(defaultConfig));
  const setData = setNestedPath(setConfig);
  const loadData = (page?: number, id?: number) => {
    const params: { page: number; limit: number; id?: number } = {
      page: page || config.table.page,
      limit: config.table.limit,
    };
    if (id) {
      params.id = id;
    }
    getQueryDataApi(tabType, params, setData("table"));
  };

  useEffect(() => {
    getQueryDataApi(
      tabType,
      { page: defaultConfig.table.page, limit: defaultConfig.table.limit },
      setData("table"),
    );
  }, [tabType]);
  useEffect(() => {
    !isOpen && setData("modalDetails")(null);
  }, [isOpen]);

  return (
    <div>
      <div className="flex justify-between gap-3 items-center">
        <Autocomplete tabType={tabType} loadData={loadData} />
        <Button onPress={onOpen} startContent={<MdCategory />} color="primary">
          Create{" "}
          {tabType === tabKeys.category
            ? "Category"
            : tabType === tabKeys.subCategory
              ? "Sub Category"
              : "Item"}
        </Button>
      </div>
      <CreateUpdateModal
        tabType={tabType}
        modalDetails={config.modalDetails}
        uploadSuccessCallback={(photo: string) => {
          setData("modalDetails.photo")(photo);
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        successCallback={(closeModal?: boolean) => {
          closeModal && onOpenChange();
          loadData();
        }}
      />
      <CatTable
        setData={setData}
        loadData={loadData}
        onOpen={onOpen}
        config={config}
        tabType={tabType}
      />
    </div>
  );
}
