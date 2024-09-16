import { Button, useDisclosure } from "@nextui-org/react";
import { BiSolidEditLocation } from "react-icons/bi";
import AddressDrawer from "./drawer";
export default function Step2Details() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div>
        <Button
          variant="bordered"
          onClick={onOpen}
          endContent={<BiSolidEditLocation />}
          className="cursor-pointer p-3"
          color="primary"
          size="sm"
        >
          Enter complete pick up address details
        </Button>
      </div>
      <AddressDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
