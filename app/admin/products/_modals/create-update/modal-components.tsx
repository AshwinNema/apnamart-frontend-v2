import { Button, ModalFooter } from "@nextui-org/react";
import {
  categoryTableDataElement,
  subCatTableDataElement,
  UploadDetails,
  createUpdateData,
} from "../../helper";

export const Footer = ({
  onClose,
  config,
  modalDetails,
  successCallback,
}: {
  onClose: () => void;
  config: UploadDetails;
  modalDetails: categoryTableDataElement | subCatTableDataElement | null;
  successCallback: () => void;
}) => {
  return (
    <ModalFooter>
      <Button fullWidth color="danger" variant="flat" onPress={onClose}>
        Cancel
      </Button>
      <Button
        onPress={() =>
          createUpdateData({
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
