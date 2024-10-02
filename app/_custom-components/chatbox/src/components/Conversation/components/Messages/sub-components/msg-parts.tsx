import { browserTheme } from "@/app/layout-components/theme-switch";
import { useTheme } from "next-themes";
import { Fragment } from "react";
import React from "react";
import { MdAccessTime, MdCheck, MdDoneAll } from "react-icons/md";
import { format } from "date-fns";
import {
  messageBoxStatusTypes,
  MessageBoxType,
} from "../../../../../utils/interfaces & types & constants";

export const SystemComponent = ({ text }: { text: string }) => {
    const { theme } = useTheme();
    return (
      <Fragment>
        <div className="flex items-center justify-center">
          <div
            className={`relative rounded-[10px] shadow-systemComponentShadow flex flex-col my-1.5 pt-1.5 pr-2.5 pb-2 pl-2.5 float-left max-w-[70%] items-center justify-center ${
              theme === browserTheme.dark && "bg-darkContainerTheme"
            }`}
          >
            <div className="text-center text-[15px] inline-block opacity-50 text-supSmall">
              {text}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  
  export const MessageBox: React.FC<MessageBoxType> = (props) => {
    const isRightAligned = props.position === "right";
    return (
      <div>
        <div
          className={`rounded-lg relative  mx-5 px-3 py-1 ${
            isRightAligned ? "float-right" : "float-left"
          } ${props.msgBoxClass}`}
        >
          <div>
            <div className="break-all">{props.text}</div>
            {props.hideSeenAndStatus ? null : (
              <div
                className={
                  "flex items-center justify-end text-right opacity-50 text-[8px] right-[-4px] bottom-[-5px] gap-1 mt-2"
                }
              >
                {format(props.date, "hh:mm")}
  
                <span className="scale-[1.3]">
                  {props.status === messageBoxStatusTypes.notReceived && (
                    <MdAccessTime />
                  )}
  
                  {props.status === messageBoxStatusTypes.sent && <MdCheck />}
  
                  {props.status === messageBoxStatusTypes.delivered && (
                    <MdDoneAll />
                  )}
  
                  {props.status === messageBoxStatusTypes.read && (
                    <MdDoneAll color="#4FC3F7" />
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };