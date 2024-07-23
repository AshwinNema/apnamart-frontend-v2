import { loginConfig, modalTypes } from "./constants";
import { PasswordInput, TextInput } from "@/app/_custom-components/inputs";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { MailIcon } from "@/app/_utils/icons & logos";
import { z } from "zod";
export default function Form({
  formData,
  setData,
  modalType,
}: {
  formData: loginConfig["formData"];
  setData: (value: string) => (value: string) => void;
  modalType: modalTypes | null;
}) {
  return (
    <>
      {modalType === modalTypes.signUp && (
        <>
          <TextInput
            value={formData.name}
            setData={setData("name")}
            Icon={() => (
              <Avatar
                className="scale-75 relative top-2 right-0.5"
                size="sm"
                icon={<AvatarIcon />}
              />
            )}
            label="Name"
            placeholder="Please enter your name"
          />
        </>
      )}
      <TextInput
        value={formData.email}
        setData={setData("email")}
        validationSchema={z.string().email()}
        Icon={() => (
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        )}
        label="Email"
        placeholder="Please enter your email"
      />

      <PasswordInput
        password={formData.password}
        setData={setData("password")}
        placeholder="Please enter your password"
      />
    </>
  );
}
