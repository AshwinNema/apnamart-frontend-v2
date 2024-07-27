import { ModalBody } from "@nextui-org/react";
import { loginConfig, modalTypes } from "../constants";
import Roles from "./roles";
import Form from "./form";
import { setKeyVal } from "@/app/_utils";
import { Divider } from "@nextui-org/react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@nextui-org/react";
import styles from "../style.module.css";
import { FcGoogle } from "react-icons/fc";

import {
  googleSuccessResponse,
  onTwitterFailure,
  onTwitterSuccess,
} from "./util";
import { useAppDispatch } from "@/lib/hooks";
import TwitterLogin from "./twitter-login";
import { appEndPoints } from "@/app/_utils/endpoints";

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
        startContent={<FcGoogle className="scale-[1.75]" />}
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

            <Divider orientation="vertical" />
            <TwitterLogin
              text={`${modalType === modalTypes.signUp ? "Sign Up" : "Login"} with Twitter`}
              loginUrl={appEndPoints.TWITTER_ACCESS_TOKEN}
              requestTokenUrl={appEndPoints.TWITTER_REQUEST_TOKEN}
              additonalAcessParams={{ role: config.formData.role }}
              onSuccess={(response) =>
                onTwitterSuccess(response, onClose, dispatch)
              }
              onFailure={onTwitterFailure}
            />
          </div>
        </>
      ) : null}
    </ModalBody>
  );
}
