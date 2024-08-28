import {
  subCatTableDataElement,
} from "@/lib/product/slices/table.slice";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { FileUploadWithPreview } from "file-upload-with-preview";

export interface UploadDetails {
  id?: number;
  name: string;
  upload: FileUploadWithPreview | null;
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

export interface tableDataDataElement extends subCatTableDataElement {}
