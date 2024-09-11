import { Button, Card, CardBody } from "@nextui-org/react";
import { PasswordInput, TextInput } from "@/app/_custom-components/inputs";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { setKeyVal } from "../_utils";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { IoIosMail } from "react-icons/io";
import { z } from "zod";
import { tabKeys, userInputPage } from "./utils";
import { IoSaveSharp } from "react-icons/io5";
import * as _ from "lodash";
import { useAppDispatch } from "@/lib/main/hooks";
import { updateUserDetails } from "./api";

export default function BasicDetails({
  details,
  setDetails,
  userInputPage,
}: {
  details: UserInterface;
  setDetails: setKeyVal;
  userInputPage: userInputPage;
}) {
  const dispatch = useAppDispatch();
  return (
    <Card>
      <CardBody>
        {userInputPage === tabKeys.basicDetails ? (
          <>
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
              className="mt-5 mb-3"
              label="Email"
              placeholder="Please enter your email"
            />
          </>
        ) : null}

        {userInputPage === tabKeys.settings ? (
          <>
            <PasswordInput
              password={details.password}
              setData={setDetails("password")}
              placeholder="Enter your new password"
              label="Password"
            />
          </>
        ) : null}

        <div className="flex justify-end">
          <Button
            className="cursor-pointer p-3"
            color="primary"
            size="sm"
            variant="shadow"
            onPress={() => {
              const data = _.pick(
                details,
                userInputPage === tabKeys.settings
                  ? ["password"]
                  : ["name", "email"],
              );
              updateUserDetails(data, userInputPage, dispatch);
            }}
            endContent={<IoSaveSharp />}
          >
            Save{" "}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
