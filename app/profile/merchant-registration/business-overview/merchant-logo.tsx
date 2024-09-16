import { useContext } from "react";
import { MainProfileStateContext } from "../../utils";
import { ComponentSkeleton, CustomImagePreviewer } from "@/app/_custom-components";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setNestedPath } from "@/app/_utils";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import { uploadMerchantLogo } from "../utils";
import dynamic from "next/dynamic";

const MerchantLogo = () => {
  const mainContext = useContext(MainProfileStateContext);
  const showImage = useProfileSelector(
    (state) => state.merchantDetails.showImage,
  );
  const imgSrc = useProfileSelector((state) => state.merchantDetails.photo);
  const showUpdateSaveImgBtn = useProfileSelector(
    (state) => state.merchantDetails.showUpdateSaveImgBtn,
  );
  const dispatch = useProfileDispatch();
 
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  const dispatchMerchantDetails = (details: object) => {
    dispatch(setMerchantDetails(details));
  };

  // const CustomImagePreviewer = dynamic(() => import('@/app/_custom-components').then(mod => mod.CustomImagePreviewer), {
  //   ssr: false,
  //   loading: () => <ComponentSkeleton />
  // })

  return (
    <CustomImagePreviewer
      showImage={showImage}
      imgSrc={imgSrc}
      height={200}
      width={200}
      imgAlt="Business Image"
      imgInputProps={{
        setUpload: setNestedPath(setConfig)("businessRegistrationFile"),
        value: config.businessRegistrationFile,
        dataUploadId: "merchant-overview-image",
        options: {
          text: {
            label: `Upload business logo`,
          },
        },
        imgChangeCallback: () => {
          dispatchMerchantDetails({
            showUpdateSaveImgBtn: true,
          });
        },
        clearCallback: () => {
          dispatchMerchantDetails({
            showUpdateSaveImgBtn: false,
          });
        },
      }}
      openInput={() => {
        dispatchMerchantDetails({
          showImage: false,
          showUpdateSaveImgBtn: false,
        });
      }}
      cancelUpload={() => {
        dispatchMerchantDetails({
          showImage: true,
          showUpdateSaveImgBtn: false,
        });
        config.businessRegistrationFile?.resetPreviewPanel();
      }}
      uploadFile={() => {
        const file = config.businessRegistrationFile?.cachedFileArray[0];
        file &&
          uploadMerchantLogo(file, (details) => {
            dispatchMerchantDetails({
              ...details,
              showImage: true,
              showUpdateSaveImgBtn: false,
            });
            config.businessRegistrationFile?.resetPreviewPanel();
          });
      }}
      showUpdateSaveImgBtn={showUpdateSaveImgBtn}
    />
  );
};

export default MerchantLogo;
