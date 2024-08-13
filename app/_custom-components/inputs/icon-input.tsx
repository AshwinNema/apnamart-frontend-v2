import { ChangeEvent, useRef } from "react";
import { IconType, IconBaseProps } from "react-icons";

export const IconInput = ({
  Icon,
  accept,
  props,
  callback,
}: {
  Icon: IconType;
  props?: IconBaseProps;
  accept: string;
  callback?: (file: File) => any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Icon
        {...props}
        onClick={() => {
          inputRef.current?.click();
        }}
      />
      <input
        type="file"
        className="hidden"
        name="avatar"
        accept={accept}
        ref={inputRef}
        onChange={(file: ChangeEvent<HTMLInputElement>) => {
          if (
            inputRef.current == null ||
            inputRef.current.files === null ||
            inputRef.current.files[0] === null
          )
            return;
          callback && callback(inputRef.current.files[0]);
          inputRef.current.value = "";
        }}
      ></input>
    </div>
  );
};
