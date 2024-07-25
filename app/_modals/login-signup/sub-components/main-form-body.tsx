import { ModalBody } from "@nextui-org/react";
import { loginConfig, modalTypes } from "../constants";
import Roles from "./roles";
import Form from "./form";
import { setKeyVal } from "@/app/_utils";
import { Divider } from "@nextui-org/react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@nextui-org/react";
import styles from "../style.module.css";
import { GoogleIcon } from "@/app/_utils/icons & logos";
import { googleSuccessResponse } from "./util";
import { useAppDispatch } from "@/lib/hooks";

export default function MainFormBody({
  config,
  modalType,
  setData,
  onClose,
}: {
  config: loginConfig;
  modalType: modalTypes | null;
  setData: setKeyVal;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const { formData } = config;

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string;

  const GoogleButton = () => {
    const login = useGoogleLogin({
      onSuccess: (credentialResponse) =>
        googleSuccessResponse(
          credentialResponse,
          formData.role,
          onClose,
          dispatch,
        ),
    });

    return (
      <Button
        radius="full"
        className={`${styles.googleBtn} text-white font-bold`}
        variant="bordered"
        onPress={() => login()}
        startContent={<GoogleIcon />}
      >
        {modalType === modalTypes.signUp ? "Sign Up" : "Login"} with Google
      </Button>
    );
  };

  return (
    <ModalBody>
      {config.currentStep === 0 ? (
        <>
          <Roles
            selectedRole={config.formData.role}
            setRole={setData("formData.role")}
            modalType={modalType}
          />
        </>
      ) : null}

      {config.currentStep === 1 ? (
        <>
          <Form
            modalType={modalType}
            formData={formData}
            setData={(key) => setData(`formData.${key}`)}
          />
          <Divider className="my-4" />

          <div className="flex h-10 items-center justify-between">
            <GoogleOAuthProvider clientId={googleClientId}>
              <GoogleButton />
            </GoogleOAuthProvider>

            {/* <Divider orientation="vertical" /> */}
          </div>
        </>
      ) : null}
    </ModalBody>
  );
}
