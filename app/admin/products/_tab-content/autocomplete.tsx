import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { tabKeys } from "../helper";
import { appEndPoints } from "@/app/_utils/endpoints";
import { Autocomplete as AutoCompleteComponent } from "@/app/_custom-components/inputs";

export default function Autocomplete({
  tabType,
  loadData,
}: {
  tabType: tabKeys;
  loadData: (pahe: number, id: number) => void;
}) {
  const getInputSearch = (name: string) => {
    const url =
      tabType === tabKeys.category ? appEndPoints.GET_CATEGORY_NAME_LIST : "";
    return makeDataRequest(HTTP_METHODS.GET, url, undefined, { name })
      .then((res) => {
        if (!res) return [];
        return res.map((item: { id: number; name: string; photo: string }) => {
          return {
            id: item.id,
            label: item.name,
            photo: item.photo,
          };
        });
      })
      .catch(() => []);
  };
  return (
    <AutoCompleteComponent
      getListItems={(name: string) => getInputSearch(name)}
      label="Search by name"
      size="sm"
      color="primary"
      onSelectionChange={(id) => {
        loadData(1, id as number);
      }}
      variant="faded"
    />
  );
}
