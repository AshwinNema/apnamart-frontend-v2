import { passwordErrMsg, passwordRegex } from "@/app/_utils";
import { z } from "zod";

export interface roleDetailsInterface {
  src: string;
  role: string;
  roleHeader: string;
  loginIntro: string;
}

export interface roleCard extends roleDetailsInterface {
  selectedRole: string;
  setRole: (arg: string) => void;
}

export type userRoleKeys = "customer" | "merchant" | "admin";

interface userRoleDetails {
  src: string;
  role: userRoleKeys;
  roleHeader: string;
  loginIntro: string;
  signUpIntro?: string;
}

interface userRoles {
  [key: string]: userRoleDetails;
}

export const userRoles: userRoles = {
  customer: {
    src: "https://res.cloudinary.com/ash006/image/upload/v1720580195/OIG4.CKabxgFy8P5r_d40dh9.jpg",
    role: "customer",
    roleHeader: "Customer",
    loginIntro:
      "Please enter your login details below to access your account. If you are a new customer, you can create an account by clicking on the 'Sign Up' link. Thank you for choosing our services.",
    signUpIntro:
      "Thank you for choosing to join us! Your journey with Apnamart starts here. Fill out the form below to unlock a world of shopping convenience and exclusive offers. We can't wait to have you on board!",
  },
  merchant: {
    src: "https://res.cloudinary.com/ash006/image/upload/v1720104362/qwnep4boe9onjk6rn21s.webp",
    role: "merchant",
    roleHeader: "Merchant",
    loginIntro:
      "Please enter your credentials below to access your account. If you are a new merchant and would like to sign up, please register. Our admins will be verifying and approving your account on the portal. Thank you for choosing to partner with us.",
    signUpIntro:
      "Welcome, esteemed merchant! We're delighted to have you on board. Your products and services are a valuable addition to our marketplace. Please complete the form below to start showcasing your offerings to our discerning customers. Let's create a successful partnership together!",
  },
  admin: {
    src: "https://res.cloudinary.com/ash006/image/upload/v1720580605/admin-81118788_ybjdf7.png",
    role: "admin",
    roleHeader: "Admin",
    loginIntro:
      "Please enter your login details below to access your account.As an admin, you play a crucial role in managing our online store. Thank you for your dedication to enhancing our ecommerce platform.",
  },
};

export type loginConfig = {
  formData: {
    role: userRoleKeys;
    email: string;
    password: string;
    name: string;
  };
  currentStep: number;
};

export const defaultConfig = {
  formData: {
    role: userRoles.customer.role,
    email: "",
    password: "",
    name: "",
  },
  currentStep: 0,
};

export enum modalTypes {
  login = "login",
  signUp = "signUp",
}
const roleEnum = z.enum(["customer", "merchant", "admin"]);

export const loginValidationSchema = z.object({
  role: roleEnum,
  email: z.string().email(),
  password: z.string().regex(passwordRegex, {
    message: passwordErrMsg,
  }),
});

export const signUpValidationSchema = loginValidationSchema.merge(
  z.object({
    name: z.string(),
  }),
);
