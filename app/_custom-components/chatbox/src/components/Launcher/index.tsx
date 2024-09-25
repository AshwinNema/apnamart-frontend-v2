import { Button } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { useChatboxStore } from "../../store";
import { ChatIcon } from "../../assets";

type Props = {
  toggle: () => void;
};

function Launcher({ toggle }: Props) {
  const showChat = useChatboxStore((state) => state.showChat);

  return (
    <div className="absolute right-0 bottom-0">
      <Button
        size="lg"
        className="p-2"
        isIconOnly={true}
        radius="full"
        color="primary"
        onPress={toggle}
      >
        {showChat && <IoClose className="scale-[2]" />}
        {!showChat && <ChatIcon />}
      </Button>
    </div>
  );
}

export default Launcher;
