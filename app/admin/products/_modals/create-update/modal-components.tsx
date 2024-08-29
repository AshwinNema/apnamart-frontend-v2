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
  const refreshData = useProductSelector(
    (state) => state.componentDetails.refreshData,
  );
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;
  const tab = useProductSelector((state) => state.componentDetails.tab);
  return (
    <ModalFooter>
      <Button fullWidth color="danger" variant="flat" onPress={onClose}>
        Cancel
      </Button>
      <Button
        onPress={() =>
          createUpdateData({
            payloadData: {
              id: modalDetails?.id,
              name: config.name,
              files: config.upload,
              categoryId: config.categoryId,
            },
            tab,
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
