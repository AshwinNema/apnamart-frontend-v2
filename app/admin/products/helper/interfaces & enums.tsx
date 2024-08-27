import { setKeyVal } from "@/app/_utils";
import { FileUploadWithPreview } from "file-upload-with-preview";

export interface UploadDetails {
  id?: number;
  name: string;
  upload: FileUploadWithPreview | null;
}

export enum tabKeys {
  category = "Category",
  subCategory = "Sub Category",
  items = "Items",
}

export interface tabOption {
  title: string;
  Content: (props: any) => React.JSX.Element;
  key: tabKeys;
}

export interface createUpdateParams {
  name: string;
  id?: number;
  files?: FileUploadWithPreview | null;
  successCallback: () => void;
}

export interface getDataQuery {
  limit: number;
  page: number;
  id?: number;
}

export interface categoryTableDataElement {
  photo: string;
  id: number;
  name: string;
}

export interface subCatTableDataElement extends categoryTableDataElement {
  categoryId: number;
  categoryName: string;
}

export interface tableDataDataElement extends subCatTableDataElement{}

export interface dataTable<tableElementData> {
  limit: number;
  page: number;
  totalResults: number;
  results: tableElementData[];
  totalPages: number;
}

export interface tabComponentState<tableElementData> {
  table: dataTable<tableElementData>;
  modalDetails: null | tableElementData;
}

export interface modalBody {
  tabType: tabKeys,
  setMainData: setKeyVal;
  mainConfig: UploadDetails;
  modalDetails: categoryTableDataElement | subCatTableDataElement | null;
  successCallback: () => void;
  uploadSuccessCallback: (photo: string) => void;
}
