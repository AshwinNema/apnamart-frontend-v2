import { Button, Card, CardBody } from "@nextui-org/react";
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
import RegistrationForm from "./registration-form";
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
    <Card className="h-[80svh]">
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
          <RegistrationForm />
        </MainMerchantRegistrationContext.Provider>
      )}
    </Card>
  );
};

export default MerchantRegistration;
