import { toastErrorIcons } from "@/app/_utils/toast";

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
}
