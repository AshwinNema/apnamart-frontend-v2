import type { TokenResponse } from "@react-oauth/google";
import { loginConfig, modalTypes } from "../constants";
import {
  HTTP_METHODS,
  makeDataRequest,
  setLocalStorageKey,
  storageAttributes,
} from "@/app/_services";
import { errorToast, setKeyVal, appEndPoints } from "@/app/_utils";
import { AppDispatch } from "@/lib/main/store";
import { setUser } from "@/lib/main/slices/user/user.slice";
import { handleAction } from "@/app/layout-components/notifications/new-user";

export interface MainModalBodyProps {
  config: loginConfig;
  modalType: modalTypes | null;
  setData: setKeyVal;
  onClose: () => void;
}

const processSuccessResponse = (
  response: any,
  onClose: () => void,
  dispatch: AppDispatch,
) => {
  if (!response) {
    return;
  }
  const { user, tokens, noInitialPassword, isNewUser } = response;
  setLocalStorageKey(storageAttributes.user, user);
  setLocalStorageKey(storageAttributes.tokens, tokens);
  onClose();
  if (isNewUser) {
    dispatch(
      handleAction({
        name: user.name,
        role: user.role,
        noInitialPassword: noInitialPassword,
      }),
    );
  }
  dispatch(setUser(user));
};

export const googleSuccessResponse = (
  {
    credentialResponse,
    ...body
  }: {
    credentialResponse: TokenResponse;
    role: loginConfig["formData"]["role"];
    accessType: modalTypes | null;
  },
  onClose: () => void,
  dispatch: AppDispatch,
) => {
  const { access_token } = credentialResponse;

  makeDataRequest(
    HTTP_METHODS.POST,
    appEndPoints.GOOGLE_LOGIN,
    { token: access_token, ...body },
    undefined,
    { showToastAndRedirect: false },
  )
    .then((response) => {
      processSuccessResponse(response, onClose, dispatch);
    })
    .catch((err) => {
      errorToast({ msg: err?.message });
    });
};

export const onTwitterSuccess = (
  response: any,
  onClose: () => void,
  dispatch: AppDispatch,
) => {
  processSuccessResponse(response, onClose, dispatch);
};

export const onTwitterFailure = (err: Error) => {
  errorToast({ msg: err.message });
};
