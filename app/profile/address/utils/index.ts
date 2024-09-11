import { errorToast, infoToast, toastErrorIcons } from "@/app/_utils/toast";
import {
  drawerVal,
  drawerValidation,
  queryLocationResp,
} from "./interfaces-enums-default vals-schemas";
import { getZodErrMsg, setVal } from "@/app/_utils";
import { ProfileDispatch } from "@/lib/profile/store";
import { setAddressDetails } from "@/lib/profile/slices/address-slice";
export * from "./interfaces-enums-default vals-schemas";
export * from "./apis";

export const processQueryLocations = (data: queryLocationResp[]) => {
  return data.map(
    ({
      geometry: {
        location: { lat, lng },
      },
      description,
      place_id,
    }: queryLocationResp) => {
      return {
        id: place_id,
        lat,
        lng,
        label: description,
      };
    },
  );
};

export async function getUserLocation(
  successCallback: (latLng: [number, number]) => any,
) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        successCallback([latitude, longitude]);
      },
      (error) => {
        switch (error.code) {
          case 1:
            errorToast({
              msg: "You have to enable location access in the browser first in order to enable map to find your location",
              iconType: toastErrorIcons.locationDenied,
            });
            break;

          case 2:
            errorToast({
              msg: "Sorry something internally went wrong",
              iconType: toastErrorIcons.browserDenied,
            });
            break;

          default:
            errorToast({
              msg: "Sorry something went wrong",
            });
            break;
        }
      },
      {
        enableHighAccuracy: true,
      },
    );
  }
}

export const saveDrawerDetails = (
  details: drawerVal,
  onOpenChange: () => void,
  dispatch: ProfileDispatch,
) => {
  const data = drawerValidation.safeParse(details);
  if (data.error) {
    const errMsg = getZodErrMsg(data.error);
    errorToast({ msg: errMsg, iconType: toastErrorIcons.validation });
    return;
  }
  dispatch(setAddressDetails(structuredClone(details)));
  infoToast({
    msg: "Please click on save button on the right bottom of the map to save address details",
  });
  onOpenChange();
};
