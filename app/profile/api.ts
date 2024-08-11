import { setUser, UserInterface } from "@/lib/slices/user/user.slice";
import {
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
} from "../_services/fetch-service";
import { appEndPoints } from "../_utils/endpoints";
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from "../_services/local-storage.service";
import { AppDispatch } from "@/lib/store";

export const getUserProfile = (dispatch: AppDispatch) => {
  makeDataRequest(HTTP_METHODS.GET, appEndPoints.PROFILE).then((res) => {
    if (!res) {
      return;
    }
    let user = getLocalStorageKey("user") as UserInterface;
    user = { ...user, ...res };
    dispatch(setUser(user));
    setLocalStorageKey("user", user);
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

    let user = getLocalStorageKey("user") as UserInterface;
    user = { ...user, ...res };
    dispatch(setUser(user));
    setLocalStorageKey("key", user);
  });
};
