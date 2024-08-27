import { FileUploadWithPreview, Options } from "file-upload-with-preview";
import "file-upload-with-preview/dist/style.css";
import { useEffect, useRef } from "react";

export const ImgPreviewInput = ({
  setUpload,
  dataUploadId,
  options,
  imgChangeCallback,
  clearCallback,
}: {
  setUpload: (upload: FileUploadWithPreview) => void;
  dataUploadId: string;
  options?: Options;
  imgChangeCallback?: (...args: any[]) => void;
  clearCallback?: (...args: any[]) => void;
}) => {
  const imgPreviewRef = useRef<FileUploadWithPreview | null>(null);
  const changeListener = () => {
    if (!imgChangeCallback) return;
    imgPreviewRef.current!.inputHidden.addEventListener(
      "change",
      imgChangeCallback,
    );
  };

  const listenerCleanUp = () => {
    if (!imgChangeCallback || !imgPreviewRef.current) return;
    imgPreviewRef.current.inputHidden.removeEventListener(
      "fileUploadWithPreview:imagesAdded",
      imgChangeCallback,
    );
  };

  const clearListener = () => {
    if (!clearCallback) return;
    imgPreviewRef.current!.clearButton.addEventListener("click", clearCallback);
  };

  const clearListenerCleanUp = () => {
    if (!clearCallback) return;
    imgPreviewRef.current!.clearButton.removeEventListener(
      "click",
      clearCallback,
    );
  };

  useEffect(() => {
    if (!imgPreviewRef.current) {
      const upload = new FileUploadWithPreview(dataUploadId, options);

      setUpload(upload);
      imgPreviewRef.current = upload;
      changeListener();
      clearListener();
      return () => {
        clearListenerCleanUp();
        listenerCleanUp();
      };
    }

    imgChangeCallback && changeListener();
    clearCallback && clearListener();
    return () => {
      clearListenerCleanUp();
      listenerCleanUp();
    };
  }, []);

  return (
    <div className="custom-file-container" data-upload-id={dataUploadId}>
      {" "}
    </div>
  );
};
