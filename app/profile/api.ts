import { setUser, UserInterface } from "@/lib/main/slices/user/user.slice";
import {
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
  getLocalStorageKey,
  setLocalStorageKey,
  storageAttributes,
} from "../_services";
import { appEndPoints } from "../_utils/endpoints";
import { AppDispatch } from "@/lib/main/store";
import { z } from "zod";
import { checkMerchantRegistration, tabKeys, userInputPage } from "./utils";
import { getZodErrMsg, passwordErrMsg, passwordRegex } from "../_utils";
import {
  errorToast,
  successToast,
  toastErrorIcons,
  toastSuccessIcons,
} from "../_utils/toast";

export const getUserProfile = (dispatch: AppDispatch) => {
  makeDataRequest(HTTP_METHODS.GET, appEndPoints.PROFILE).then((res) => {
    if (!res) {
      return;
    }
    let user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    user = { ...user, ...res };
    dispatch(setUser(user));
    setLocalStorageKey(storageAttributes.user, user);
    checkMerchantRegistration(user, dispatch);
  });
};

export const uploadProfileImage = (file: File, dispatch: AppDispatch) => {
  makeUploadDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.UPLOAD_PROFILE_IMG,
    { file },
    undefined,
    {
      successMsg: "Profile picture updated successfully",
    },
  ).then((res) => {
    if (!res) return;

    let user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    user = { ...user, ...res };
    dispatch(setUser(user));
    setLocalStorageKey(storageAttributes.user, user);
  });
};

export const updateUserDetails = (
  details: { password: string } | { name: string; email: string },
  type: userInputPage,
  dispatch: AppDispatch,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.UPDATE_USER_PROFILE,
    details,
  ).then((res) => {
    const schema =
      type == tabKeys.settings
        ? z.object({
            password: z.string().regex(passwordRegex, {
              message: passwordErrMsg,
            }),
          })
        : z.object({
            name: z.string(),
            email: z.string().email(),
          });

    const parsedData = schema.safeParse(details);
    if (parsedData?.error) {
      const errMsg = getZodErrMsg(parsedData.error);
      errorToast({
        msg: errMsg,
        iconType: toastErrorIcons.validation,
      });
      return;
    }
    if (!res) return;
    let user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    user = { ...user, ...res };
    successToast({
      msg: "User details updated successfully",
      iconType: toastSuccessIcons.rocket,
    });
    dispatch(setUser(user));
    setLocalStorageKey(storageAttributes.user, user);
  });
};
