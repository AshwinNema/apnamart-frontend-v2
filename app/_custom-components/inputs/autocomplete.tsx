import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import * as _ from "lodash";
import React, { Key, useEffect, useState } from "react";
import { AutoCompleteProps, autoCompleteState } from "./interfaces";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { keyVals, setMultiplePaths, setNestedPath } from "@/app/_utils";
import { onAutoCompleteSelectionChange } from "./utils";

export const AutoCompleteComponent = ({
  label,
  size = "md",
  variant = "flat",
  color = "default",
  method = HTTP_METHODS.GET,
  url,
  list,
  onSelectionChange,
  processLogic,
  isClearable,
  labelPlacement = "inside",
  fullWidth,
  allowsCustomValue,
  selectedKey = null,
}: AutoCompleteProps): React.JSX.Element => {
  const [config, setConfig] = useState<autoCompleteState>({
    itemList: [],
    inputValue: "",
    selectionKeyType: null,
    selectedKey: null,
  });

  const setData = setNestedPath(setConfig);
  const setMultipleData = setMultiplePaths(setConfig);
  const { itemList, inputValue, selectionKeyType } = config;

  useEffect(() => {
    selectedKey &&
      !selectionKeyType &&
      setData("selectionKeyType")(typeof selectedKey);
  }, [selectedKey, selectionKeyType]);

  useEffect(() => {
    list && setData("itemList")(list);
  }, [list]);

  useEffect(() => {
    url &&
      processLogic &&
      makeDataRequest(method, url).then((res) => {
        const { data, inputVal } = processLogic(res);
        const update: keyVals[] = [
          ["itemList", data],
          ["inputValue", inputVal],
        ];
        selectedKey && update.push(["selectedKey", selectedKey]);
        setMultipleData(update);
      });
  }, [url]);

  return (
    <>
      <Autocomplete
        label={label}
        variant={variant}
        allowsEmptyCollection={false}
        fullWidth={!!fullWidth}
        size={size}
        color={color}
        selectedKey={config.selectedKey}
        inputValue={inputValue}
        onInputChange={(val: string) => {
          setData("inputValue")(val);
          !val && onSelectionChange(null);
        }}

        isClearable={!!isClearable}
        allowsCustomValue={allowsCustomValue}
        items={itemList}
        labelPlacement={labelPlacement}
        onSelectionChange={(key: Key | null) => {
          onAutoCompleteSelectionChange(
            key,
            selectionKeyType,
            itemList,
            setMultipleData,
            onSelectionChange,
          );
        }}
      >
        {(item: any) => (
          <AutocompleteItem
            startContent={
              <>
                {item.photo ? (
                  <Avatar
                    alt={item.label}
                    className="w-6 h-6"
                    src={item.photo}
                  />
                ) : null}
              </>
            }
            key={item.id}
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};

export default AutoCompleteComponent;
