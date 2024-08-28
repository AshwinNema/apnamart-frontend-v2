import {
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
} from "@/app/_services/fetch-service";
import { createUpdateParams } from "../interfaces & enums";
import { errorToast, toastErrorIcons } from "@/app/_utils/toast";
import { appEndPoints } from "@/app/_utils/endpoints";
import * as _ from "lodash";
import { setDetails, tabKeys } from "@/lib/product/slices/component-details.slice";
import { ProductDispatch } from "@/lib/product/store";
import { setModalDetails } from "@/lib/product/slices/modal-details.slice";

export const createUpdateData = (data: createUpdateParams) => {
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

export const updateMainImg = ({
  id,
  file,
  refreshData,
  tabType,
  dispatch,
}: {
  id: number;
  file: File;
  refreshData:boolean;
  tabType: tabKeys;
  dispatch: ProductDispatch;
}) => {
  const url =
    tabType === tabKeys.category
      ? `${appEndPoints.UPDATE_CATEGORY_IMAGE}${id}`
      : "";
  makeUploadDataRequest(HTTP_METHODS.PUT, url, { file }, undefined, {
    successMsg: "Category Image uploaded successfully",
  }).then((response) => {
    if (!response) return;
    dispatch(
      setModalDetails({
        photo: response.photo,
      }),
    );
    dispatch(setDetails({refreshData:!refreshData}))
  });
};
