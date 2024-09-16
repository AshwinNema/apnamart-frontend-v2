import { IoSaveSharp } from "react-icons/io5";
import {
  nxtSaveBtnState,
  step2Details,
  validatePickUpAddress,
} from "../../../utils";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import { ToolTipBtn } from "@/app/_custom-components";
import { useState } from "react";
import { infoToast } from "@/app/_utils";
import { getSavingInfoContent, SuccessToolTipContent } from "./sub-components";

export const DrawerSaveBtn = ({
  config: allDetails,
  onOpenChange,
}: {
  config: step2Details;
  onOpenChange: () => void;
}) => {
  const dispatch = useProfileDispatch();
  const merchantId = useProfileSelector((state) => state.merchantDetails.id);
  const [config, setConfig] = useState<nxtSaveBtnState>({
    toolTipMsg: "",
    toolTipColor: "default",
  });

  const updateTooltipState = () => {
    const { error, errMsg } = validatePickUpAddress(allDetails);
    if (error) {
      setConfig((prevConfig) => {
        prevConfig.toolTipColor = "danger";
        prevConfig.toolTipMsg = errMsg;
        return {
          ...prevConfig,
        };
      });
      return;
    }

    setConfig((prevConfig) => {
      prevConfig.toolTipColor = "secondary";
      prevConfig.toolTipMsg = <SuccessToolTipContent />;
      return { ...prevConfig };
    });
  };
  return (
    <div className="flex justify-end">
      <ToolTipBtn
        buttonProps={{
          className: "mt-3",
          startContent: <IoSaveSharp />,
          onPress: () => {
            const { error, data } = validatePickUpAddress(allDetails, true);
            if (error) {
              return;
            }
            dispatch(setMerchantDetails(data));
            infoToast({
              msg: (
                <div className="align-middle inline-block">
                  Please click on {getSavingInfoContent(merchantId)}
                </div>
              ),
            });
            onOpenChange();
          },
          color: "primary",
        }}
        toolTipProps={{
          color: config.toolTipColor,
          content: config.toolTipMsg,
          onOpenChange: (isOpen: boolean) => {
            isOpen && updateTooltipState();
          },
        }}
      >
        Save
      </ToolTipBtn>
    </div>
  );
};
