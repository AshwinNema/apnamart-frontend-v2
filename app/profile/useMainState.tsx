import { tabKeys } from "./utils";
import { useCallback, useEffect, useState } from "react";
import { setKeyVal, setNestedPath } from "../_utils";
import { getUserProfile } from "./api";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { useSearchParams } from "next/navigation";
import { UserInterface } from "@/lib/main/slices/user/user.slice";

export interface stateConfig {
  selectedTab: tabKeys;
  user: UserInterface;
}

const useMainState = (): [stateConfig, setKeyVal] => {
  const user = useAppSelector((state) => state.user);
  const [config, setConfig] = useState<stateConfig>({
    selectedTab: tabKeys.basicDetails,
    user: { ...user } || {},
  });
  const setProperty = useCallback(setNestedPath(setConfig), [setConfig]);
  const params = useSearchParams();
  const selectedTab = params.get("selectedTab");
  useEffect(() => {
    if (!selectedTab) return;
    if (selectedTab in tabKeys && selectedTab !== tabKeys.profile) {
      setProperty("selectedTab")(selectedTab);
    }
  }, [selectedTab, setProperty]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserProfile(dispatch);
  }, [dispatch]);

  return [config, setProperty];
};

export default useMainState;
