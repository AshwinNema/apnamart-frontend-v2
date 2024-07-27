import { Input } from "@nextui-org/react";
import { ReactNode, useState } from "react";
import { ZodSchema } from "zod";
import { getZodErrMsg, setNestedPath, setVal } from "@/app/_utils";
import { ClearIcon } from "@/app/_utils/icons & logos";

export const TextInput = ({
  value,
  setData,
  validationSchema,
  Icon,
  label,
  placeholder,
}: {
  value: string;
  setData: setVal;
  validationSchema?: ZodSchema;
  Icon?: () => ReactNode;
  label?: string;
  placeholder?: string;
}) => {
  const [config, setConfig] = useState({ invalid: false, errorMsg: "" });
  const setDataFunc = setNestedPath(setConfig);

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
      autoFocus
      startContent={<>{Icon && <Icon />}</>}
      value={value}
      isInvalid={config.invalid}
      color={config.invalid ? "danger" : "default"}
      errorMessage={`${config.errorMsg}`}
      isClearable={false}
      endContent={<EndContent />}
      onValueChange={setData}
      label={`${label || ""}`}
      placeholder={`${placeholder ? placeholder : `Please enter ${label}`}`}
      variant="bordered"
      onBlur={() => {
        setDataFunc("invalid")(isInvalid());
      }}
    />
  );
};
