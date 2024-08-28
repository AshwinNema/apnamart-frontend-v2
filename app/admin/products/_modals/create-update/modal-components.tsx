import { Button, ModalFooter } from "@nextui-org/react";
import {
  UploadDetails,
  createUpdateData,
  tableDataDataElement,
} from "../../helper";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import { setDetails } from "@/lib/product/slices/component-details.slice";

export const Footer = ({
  onClose,
  config,
}: {
  onClose: () => void;
  config: UploadDetails;
}) => {
  const dispatch = useProductDispatch();
  const {
    componentDetails: { refreshData },
  } = useProductSelector((state) => state);
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;
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
              dispatch(
                setDetails({
                  refreshData: !refreshData,
                  closeModal: true,
                }),
              );
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
