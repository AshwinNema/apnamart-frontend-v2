import { Input } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { ZodSchema } from "zod";
import {
  getZodErrMsg,
  keyVals,
  setMultiplePaths,
  setNestedPath,
  setVal,
} from "@/app/_utils";
import { ClearIcon } from "@/app/_utils/icons & logos";

export const TextInput = ({
  value,
  setData,
  validationSchema,
  Icon,
  label,
  placeholder,
  className = "",
  alternateText,
  variant = "bordered",
  autoFocus = false,
}: {
  value: string;
  setData: setVal;
  validationSchema?: ZodSchema;
  Icon?: () => ReactNode;
  label?: string;
  placeholder?: string;
  className?: string;
  alternateText?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
  autoFocus?: boolean;
}) => {
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
      autoFocus={autoFocus}
      startContent={<>{Icon && <Icon />}</>}
      value={value}
      isInvalid={config.invalid}
      color={config.invalid ? "danger" : "default"}
      errorMessage={`${config.errorMsg}`}
      isClearable={false}
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
