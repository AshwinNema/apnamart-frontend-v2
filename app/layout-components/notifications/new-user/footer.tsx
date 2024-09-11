import { useAppSelector } from "@/lib/main/hooks";
import { Link, ModalFooter } from "@nextui-org/react";
import { details } from ".";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { ReactNode, useEffect, useState } from "react";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";

enum footerWrapperType {
  container = "container",
  element = "element",
}

const Footer = ({ onClose }: { onClose: () => void }) => {
  const notificationDetails = useAppSelector(
    (state) => state.notifications.details,
  ) as details;

  const [count, setCount] = useState(0);

  useEffect(() => {
    let curCount = 0;
    if (notificationDetails?.noInitialPassword) curCount += 1;
    if (notificationDetails?.role === UserRole.merchant) curCount += 1;
    setCount(curCount);
  }, [notificationDetails?.noInitialPassword, notificationDetails?.role]);

  const FooterElementWrapper = ({
    type,
    children,
  }: {
    type: footerWrapperType;
    children: ReactNode;
  }) => {
    if (!count) return children;
    switch (type) {
      case footerWrapperType.container:
        return (
          <div>
            <ul className="list-disc">{children}</ul>
          </div>
        );

      case footerWrapperType.element:
        return <li>{children}</li>;
      default:
        return null;
    }
  };

  const closeLink = () => {
    count <= 1 && onClose();
  };

  return (
    <>
      {count > 0 ? (
        <ModalFooter>
          <p className="italic">
            <span className="font-bold">Please note :</span>
            <FooterElementWrapper type={footerWrapperType.container}>
              {notificationDetails?.role === UserRole.merchant ? (
                <FooterElementWrapper type={footerWrapperType.element}>
                  To complete your registration, please{" "}
                  <Link
                    isExternal={count > 1}
                    onClick={closeLink}
                    href={`/profile`}
                  >
                    click here
                  </Link>
                </FooterElementWrapper>
              ) : (
                <></>
              )}

              {notificationDetails?.noInitialPassword ? (
                <FooterElementWrapper type={footerWrapperType.element}>
                  Your inital password is not set, hence you will not be able to
                  sign in using password. You can set it by{" "}
                  <Link
                    isExternal={count > 1}
                    onClick={closeLink}
                    href={`/profile?selectedTab=${tabKeys.settings}`}
                  >
                    clicking here
                  </Link>
                </FooterElementWrapper>
              ) : (
                <></>
              )}
            </FooterElementWrapper>
          </p>
        </ModalFooter>
      ) : null}
    </>
  );
};

export default Footer;
