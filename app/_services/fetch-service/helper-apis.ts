import { appEndPoints } from "@/app/_utils/endpoints";
import { trackPromise } from "react-promise-tracker";
import { HTTP_METHODS } from "./helper";
import { errorToast } from "@/app/_utils/toast";
import {
  clearStorage,
  redirect,
  setLocalStorageKey,
} from "../local-storage.service";

export const getRefreshToken = async (refreshToken: string) => {
  try {
    const response = await trackPromise(
      fetch(appEndPoints.REFRESH_TOKEN, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({
          token: refreshToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
    const tokens = await response.json();
    if (tokens?.code === 401) {
      errorToast({ msg: "Token expired" });
      clearStorage();
      setTimeout(() => {
        redirect("/");
      }, 2000);
      return;
    } else {
      setLocalStorageKey("tokens", tokens);
    }
    return tokens.access.token;
  } catch (err) {
    console.log("Error occurred while getting refresh token", err);
    return "";
  }
};
