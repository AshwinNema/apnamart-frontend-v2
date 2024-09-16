import { TextInput } from "@/app/_custom-components";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import MerchantLogo from "./merchant-logo";
import { SiNamesilo } from "react-icons/si";
import { textInputProps } from "../utils";
import { Textarea } from "@nextui-org/react";

const BusinessOverview = () => {
  const dispatch = useProfileDispatch();
  const name = useProfileSelector((state) => state.merchantDetails.name);
  const description = useProfileSelector(
    (state) => state.merchantDetails.description,
  );

  const setData = (key: string) => (value: any) => {
    dispatch(
      setMerchantDetails({
        [key]: value,
      }),
    );
  };
  return (
    <>
      <MerchantLogo />

      <TextInput
        value={name}
        setData={setData("name")}
        Icon={() => <SiNamesilo />}
        label="Business Name"
        {...{
          ...textInputProps,
          classNames: {
            ...textInputProps.classNames,
            base: [textInputProps.classNames?.base, "mt-5"],
          },
        }}
      />

      <Textarea
        label="Business Description"
        value={description}
        onValueChange={setData("description")}
        {...textInputProps}
      />
    </>
  );
};

export default BusinessOverview;
