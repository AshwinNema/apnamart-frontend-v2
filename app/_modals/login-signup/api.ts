import { toast } from "react-toastify";
import {
  loginValidationSchema,
  loginConfig,
  modalTypes,
  signUpValidationSchema,
} from "./constants";
import { appEndPoints } from "@/app/_utils/endpoints";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch.service";
import { ValidationErrIcon } from "@/app/_utils/icons & logos";
import { getZodErrMsg } from "@/app/_utils";
import { setLocalStorageKey } from "@/app/_services/local-storage.service";
import { setUser } from "@/lib/slices/user/user.slice";
import { AppDispatch } from "@/lib/store";

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
    toast.error(errMsg, { icon: ValidationErrIcon });
    return;
  }

  const url =
    modalType === modalTypes.login ? appEndPoints.LOGIN : appEndPoints.REGISTER;

  try {
    const { user, tokens } = await makeDataRequest(
      HTTP_METHODS.POST,
      url,
      data.data,
    );
    setLocalStorageKey("user", user);
    setLocalStorageKey("tokens", tokens);
    onClose();
    dispatch(setUser(user));
  } catch (err: any) {
    toast.error(err?.message);
  }
};
