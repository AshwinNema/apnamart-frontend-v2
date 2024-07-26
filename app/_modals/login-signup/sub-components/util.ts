import type { TokenResponse } from "@react-oauth/google";
import { loginConfig } from "../constants";
import { appEndPoints } from "@/app/_utils/endpoints";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { errorToast } from "@/app/_utils/toast";
import { AppDispatch } from "@/lib/store";
import { setLocalStorageKey } from "@/app/_services/local-storage.service";
import { setUser } from "@/lib/slices/user/user.slice";

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
      if (!response) {
        return;
      }
      const { user, tokens } = response;
      setLocalStorageKey("user", user);
      setLocalStorageKey("tokens", tokens);
      onClose();
      dispatch(setUser(user));
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
  if (!response) {
    return;
  }
  console.log(response, "this is the response")
  const { user, tokens } = response;
  setLocalStorageKey("user", user);
  setLocalStorageKey("tokens", tokens);
  onClose();
  dispatch(setUser(user));
};

export const onTwitterFailure = (err: Error) => {
  errorToast({ msg: err.message });
};
