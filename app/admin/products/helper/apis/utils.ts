import { appEndPoints } from "@/app/_utils/endpoints";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { FileUploadWithPreview } from "file-upload-with-preview";

export const getCreateUpdatePayload = ({
  name,
  tab,
  id,
  files,
  categoryId,
}: {
  name: string;
  tab: tabKeys;
  id: number | undefined;
  files?: FileUploadWithPreview | null;
  categoryId: number | null;
}) => {
  const apiBody: {
    name: string;
    categoryId?: number;
  } = { name };
  if (tab !== tabKeys.category && categoryId) {
    apiBody.categoryId = Number(categoryId);
  }
  const payload = id
    ? apiBody
    : {
        file: files?.cachedFileArray?.[0],
        data: JSON.stringify(apiBody),
      };

  return payload;
};

export const getCreateUrl = (tab: tabKeys) => {
  switch (tab) {
    case tabKeys.category:
      return appEndPoints.CREATE_CATEGORY;

    case tabKeys.subCategory:
      return appEndPoints.CREATE_SUB_CATEGORY;

    default:
      return "";
  }
};

export const getUpdateUrl = (tab: tabKeys, id: number) => {
  let url = "";
  switch (tab) {
    case tabKeys.category:
      url = appEndPoints.UPDATE_CATEGORY;
      break;

    case tabKeys.subCategory:
      url = appEndPoints.UPDATE_SUB_CATEGORY;
      break;

    default:
      break;
  }
  return `${url}${id}`;
};
