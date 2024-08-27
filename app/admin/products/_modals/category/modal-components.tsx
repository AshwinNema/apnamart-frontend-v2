import { Button, ModalFooter } from "@nextui-org/react";
import {
  categoryTableData,
  CategoryUploadDetails,
  createUpdateCategory,
} from "../../helper";

export const Footer = ({
  onClose,
  config,
  modalDetails,
  successCallback,
}: {
  onClose: () => void;
  config: CategoryUploadDetails;
  modalDetails: categoryTableData | null;
  successCallback: () => void;
}) => {
  return (
    <ModalFooter>
      <Button fullWidth color="danger" variant="flat" onPress={onClose}>
        Cancel
      </Button>
      <Button
        onPress={() =>
          createUpdateCategory({
            id: modalDetails?.id,
            name: config.name,
            files: config.upload,
            successCallback: () => {
              onClose();
              successCallback();
            },
          })
        }
        fullWidth
        color="success"
      >
        {modalDetails?.id ? "Update" : "Create"}
      </Button>
    </ModalFooter>
  );
};
