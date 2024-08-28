import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getDeleteActionTexts } from "../../helper";
import { useProductSelector } from "@/lib/product/hooks";

export const TableActions = ({
  onClick,
  id,
  fetchData,
}: {
  onClick: () => void;
  id: number;
  fetchData: () => void;
}) => {
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { button } = getDeleteActionTexts(tab);
  const deleteData = (onClose: () => void) => {
    const { url, msg } = getDeleteActionTexts(tab, id);
    makeDataRequest(HTTP_METHODS.DELETE, url, undefined, undefined, {
      successMsg: msg,
    }).then((res) => {
      if (!res) return;
      onClose();
      fetchData();
    });
  };
  return (
    <>
      <div className="flex justify-end items-center gap-4">
        <Tooltip color="primary" content="Edit category">
          <span className="cursor-pointer">
            <FaRegEdit onClick={onClick} />
          </span>
        </Tooltip>
        <Tooltip color="danger" content="Delete category">
          <span className="cursor-pointer">
            <RiDeleteBin6Line onClick={onOpen} className="fill-[red]" />
          </span>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center font-weight text-4xl">
                {button}
              </ModalHeader>

              <ModalBody>Are you sure you want to delete?</ModalBody>

              <ModalFooter>
                <Button
                  fullWidth
                  color="danger"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => deleteData(onClose)}
                  color="danger"
                  fullWidth
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
