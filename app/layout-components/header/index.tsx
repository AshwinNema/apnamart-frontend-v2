import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import ThemeSwitch from "../theme-switch";
import Logo from "@/app/_utils/images/website-logo";

export default function Header() {
  return (
    <Navbar
      isBordered
      classNames={{
        item: ["flex", "relative", "h-full", "items-center"],
        base: ["flex", "justify-between"],
        wrapper: ["max-w-full"],
      }}
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
