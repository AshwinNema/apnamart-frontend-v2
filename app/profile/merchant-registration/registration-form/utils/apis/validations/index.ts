import {
  errorToast,
  infoToast,
  toastErrorIcons,
  validateZodSchema,
} from "@/app/_utils";
import {
  createUpdateRegistrationDetails,
  finalDetailsValidation,
} from "../../interfaces & validations";
import { MerchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

export const createUpdateRegistrationValidation = (
  allDetails: createUpdateRegistrationDetails,
  file?: File,
) => {
  const underAdminReview =
    allDetails.registrationStatus === MerchantRegistrationStatus.adminReview;
  if (underAdminReview) {
    infoToast({
      msg: "Your profile is under review by admin. After review is completed you will be allowed to update your profile details",
    });
    return;
  }
  const { data, error } = validateZodSchema(
    allDetails,
    finalDetailsValidation,
    true,
    toastErrorIcons.validation,
  );

  if (error) return;
  const { id } = allDetails;
  if (!id && !file) {
    errorToast({ msg: "Business Logo is mandatory" });
    return;
  }

  return data;
};
