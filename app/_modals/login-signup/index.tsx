import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Roles from "./roles";
import { setNestedPath } from "@/app/_utils";
import { defaultConfig, modalTypes, userRoles } from "./constants";
import Form from "./form";
import { loginSignUp } from "./api";
import { useAppDispatch } from "@/lib/hooks";

export default function LoginSignUpModal({
  isOpen,
  onOpenChange,
  modalType,
  setModalType,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  modalType: modalTypes | null;
  setModalType: (value: modalTypes) => void;
}) {
  const [config, setConfig] = useState(structuredClone(defaultConfig));
  const { formData } = config;
  const setData = setNestedPath(setConfig);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isOpen) {
      setConfig(structuredClone(defaultConfig));
    }
  }, [isOpen]);

  // In case login user wants to sign up and the current role selected is admin, then we change the role to customer because user sign up of admin is not allowed from front end
  // We also remove the name in case we travel from signup to login

  const changeModalType = () => {
    modalType === modalTypes.login &&
      formData.role === userRoles.admin.role &&
      setData("formData.role")(userRoles.customer.role);

    modalType === modalTypes.signUp && setData("formData.name")("");

    modalType === modalTypes.login
      ? setModalType(modalTypes.signUp)
      : setModalType(modalTypes.login);
  };

  return (
    <>
      <Modal
        className="max-h-[90vh] max-w-[40vw]"
        backdrop="blur"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="flex justify-center text-4xl">
                  {modalType === modalTypes.signUp
                    ? "Create an Account"
                    : "Welcome Back"}
                </p>
              </ModalHeader>
              <ModalBody>
                <Roles
                  selectedRole={config.formData.role}
                  setRole={setData("formData.role")}
                  modalType={modalType}
                />
                <Form
                  modalType={modalType}
                  formData={formData}
                  setData={(key) => setData(`formData.${key}`)}
                />
              </ModalBody>
              <ModalFooter className="flex flex-col	">
                <p
                  className="text-primary flex justify-end hover:cursor-pointer"
                  onClick={changeModalType}
                >
                  {modalType === modalTypes.signUp
                    ? "Already a user click here to login"
                    : "Click here to sign up"}{" "}
                </p>
                <Button
                  onClick={() =>
                    loginSignUp(formData, onClose, modalType, dispatch)
                  }
                  color="primary"
                >
                  {modalType === modalTypes.signUp ? "Sign Up" : "Sign in"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
