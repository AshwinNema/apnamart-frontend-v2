import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { StepperComponent } from "./stepper";
import { StepperBackBtn, StepperNextBtn } from "./sub-components";

const MerchantRegistration = () => {
  return (
    <Card>
      <CardBody>
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
    </Card>
  );
};

export const stepperLastBtnText = (id?: number) => {
  return id ? "Update details" : "Register";
};

export default MerchantRegistration;
