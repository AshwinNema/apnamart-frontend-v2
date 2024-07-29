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
import LoginSignUpModal from "@/app/_modals/login-signup";
import { modalTypes } from "@/app/_modals/login-signup/constants";
import { setNestedPath } from "@/app/_utils";
import { useAppSelector } from "@/lib/hooks";
import { GiShop } from "react-icons/gi";
import UserProfile from "../user-profile";
import Link from "next/link";

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
          <Link href="/">
            <div className="flex gap-3">
              <GiShop className="scale-[2]" />
              <div className="font-bold font-serif">Apnamart</div>
            </div>
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          {!user && (
            <>
              <NavbarItem>
                <Button
                  onPress={openModal(modalTypes.login)}
                  color="primary"
                  variant="faded"
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button onPress={openModal(modalTypes.signUp)} color="primary">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}

          {!!user && (
            <NavbarItem>
              <UserProfile />
            </NavbarItem>
          )}
        </NavbarContent>
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
