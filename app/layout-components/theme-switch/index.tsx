import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../../_utils/icons & logos";
import { useState } from "react";

export enum browserTheme {
  light = "light",
  dark = "dark",
}

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme !== browserTheme.light);
  return (
    <Switch
      defaultValue={
        theme === browserTheme.dark ? browserTheme.light : browserTheme.dark
      }
      size="sm"
      isSelected={isSelected}
      onValueChange={(value) => {
        setTheme(value ? browserTheme.dark : browserTheme.light);
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
