import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { categoryTableData, CategoryUploadDetails } from "../../helper";
import { setNestedPath } from "@/app/_utils";
import { MainModalBody } from "./modal-body";
import * as _ from "lodash";
import { Footer } from "./modal-components";

const CategoryModal = ({
  isOpen,
  onOpenChange,
  modalDetails,
  successCallback,
  uploadSuccessCallback,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen?: boolean) => void;
  modalDetails: categoryTableData | null;
  successCallback: () => void;
  uploadSuccessCallback: (photo: string) => void;
}) => {
  const getDefaultState = () => ({
    name: "",
    upload: null,
  });

  const [config, setConfig] =
    useState<CategoryUploadDetails>(getDefaultState());

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
                Create Category
              </ModalHeader>
              <MainModalBody
                modalDetails={modalDetails}
                setMainData={setData}
                mainConfig={config}
                successCallback={successCallback}
                uploadSuccessCallback={uploadSuccessCallback}
              />
              <Footer
                successCallback={successCallback}
                modalDetails={modalDetails}
                onClose={onClose}
                config={config}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryModal;
