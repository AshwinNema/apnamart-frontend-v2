import { trackPromise } from "react-promise-tracker";
import {
  clearStorage,
  getLocalStorageKey,
  redirect,
  setLocalStorageKey,
} from "./local-storage.service";
import { appEndPoints } from "../_utils/endpoints";
import { toast } from "react-toastify";

export const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

interface token {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}

const getRefreshToken = async (refreshToken: string) => {
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
      toast.error("Token expired");
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

const getToken = async () => {
  const tokens: token = getLocalStorageKey<token>("tokens");

  if (!tokens) {
    return;
  }

  const expiredAt =
    (tokens && tokens.access && tokens.access.expires) || new Date(1971);
  expiredAt.setMinutes(expiredAt.getMinutes() - 1);

  if (expiredAt > new Date()) {
    return tokens.access.token;
  }

  return await getRefreshToken(tokens.refresh.token);
};

interface params {
  [key: string]: number | string | boolean;
}

export const makeDataRequest = async (
  method: string,
  url: string,
  data?: object,
  params?: params,
) => {
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
    }).then((response) => {
      if (response.status === 401) {
        toast.error("Token expired");
        clearStorage();
        redirect("/");
        return;
      }
      if (response.status === 204) {
        return Promise.resolve("ok");
      }
      return response.json();
    }),
  );
};
