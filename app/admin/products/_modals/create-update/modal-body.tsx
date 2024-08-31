import { AutoComplete, TextInput } from "@/app/_custom-components";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { ModalBody } from "@nextui-org/react";
import { tableDataDataElement } from "../../helper";
import { useContext, useEffect, useState } from "react";
import MainBodyImg from "./sub-parts/main-body-img";
import { useProductSelector } from "@/lib/product/hooks";
import { MainCreateUpdateContext } from ".";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { appEndPoints } from "@/app/_utils/endpoints";

export const getDefaultConfig = () => ({
  img: "",
  showImage: false,
  showUpdateSaveBtn: false,
  categoryList: [],
});

export type modalBodyconfig = ReturnType<typeof getDefaultConfig>;

export const MainModalBody = () => {
  const mainData = useContext(MainCreateUpdateContext);
  if (!mainData) return null;
  const { config: mainConfig, setMainData } = mainData;
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;
  const { tab } = useProductSelector((state) => state.componentDetails);
  const [config, setConfig] = useState(getDefaultConfig());
  const setData = setNestedPath(setConfig);
  const setMultiData = setMultiplePaths(setConfig);
  const setModalCrtState = () => {
    setMultiData([
      ["img", modalDetails.photo],
      ["showImage", true],
      ["showUpdateSaveBtn", false],
    ]);
    mainConfig.upload?.resetPreviewPanel();
  };
  useEffect(() => {
    modalDetails && setModalCrtState();
    !modalDetails && setConfig(getDefaultConfig());
  }, [modalDetails, modalDetails?.photo]);

  return (
    <ModalBody>
      <MainBodyImg
        config={config}
        setData={setData}
        setConfig={setConfig}
        setModalCrtState={setModalCrtState}
      />
      <TextInput
        classNames={{
          mainWrapper: ["w-full"],
        }}
        variant="faded"
        fullWidth={true}
        value={mainConfig.name}
        setData={setMainData("name")}
        alternateText="Name"
      />

      {tab !== tabKeys.category && (
        <AutoComplete
          label="Category"
          url={appEndPoints.CATEGORY_LIST}
          onSelectionChange={(key) => {
            setMainData("categoryId")(key);
          }}
          isClearable={false}
          selectedKey={mainConfig.categoryId}
          fullWidth={true}
          processLogic={(res) => {
            if (!res) return { data: [], inputVal: "" };
            let inputVal: string = "";
            const data = res.map(
              (item: { id: number; name: string; photo: string }) => {
                if (modalDetails?.category?.id === item.id) inputVal = item.name;
                return {
                  id: item.id,
                  label: item.name,
                  photo: item.photo,
                };
              },
            );
            return { data, inputVal };
          }}
        />
      )}
    </ModalBody>
  );
};
