import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import * as _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { autoCompleteListItem, AutoCompleteProps } from "./interfaces";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { setNestedPath } from "@/app/_utils";

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
  selectedKey,
}: AutoCompleteProps): React.JSX.Element => {
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const [config, setConfig] = useState<{
    itemList: autoCompleteListItem[];
  }>({
    itemList: [],
  });

  const setData = setNestedPath(setConfig);
  const { itemList } = config;

  useEffect(() => {
    list && setData("itemList")(list);
  }, [list]);

  useEffect(() => {
    url &&
      processLogic &&
      makeDataRequest(method, url).then((res) =>
        setData("itemList")(processLogic(res)),
      );
  }, [url]);
  return (
    <>
      <Autocomplete
        label={label}
        variant={variant}
        ref={autoCompleteRef}
        allowsEmptyCollection={false}
        fullWidth={!!fullWidth}
        size={size}
        color={color}
        selectedKey={selectedKey}
        isClearable={!!isClearable}
        allowsCustomValue={allowsCustomValue}
        items={itemList}
        labelPlacement={labelPlacement}
        onSelectionChange={(key) => {
          onSelectionChange(key);
        }}
      >
        {itemList.map((item) => {
          return (
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
          );
        })}
      </Autocomplete>
    </>
  );
};

export default AutoCompleteComponent;
