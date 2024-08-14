import type { TokenResponse } from "@react-oauth/google";
import { loginConfig } from "../constants";
import { appEndPoints } from "@/app/_utils/endpoints";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { errorToast } from "@/app/_utils/toast";
import { AppDispatch } from "@/lib/store";
import {
  setLocalStorageKey,
  storageAttributes,
} from "@/app/_services/local-storage.service";
import { setUser } from "@/lib/slices/user/user.slice";
import { handleAction } from "@/app/layout-components/notifications/new-user";

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
  credentialResponse: TokenResponse,
  role: loginConfig["formData"]["role"],
  onClose: () => void,
  dispatch: AppDispatch,
) => {
  const { access_token } = credentialResponse;

  makeDataRequest(
    HTTP_METHODS.POST,
    appEndPoints.GOOGLE_LOGIN,
    { token: access_token, role },
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
