import { themes } from "@/app/_utils/enum";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../../_utils/icons & logos";
import { useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme !== themes.light);
  return (
    <Switch
      defaultValue={theme === themes.dark ? themes.light : themes.dark}
      size="sm"
      isSelected={isSelected}
      onValueChange={(value) => {
        setTheme(value ? themes.dark : themes.light);
        setIsSelected(value);
      }}
      color="warning"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
  );
}
