"use client";
import { errorToast, toastErrorIcons } from "./_utils/toast";

export default function Home() {
  return (
    <div>
      <button
        onClick={() =>
          errorToast({
            msg: "Sample taos",
            iconType: toastErrorIcons.validation,
          })
        }
      >
        sdddddddd
      </button>
    </div>
  );
}
