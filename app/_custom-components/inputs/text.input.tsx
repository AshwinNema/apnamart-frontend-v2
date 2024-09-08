import { Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { keyVals, setMultiplePaths, setNestedPath } from "@/app/_utils";
import { ClearIcon } from "@/app/_utils/icons & logos";
import { TextInputProps, TextInputState } from "./interface";
import { alternateTextCheck, invalidTextInputCheck } from "./utils";

export const TextInput = ({
  value,
  setData,
  validationSchema,
  Icon,
  label,
  placeholder,
  className = "",
  classNames,
  alternateText,
  variant = "bordered",
  autoFocus = false,
  labelPlacement = "inside",
  fullWidth = false,
}: TextInputProps) => {
  const [config, setConfig] = useState<TextInputState>({
    invalid: false,
    errorMsg: "",
    label: label || "",
    placeholder: `${placeholder ? placeholder : ""}`,
    isFocussed: false,
  });
  const isInputClicked = useRef(false);
  const setDataFunc = setNestedPath(setConfig);
  const setMultipleDataFunc = setMultiplePaths(setConfig);

  useEffect(() => {
    const clicked = () => {
      if (isInputClicked.current) {
        isInputClicked.current = false;
        return;
      }
      setDataFunc("isFocussed")(false);
    };
    document.body.addEventListener("click", clicked);
    alternateTextCheck(alternateText, value, config, setMultipleDataFunc);

    return () => {
      document.body.removeEventListener("click", clicked);
    };
  }, [alternateText, value, config.isFocussed]);

  const isInvalid = () =>
    invalidTextInputCheck(value, validationSchema, setDataFunc);

  const EndContent = () => {
    return !!value ? <ClearIcon onClick={() => setData("")} /> : null;
  };

  return (
    <Input
      classNames={classNames}
      autoFocus={autoFocus}
      startContent={<>{Icon && <Icon />}</>}
      value={value}
      isInvalid={config.invalid}
      color={config.invalid ? "danger" : "default"}
      labelPlacement={labelPlacement}
      errorMessage={`${config.errorMsg}`}
      isClearable={false}
      fullWidth={fullWidth}
      onClick={() => {
        isInputClicked.current = true;
      }}
      onFocus={() => {
        setDataFunc("isFocussed")(true);
      }}
      endContent={<EndContent />}
      onValueChange={setData}
      label={config.label}
      className={`${className}`}
      placeholder={config.placeholder}
      variant={variant}
      onBlur={() => {
        const updates: keyVals[] = [
          ["invalid", isInvalid()],
          ["isFocussed", false],
        ];
        setMultipleDataFunc(updates);
      }}
    />
  );
};
