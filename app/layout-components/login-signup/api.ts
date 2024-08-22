import {
  loginValidationSchema,
  loginConfig,
  modalTypes,
  signUpValidationSchema,
} from "./constants";
import { appEndPoints } from "@/app/_utils/endpoints";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { getZodErrMsg } from "@/app/_utils";
import {
  setLocalStorageKey,
  storageAttributes,
} from "@/app/_services/local-storage.service";
import { setUser } from "@/lib/slices/user/user.slice";
import { AppDispatch } from "@/lib/store";
import { errorToast, toastErrorIcons } from "@/app/_utils/toast";
import { handleAction } from "@/app/layout-components/notifications/new-user";

export const loginSignUp = async (
  formData: loginConfig["formData"],
  onClose: () => void,
  modalType: modalTypes | null,
  dispatch: AppDispatch,
) => {
  const data =
    modalType === modalTypes.signUp
      ? signUpValidationSchema.safeParse(formData)
      : loginValidationSchema.safeParse(formData);

  if (data?.error) {
    const errMsg = getZodErrMsg(data.error);
    errorToast({ msg: errMsg, iconType: toastErrorIcons.validation });
    return;
  }

  const url =
    modalType === modalTypes.login ? appEndPoints.LOGIN : appEndPoints.REGISTER;

  try {
    const userData = await makeDataRequest(
      HTTP_METHODS.POST,
      url,
      data.data,
      undefined,
      { showToastAndRedirect: false },
    );
    if (!userData) return;
    const { user, tokens } = userData;
    setLocalStorageKey(storageAttributes.user, user);
    setLocalStorageKey(storageAttributes.tokens, tokens);
    onClose();
    window.sessionStorage.setItem("isUserFetched", "true");
    if (modalType === modalTypes.signUp) {
      dispatch(
        handleAction({
          name: user.name,
          role: formData.role,
        }),
      );
    }
    dispatch(setUser(user));
  } catch (err: any) {
    errorToast({ msg: err?.message });
  }
};
