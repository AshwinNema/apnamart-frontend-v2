import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { keyVals } from "@/app/_utils";
import { appEndPoints } from "@/app/_utils/endpoints";
import { addressPayload } from "./interfaces-enums-default vals-schemas";
import {
  errorToast,
  successToast,
  toastSuccessIcons,
} from "@/app/_utils/toast";
import { setUser, UserInterface } from "@/lib/slices/user/user.slice";
import { AppDispatch } from "@/lib/store";
import { setLocalStorageKey, storageAttributes } from "@/app/_services/local-storage.service";

export const getAddress = (
  latLng: { lat: number; lng: number },
  setMultiPaths: (keyVals: keyVals[]) => void,
) => {
  setMultiPaths([["isAddLoaded", false]]);
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.GET_ADDRESS,
    undefined,
    latLng,
    {
      showLoader: false,
      showToast: false,
    },
  )
    .then((res) => {
      const results = res?.results;
      const address = results?.[0]?.formatted_address || "Location not found";
      setMultiPaths([["address", address]]);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setMultiPaths([["isAddLoaded", true]]);
    });
};

export const updateUserAddress = (
  payload: addressPayload,
  user: UserInterface,
  dispatch: AppDispatch,
) => {
  makeDataRequest(HTTP_METHODS.PUT, appEndPoints.UPDATE_USER_ADDRESS, payload)
    .then((res) => {
      if (!res) return;
      const updatedUser = { ...user, address: res };
      dispatch(setUser(updatedUser));
      setLocalStorageKey(storageAttributes.user, updatedUser);
      successToast({
        msg: "User address updated successfully",
        iconType: toastSuccessIcons.rocket,
      });
    })
    .catch((err) => {
      errorToast({ msg: err.message });
    });
};
