import {
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
} from "@/app/_services/fetch-service";
import { createUpdateCat, getCategoryQuery } from "../interfaces & enums";
import { errorToast, toastErrorIcons } from "@/app/_utils/toast";
import { appEndPoints } from "@/app/_utils/endpoints";
import * as _ from "lodash";
import { setKeyVal } from "@/app/_utils";

export const createUpdateCategory = (data: createUpdateCat) => {
  const errors = [];
  const { name, id, files, successCallback } = data;
  if (!name.trim()) {
    errors.push("Name of the category cannot be empty");
  }

  if (!id && !files?.cachedFileArray?.[0]) {
    errors.push("Category image has to be added");
  }

  if (errors.length) {
    errorToast({
      msg: errors.join(", "),
      iconType: toastErrorIcons.validation,
    });
    return;
  }

  const payload = id
    ? { name }
    : {
        file: files?.cachedFileArray?.[0],
        data: JSON.stringify({ name }),
      };

  id
    ? makeDataRequest(
        HTTP_METHODS.PUT,
        `${appEndPoints.UPDATE_CATEGORY}${id}`,
        payload,
        undefined,
        { successMsg: "Category updated successfully" },
      ).then((res) => {
        if (!res) return;
        successCallback();
      })
    : makeUploadDataRequest(
        HTTP_METHODS.POST,
        appEndPoints.CREATE_CATEGORY,
        payload,
        undefined,
        {
          successCallback,
          successMsg: id
            ? "Category updated successfully"
            : "Category created successfully",
        },
      ).then((res) => {
        if (!res) return;
      });
};

export const getCategories = (
  query: getCategoryQuery,
  setData: (...arg: any[]) => void,
) => {
  makeDataRequest(HTTP_METHODS.GET, appEndPoints.QUERY_CATEGORIES, undefined, {
    ...query,
  }).then((res) => {
    if (!res) return;

    setData(res);
  });
};

export const updateCatImg = ({
  id,
  file,
  onSuccess,
  uploadSuccessCallback,
}: {
  id: number;
  file: File;
  onSuccess: () => void;
  uploadSuccessCallback: (photo: string) => void;
}) => {
  makeUploadDataRequest(
    HTTP_METHODS.PUT,
    `${appEndPoints.UPDATE_CATEGORY_IMAGE}${id}`,
    { file },
    undefined,
    {
      successMsg: "Category Image uploaded successfully",
      successCallback: onSuccess,
    },
  ).then((response) => {
    if (!response) return;
    uploadSuccessCallback(response.photo);
  });
};
