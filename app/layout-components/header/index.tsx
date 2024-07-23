import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ThemeSwitch from "../theme-switch";
import { ApnamartLogo } from "@/app/_utils/icons & logos/apnamart.logo";
import LoginSignUpModal from "@/app/_modals/login-signup";
import { modalTypes } from "@/app/_modals/login-signup/constants";
import { setNestedPath } from "@/app/_utils";
import { useAppSelector } from "@/lib/hooks";

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector((state) => state.user);

  const [config, setConfig] = useState({
    modalType: null,
  });

  const setDataFunc = setNestedPath(setConfig);

  const openModal = (modalType: modalTypes) => () => {
    setDataFunc("modalType")(modalType);
    onOpen();
  };

  return (
    <>
      <Navbar
        isBordered
        classNames={{
          item: ["flex", "relative", "h-full", "items-center"],
          base: ["flex", "justify-between"],
          wrapper: ["max-w-full"],
        }}
      >
        <NavbarBrand>
          <ApnamartLogo />
        </NavbarBrand>

        {!user && (
          <NavbarContent justify="end">
            <NavbarItem>
              <ThemeSwitch />
            </NavbarItem>
            <NavbarItem>
              <Button
                onPress={openModal(modalTypes.login)}
                color="primary"
                variant="flat"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onPress={openModal(modalTypes.signUp)}
                color="primary"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
      <LoginSignUpModal
        modalType={config.modalType}
        setModalType={setDataFunc("modalType")}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
