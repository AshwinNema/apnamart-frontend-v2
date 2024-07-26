import { trackPromise } from "react-promise-tracker";
import { clearStorage, redirect } from "../local-storage.service";
import { errorToast, toastErrorIcons } from "../../_utils/toast";
import { params, fetchErrParam, getToken } from "./helper";
export * from "./helper";

export const makeDataRequest = async (
  method: string,
  url: string,
  data?: object,
  params?: params,
  errHandling: fetchErrParam = {
    showToastAndRedirect: true,
    iconType: toastErrorIcons.default,
    throwErr: false,
  },
) => {
  const {
    showToastAndRedirect,
    iconType = toastErrorIcons.default,
    throwErr,
  } = errHandling;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`,
  };

  if (params) {
    const query = Object.keys(params)
      .map(
        (k: string) =>
          encodeURIComponent(k) + "=" + encodeURIComponent(params[k]),
      )
      .join("&");
    url = url + "?" + query;
  }

  return trackPromise(
    fetch(url, {
      method,
      body: (data && JSON.stringify(data)) || undefined,
      headers,
    })
      .then(async (response) => {
        if (response.status === 401) {
          if (showToastAndRedirect) {
            errorToast({ msg: "Token expired" });
            clearStorage();
            redirect("/");
          }
          return;
        }
        if (response.status === 204) {
          return Promise.resolve("ok");
        }
        const dataResponse = await response.json();
        if (dataResponse?.statusCode >= 400) {
          if (throwErr) {
            throw new Error(dataResponse.message);
          }
          errorToast({ msg: dataResponse.message, iconType });
          return null;
        }
        return dataResponse;
      })
      .catch((err) => {
        errorToast({ msg: err.message });
      }),
  );
};
