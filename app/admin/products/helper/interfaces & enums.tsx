import { setKeyVal } from "@/app/_utils";
import { FileUploadWithPreview } from "file-upload-with-preview";

export interface CategoryUploadDetails {
  id?: number;
  name: string;
  upload: FileUploadWithPreview | null;
}

export enum tabKeys {
  category = "Category",
  subCategory = "Sub Category",
}

export interface tabOption {
  title: string;
  Content: (props: any) => React.JSX.Element;
  key: tabKeys;
}

export interface createUpdateCat {
  name: string;
  id?: number;
  files?: FileUploadWithPreview | null;
  successCallback: () => void;
}

export interface getCategoryQuery {
  limit: number;
  page: number;
}

export interface categoryTableData {
  photo: string;
  id: number;
  name: string;
}

export interface categoryTable {
  limit: number;
  page: number;
  totalResults: number;
  results: categoryTableData[];
  totalPages: number;
}

export interface categoryComponentState {
  table: categoryTable;
  modalDetails: null | categoryTableData;
}

export interface categoryModalBody {
  setMainData: setKeyVal;
  mainConfig: CategoryUploadDetails;
  modalDetails: categoryTableData | null;
  successCallback: () => void;
  uploadSuccessCallback: (photo: string) => void;
}
