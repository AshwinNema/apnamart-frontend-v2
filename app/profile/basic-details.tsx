import { Card, CardBody } from "@nextui-org/react";
import { TextInput } from "@/app/_custom-components/inputs";
import { UserInterface } from "@/lib/slices/user/user.slice";
import { setKeyVal } from "../_utils";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { IoIosMail } from "react-icons/io";
import { z } from "zod";
export default function BasicDetails({
  details,
  setDetails,
}: {
  details: UserInterface;
  setDetails: setKeyVal;
}) {
  return (
    <Card>
      <CardBody>
        <TextInput
          value={details.name}
          setData={setDetails("name")}
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

        <TextInput
          value={details.email}
          setData={setDetails("email")}
          validationSchema={z.string().email()}
          Icon={() => <IoIosMail className="scale-150 mt-5" />}
          className="mt-5"
          label="Email"
          placeholder="Please enter your email"
        />
      </CardBody>
    </Card>
  );
}
