import { trackPromise } from "react-promise-tracker";
import { clearStorage, redirect } from "../local-storage.service";
import { errorToast, successToast, toastErrorIcons } from "../../_utils/toast";
import {
  params,
  getToken,
  HTTP_METHODS,
  addQuery,
  uploadRespHandling,
  fetchConfig,
} from "./helper";
export * from "./helper";

export const makeDataRequest = async (
  method: HTTP_METHODS,
  url: string,
  data?: object,
  params?: params,
  errHandling: fetchConfig = {
    showToastAndRedirect: true,
    iconType: toastErrorIcons.default,
    throwErr: false,
    showLoader: true,
    showToast: true,
  },
) => {
  const {
    showToastAndRedirect = true,
    iconType = toastErrorIcons.default,
    throwErr,
    showLoader = true,
    showToast = true,
  } = errHandling;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`,
  };

  url += addQuery(params);
  const promise = fetch(url, {
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
        if (showToast) {
          errorToast({ msg: dataResponse.message, iconType });
        }

        return null;
      }
      return dataResponse;
    })
    .catch((err) => {
      errorToast({ msg: err.message });
    });
  if (showLoader) {
    return trackPromise(promise);
  }
  return promise;
};

export const makeUploadDataRequest = async (
  method: HTTP_METHODS,
  url: string,
  data: object,
  params?: params,
  responseHandling: uploadRespHandling = {
    showToastAndRedirect: true,
    iconType: toastErrorIcons.default,
    throwErr: false,
    successMsg: "",
  },
) => {
  const {
    showToastAndRedirect,
    iconType = toastErrorIcons.default,
    throwErr,
    successCallback,
    successMsg,
  } = responseHandling;
  const headers = {
    Authorization: `Bearer ${await getToken()}`,
  };
  url += addQuery(params);
  const formData = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    formData.append(key, val);
  });

  return trackPromise(
    fetch(url, {
      method,
      body: formData,
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
        successToast({ msg: successMsg });
        successCallback && successCallback();
        return dataResponse;
      })
      .catch((err) => {
        errorToast({ msg: err.message });
      }),
  );
};
