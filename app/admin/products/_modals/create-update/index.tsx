import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { UploadDetails } from "../../helper";
import { setKeyVal, setNestedPath } from "@/app/_utils";
import { MainModalBody } from "./modal-body";
import * as _ from "lodash";
import { Footer } from "./modal-components";
import { useProductSelector } from "@/lib/product/hooks";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { tableDataDataElement } from "../../helper/interfaces & enums";

export const MainCreateUpdateContext = createContext<null | {
  config: UploadDetails;
  setMainData: setKeyVal;
}>(null);

const CreateUpdateModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}) => {
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;
  const getDefaultState = (): UploadDetails => ({
    name: "",
    upload: null,
    categoryId: null,
  });

  const [config, setConfig] = useState<UploadDetails>(getDefaultState());

  const setData = setNestedPath(setConfig);

  useEffect(() => {
    !isOpen && setConfig(getDefaultState());
  }, [isOpen]);

  useEffect(() => {
    if (!modalDetails) return;
    const details = _.pick(modalDetails, ["name", "id"]);
    setConfig((prevConfig) => {
      Object.assign(prevConfig, details);
      return { ...prevConfig };
    });
  }, [modalDetails]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        className=""
        onOpenChange={() => {
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                {modalDetails?.id ? "Update" : "Create"}{" "}
                {tab === tabKeys.category
                  ? "Category"
                  : tab === tabKeys.subCategory
                    ? "Sub Category"
                    : "Item"}
              </ModalHeader>
              <MainCreateUpdateContext.Provider
                value={{
                  config,
                  setMainData: setData,
                }}
              >
                <MainModalBody />
              </MainCreateUpdateContext.Provider>
              <Footer onClose={onClose} config={config} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUpdateModal;
