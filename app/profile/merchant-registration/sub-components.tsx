import { Button, CardBody, CardFooter } from "@nextui-org/react";
import {
  StepperBackBtn,
  StepperNextBtn,
} from "./registration-form/sub-components";
import { StepperComponent } from "./registration-form/stepper";
import { MdArrowBackIosNew } from "react-icons/md";
import { useProfileSelector } from "@/lib/profile/hooks";
import { MerchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { MainMerchantRegistrationContext } from ".";
import { useContext } from "react";
import { variants } from "@/app/_utils";
import { ToolTipBtn } from "@/app/_custom-components";

export const MainRegistrationForm = () => {
  const underReview =
    useProfileSelector((state) => state.merchantDetails.registrationStatus) ===
    MerchantRegistrationStatus.adminReview;

  const context = useContext(MainMerchantRegistrationContext);
  if (!context) return;
  const { setData } = context;
  return (
    <>
      <CardBody>
        {underReview ? (
          <ToolTipBtn
            toolTipProps={{
              color: "secondary",
              content: "Go back to main screen",
            }}
            buttonProps={{
              color: "secondary",
              variant: "ghost",
              isIconOnly: true,
              onPress: () => {
                setData("showReviewDetails")(true);
              },
            }}
          >
            <MdArrowBackIosNew />
          </ToolTipBtn>
        ) : null}
        <StepperComponent />
      </CardBody>

      <CardFooter>
        <div className="flex justify-between w-full">
          <div>
            <StepperBackBtn />
          </div>
          <div>
            <StepperNextBtn />
          </div>
        </div>
      </CardFooter>
    </>
  );
};
