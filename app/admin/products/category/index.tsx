import { Button, useDisclosure } from "@nextui-org/react";
import { MdCategory } from "react-icons/md";
import React, { useEffect, useState } from "react";
import CategoryModal from "../_modals/category";
import {
  categoryComponentState,
  defaultCatTableConfig as defaultConfig,
  getCategories,
} from "../helper";
import { setNestedPath } from "@/app/_utils";
import { CatTable } from "./table";
import { Autocomplete } from "@/app/_custom-components";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { appEndPoints } from "@/app/_utils/endpoints";

export default function Category() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [config, setConfig] = useState<categoryComponentState>(
    structuredClone(defaultConfig),
  );
  const setData = setNestedPath(setConfig);
  const loadData = (page?: number, id?: number) => {
    const params: { page: number; limit: number; id?: number } = {
      page: page || config.table.page,
      limit: config.table.limit,
    };
    if (id) {
      params.id = id;
    }
    getCategories(params, setData("table"));
  };

  useEffect(() => {
    getCategories(
      { page: defaultConfig.table.page, limit: defaultConfig.table.limit },
      setData("table"),
    );
  }, []);
  useEffect(() => {
    !isOpen && setData("modalDetails")(null);
  }, [isOpen]);

  const getInputSearch = (name: string) => {
    return makeDataRequest(
      HTTP_METHODS.GET,
      appEndPoints.GET_CATEGORY_NAME_LIST,
      undefined,
      { name },
    )
      .then((res) => {
        if (!res) return [];
        return res.map((item: { id: number; name: string }) => {
          return {
            id: item.id,
            label: item.name,
          };
        });
      })
      .catch(() => []);
  };

  return (
    <div>
      <div className="flex justify-between gap-3 items-center">
        <Autocomplete
          getListItems={(name: string) => getInputSearch(name)}
          label="Search by name"
          size="sm"
          color="primary"
          onSelectionChange={(id) => {
            loadData(1, id as number);
          }}
          variant="faded"
        />
        <Button onPress={onOpen} startContent={<MdCategory />} color="primary">
          Create Category
        </Button>
      </div>
      <CategoryModal
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
      />
    </div>
  );
}
