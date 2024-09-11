import { getTabOptions, tabOption } from "./utils";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setTab, tabKeys } from "@/lib/profile/slices/component-state.slice";
import * as _ from "lodash";
import { setUserDetails } from "@/lib/profile/slices/main-user-details.slice";
import { setAddressDetails } from "@/lib/profile/slices/address-slice";

const useMainState = (): [tabOption[]] => {
  const user = useProfileSelector((state) => state.user);
  const dispatch = useProfileDispatch();
  const params = useSearchParams();
  const selectedTab = params.get("selectedTab");
  const tabOptions = useMemo(() => getTabOptions(user.role), [user.role]);

  useEffect(() => {
    const details = _.pick(user || {}, ["name", "email"]);
    dispatch(setUserDetails(details));
  }, [user, dispatch]);

  useEffect(() => {
    const details = _.pick(user?.address || {}, [
      "latitude",
      "longtitude",
      "addressLine1",
      "addressLine2",
      "addressType",
      "otherAddress",
    ]);
    dispatch(setAddressDetails(details));
  }, [user?.address]);

  useEffect(() => {
    selectedTab &&
      selectedTab in tabKeys &&
      selectedTab !== tabKeys.profile &&
      tabOptions.find((item) => item.key === selectedTab) &&
      dispatch(setTab(selectedTab));
  }, [selectedTab]);

  return [tabOptions];
};

export default useMainState;
