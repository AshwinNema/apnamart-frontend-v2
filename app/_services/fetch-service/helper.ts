import { toastErrorIcons } from "@/app/_utils/toast";
import { getLocalStorageKey } from "../local-storage.service";
import { getRefreshToken } from "./helper-apis";

export const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

export interface token {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}

export interface params {
  [key: string]: number | string | boolean;
}

export interface fetchErrParam {
  showToastAndRedirect?: boolean;
  iconType?: toastErrorIcons;
  throwErr?: boolean;
}

export const getToken = async () => {
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
