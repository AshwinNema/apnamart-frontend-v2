import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  getZodErrMsg,
  keyVals,
  setMultiplePaths,
  setNestedPath,
} from "@/app/_utils";
import { ClearIcon } from "@/app/_utils/icons & logos";
import { TextInputProps } from "./interfaces";

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
  const [config, setConfig] = useState({
    invalid: false,
    errorMsg: "",
    label: label || "",
    placeholder: `${placeholder ? placeholder : ""}`,
    isFocussed: false,
  });
  const setDataFunc = setNestedPath(setConfig);
  const setMultipleDataFunc = setMultiplePaths(setConfig);

  useEffect(() => {
    if (!alternateText) return;
    const update: keyVals[] = [
      ["label", ""],
      ["placeholder", ""],
    ];

    if (value || config.isFocussed) {
      update[0][1] = alternateText;
    } else {
      update[1][1] = alternateText;
    }
    setMultipleDataFunc(update);
  }, [alternateText, value, config.isFocussed]);

  const isInvalid = () => {
    if (!value || !validationSchema) {
      return false;
    }
    const validation = validationSchema.safeParse(value);
    if (validation.error) {
      const errMsg = getZodErrMsg(validation.error);
      setDataFunc("errorMsg")(errMsg);
    }

    return !validation.success;
  };

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
