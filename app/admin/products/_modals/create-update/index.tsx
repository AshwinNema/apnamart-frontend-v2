import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { tabKeys, UploadDetails } from "../../helper";
import { setNestedPath } from "@/app/_utils";
import { MainModalBody } from "./modal-body";
import * as _ from "lodash";
import { Footer } from "./modal-components";
import {
  categoryTableDataElement,
  subCatTableDataElement,
  tabComponentState,
} from "../../helper";

const CreateUpdateModal = ({
  isOpen,
  onOpenChange,
  modalDetails,
  successCallback,
  uploadSuccessCallback,
  tabType
}: {
  isOpen: boolean;
  onOpenChange: (isOpen?: boolean) => void;
  modalDetails: tabComponentState<
    categoryTableDataElement | subCatTableDataElement
  >["modalDetails"];
  successCallback: () => void;
  uploadSuccessCallback: (photo: string) => void;
  tabType: tabKeys
}) => {
  const getDefaultState = () => ({
    name: "",
    upload: null,
  });

  const [config, setConfig] =
    useState<UploadDetails>(getDefaultState());

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
                Create {
                  tabType === tabKeys.category ? "Category" :
                  tabType === tabKeys.subCategory ? "Sub Category": "Item"
                }
              </ModalHeader>
              <MainModalBody
                tabType={tabType}
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

export default CreateUpdateModal;
