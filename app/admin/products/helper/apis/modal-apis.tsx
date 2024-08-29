import {
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
} from "@/app/_services/fetch-service";
import { createUpdateParams } from "../interfaces & enums";
import { errorToast, toastErrorIcons } from "@/app/_utils/toast";
import { appEndPoints } from "@/app/_utils/endpoints";
import * as _ from "lodash";
import {
  setDetails,
  tabKeys,
} from "@/lib/product/slices/component-details.slice";
import { ProductDispatch } from "@/lib/product/store";
import { setModalDetails } from "@/lib/product/slices/modal-details.slice";
import { getCreateUpdatePayload, getCreateUrl } from "./utils";

export const createUpdateData = (data: createUpdateParams) => {
  const errors = [];
  const { payloadData, successCallback, tab } = data;
  const { name, id, files, categoryId } = payloadData;
  !name.trim() && errors.push("Name cannot be empty");
  !id &&
    !files?.cachedFileArray?.[0] &&
    errors.push(`${tab} image has to be added`);
  tab !== tabKeys.category &&
    !categoryId &&
    errors.push("Category is mandatory");

  if (errors.length) {
    errorToast({
      msg: errors.join(", "),
      iconType: toastErrorIcons.validation,
    });
    return;
  }
  const payload = getCreateUpdatePayload({ name, tab, id, files, categoryId });

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
        getCreateUrl(tab),
        payload,
        undefined,
        {
          successCallback,
          successMsg: id
            ? `${tab} updated successfully`
            : `${tab} created successfully`,
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
  refreshData: boolean;
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
    dispatch(setDetails({ refreshData: !refreshData }));
  });
};
