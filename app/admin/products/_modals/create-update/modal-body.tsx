import { TextInput } from "@/app/_custom-components";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { ModalBody } from "@nextui-org/react";
import { tableDataDataElement } from "../../helper";
import { useContext, useEffect, useState } from "react";
import MainBodyImg from "./sub-parts/main-body-img";
import { useProductSelector } from "@/lib/product/hooks";
import { MainCreateUpdateContext } from ".";

export const getDefaultConfig = () => ({
  img: "",
  showImage: false,
  showUpdateSaveBtn: false,
});

export type modalBodyconfig = ReturnType<typeof getDefaultConfig>;

export const MainModalBody = () => {
  const mainData = useContext(MainCreateUpdateContext);
  if (!mainData) return null
  const {config:mainConfig, setMainData} = mainData
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;
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
        labelPlacement="outside-left"
        value={mainConfig.name}
        setData={setMainData("name")}
        label="Name"
      />
    </ModalBody>
  );
};
