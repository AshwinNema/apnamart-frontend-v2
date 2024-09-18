import { Button, Card, CardBody } from "@nextui-org/react";
import { MainRegistrationForm } from "./sub-components";
import { useProfileSelector } from "@/lib/profile/hooks";
import { MerchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { setKeyVal, setNestedPath } from "@/app/_utils";
interface merchantRegistrationState {
  showReviewDetails: boolean;
}
export const MainMerchantRegistrationContext = createContext<{
  config: merchantRegistrationState;
  setConfig: Dispatch<SetStateAction<merchantRegistrationState>>;
  setData: setKeyVal;
} | null>(null);

const MerchantRegistration = () => {
  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );
  const [config, setConfig] = useState<merchantRegistrationState>({
    showReviewDetails: false,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    setData("showReviewDetails")(
      registrationStatus === MerchantRegistrationStatus.adminReview,
    );
  }, [registrationStatus]);
  return (
    <Card>
      {config.showReviewDetails ? (
        <>
          <CardBody>
            Your profile is currently being reviewed by the admin. We will get
            back to you soon! ⏳ If you have any questions, feel free to reach
            out through chat support. 💬
            <div className="mt-5">
              <Button
                onPress={() => {
                  setData("showReviewDetails")(false);
                }}
                variant="bordered"
                color="primary"
              >
                View Profile Details
              </Button>
            </div>
          </CardBody>
        </>
      ) : (
        <MainMerchantRegistrationContext.Provider
          value={{
            config,
            setConfig,
            setData,
          }}
        >
          <MainRegistrationForm />
        </MainMerchantRegistrationContext.Provider>
      )}
    </Card>
  );
};

export const stepperLastBtnText = (id?: number) => {
  return id ? "Update details" : "Register";
};

export default MerchantRegistration;
