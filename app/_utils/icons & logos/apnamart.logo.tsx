import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";

export const ApnamartLogo = () => {
  const { theme } = useTheme();
  const [logoClass, setLogoClass] = useState(styles.logo);

  useEffect(() => {
    if (theme === browserTheme.light) {
      setLogoClass(styles.logo);
      return;
    }

    setLogoClass(`${styles.logo} ${styles["dark-logo"]}`);
  }, [theme]);

  return (
    <>
      <svg
        width="36px"
        height="36px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs></defs>

        <g id="ic-ecommerce-house">
          <path
            className={logoClass}
            d="M1.1,10.71,4,3H19.86a.22.22,0,0,1,.19.13l2.85,7.6a.2.2,0,0,1-.19.27H18L15,9l-3,2L9,9,6,11H1.29A.2.2,0,0,1,1.1,10.71Z"
          />

          <line className={logoClass} x1="3.97" y1="10.98" x2="4" y2="21.02" />

          <line
            className={logoClass}
            x1="20"
            y1="10.98"
            x2="20.03"
            y2="20.98"
          />

          <line className={logoClass} x1="22" y1="20.98" x2="2" y2="21.02" />

          <path
            className={logoClass}
            d="M8,21v-6.8a.2.2,0,0,1,.2-.2h7.6a.2.2,0,0,1,.2.2V21"
          />

          <line className={logoClass} x1="12" y1="20.98" x2="12" y2="13.98" />
        </g>
      </svg>
      <p className="font-bold text-inherit">Apnamart</p>
    </>
  );
};
