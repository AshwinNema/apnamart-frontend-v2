import {
  ImageComponent,
  ImgPreviewInput,
  TextInput,
} from "@/app/_custom-components";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { ModalBody } from "@nextui-org/react";
import { modalBody, updateMainImg } from "../../helper";
import { useEffect, useState } from "react";
import { ModalImgButtons } from "./sub-parts/modal-body-img-buttons";

export const getDefaultConfig = () => ({
  img: "",
  showImage: false,
  showUpdateSaveBtn: false,
});

export type modalBodyconfig = ReturnType<typeof getDefaultConfig>;

export const MainModalBody = ({
  tabType,
  setMainData,
  mainConfig,
  modalDetails,
  successCallback,
  uploadSuccessCallback,
}: modalBody) => {
  const [config, setConfig] = useState(getDefaultConfig());
  const setData = setNestedPath(setConfig);
  const setMultiData = setMultiplePaths(setConfig);
  const setModalCrtState = () => {
    setMultiData([
      ["img", modalDetails!.photo],
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
      {config.showImage ? (
        <div className="flex justify-center">
          <ImageComponent
            src={modalDetails?.photo as string}
            height={200}
            width={200}
            alt="Category image"
          />
        </div>
      ) : (
        <ImgPreviewInput
          setUpload={setMainData("upload")}
          dataUploadId="upload-image"
          imgChangeCallback={() => {
            setData("showUpdateSaveBtn")(true);
          }}
          clearCallback={() => {
            setData("showUpdateSaveBtn")(false);
          }}
          options={{
            text: {
              label: "Upload category image",
            },
          }}
        />
      )}
      <ModalImgButtons
        modalDetails={modalDetails}
        config={config}
        setConfig={setConfig}
        setModalCrtState={setModalCrtState}
        uploadFile={() => {
          updateMainImg({
            id: mainConfig?.id as number,
            tabType,
            file: mainConfig.upload?.cachedFileArray[0] as File,
            onSuccess: successCallback,
            uploadSuccessCallback,
          });
        }}
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
