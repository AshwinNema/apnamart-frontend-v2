import { Chatbox, ChatIcon } from "@/app/_custom-components";
import { componentType, messageSenderType } from "@/app/_custom-components/chatbox/src/store/types";
import { setKeyVal } from "@/app/_utils";
import { Button, CardBody, CardHeader } from "@nextui-org/react";
import { MdOutlineSupportAgent } from "react-icons/md";
import {v4} from "uuid"
const PendingAdminReview = ({ setData }: { setData: setKeyVal }) => {
  return (
    <>
    <CardHeader >
      <div className="font-bold text-2xl flex justify-center w-full mb-11">
      Registration Status : Under admin review
      </div>
    </CardHeader>
      <CardBody>
        <div className="inline-block align-middle">
          Your profile is currently being reviewed by the admin. We will get
          back to you soon! ⏳ If you have any questions, feel free to reach out
          through chat support icon
          <span className="inline-block align-middle">
            <Button
              size="lg"
              className="p-2 scale-[0.7]"
              isIconOnly={true}
              radius="full"
              color="primary"
            >
              <ChatIcon />
            </Button>
          </span>
          below on bottom right
        </div>
        <div className="mt-5">
          <Button
            onPress={() => {
              setData("showReviewDetails")(false);
            }}
            variant="bordered"
            color="primary"
          >
            View Profile Details
          </Button>
          <Chatbox
            title={
              <div className="flex items-center gap-4 justify-center">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <MdOutlineSupportAgent />
                  </div>

                  <div>Technical Support</div>
                </div>
              </div>
            }
            subtitle=""
            resizable={true}
            initalMessages={[{
              componentType: componentType.textComponent,
  senderName: "Admin Bot",
  senderType: messageSenderType.response,
  timestamp: new Date(),
  status: "read",
  id: v4(),
 
  text: `
  👋 Hello! Welcome to [Your Company Name]! We're here to help you with anything you need. If you have questions about our platform, your profile status, or anything else, just ask! 😊

How can we assist you today?
  `
            }]}
          />
        </div>
      </CardBody>
    </>
  );
};

export default PendingAdminReview;
