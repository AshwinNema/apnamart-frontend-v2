import { ImageComponent, ImgPreviewInput } from "@/app/_custom-components";
import { modalBodyconfig } from "../modal-body";
import { tableDataDataElement, updateMainImg } from "../../../helper";
import { setKeyVal } from "@/app/_utils";
import { ModalImgButtons } from "./modal-body-img-buttons";
import { Dispatch, SetStateAction, useContext } from "react";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import { MainCreateUpdateContext } from "..";

export default function MainBodyImg({
  config,
  setData,
  setConfig,
  setModalCrtState,
}: {
  config: modalBodyconfig;
  setData: setKeyVal;
  setConfig: Dispatch<SetStateAction<modalBodyconfig>>;
  setModalCrtState: () => void;
}) {
  const mainData = useContext(MainCreateUpdateContext);
  if (!mainData) return null;
  const { config: mainConfig, setMainData } = mainData;
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;
  const {
    componentDetails: { tab, refreshData },
  } = useProductSelector((state) => state);
  const dispatch = useProductDispatch();
  return (
    <>
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
              label: `Upload ${tab} image`,
            },
          }}
        />
      )}
      <ModalImgButtons
        config={config}
        setConfig={setConfig}
        setModalCrtState={setModalCrtState}
        uploadFile={() => {
          updateMainImg({
            id: mainConfig?.id as number,
            tabType: tab,
            file: mainConfig.upload?.cachedFileArray[0] as File,
            refreshData,
            dispatch,
          });
        }}
      />
    </>
  );
}
