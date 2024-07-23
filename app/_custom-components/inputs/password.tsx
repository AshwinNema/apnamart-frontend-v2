import { Input } from "@nextui-org/react";
import {
  ClearIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LockIcon,
} from "@/app/_utils/icons & logos";
import { useState } from "react";
import { passwordErrMsg } from "../../_utils";
import { loginValidationSchema } from "@/app/_modals/login-signup/constants";

export const PasswordInput = ({
  password,
  setData,
  placeholder,
  label,
}: {
  password: string;
  setData: (value: string) => void;
  placeholder?: string;
  label?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const toggleVisibility = () =>
    setIsVisible((prevVisibilty) => !prevVisibilty);

  const isInvalid = () => {
    if (!password) {
      return false;
    }
    const validationSchema = loginValidationSchema.shape.password;
    const validated = validationSchema.safeParse(password);
    return !validated.success;
  };

  return (
    <Input
      startContent={
        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      value={password}
      isInvalid={invalid}
      color={invalid ? "danger" : "default"}
      errorMessage={passwordErrMsg}
      onBlur={() => {
        setInvalid(isInvalid());
      }}
      endContent={
        <>
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-200 pointer-events-none" />
            )}
          </button>

          {!!password && <ClearIcon onClick={() => setData("")} />}
        </>
      }
      onValueChange={setData}
      label={`${label || "Password"}`}
      placeholder={`${placeholder || "Enter your password"}`}
      type={isVisible ? "text" : "password"}
      variant="bordered"
    />
  );
};
