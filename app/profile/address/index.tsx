"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { MainMap } from "../../_custom-components";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import {
  getAddress,
  mainConfig as config,
  getInitialDrawerVals,
} from "./utils";
import MainCardComponent from "./components/main-card";
import * as _ from "lodash";
import AddressFooter from "./components/address-details";
import LocationMarker from "./components/location-marker";
import { useAppSelector } from "@/lib/main/hooks";

export default function UserAddress() {
  const user = useAppSelector((data) => data.user);
  const userLatitude = user?.address?.latitude;
  const userLongtitude = user?.address?.longtitude;
  const [config, setConfig] = useState<config>({
    location: [12.923946516889448, 77.5526110768168],
    flyToLocation: null,
    fly: false,
    address: "",
    isAddLoaded: false,
    addressDetails: getInitialDrawerVals(user?.address),
    latitude: 12.923946516889448,
    longtitude: 77.5526110768168,
  });

  const setMultipleData = setMultiplePaths(setConfig);
  const setData = setNestedPath(setConfig);

  const getLocationAddress = useCallback(
    _.debounce((lat: number, lng: number) => {
      getAddress({ lat, lng }, setMultipleData);
    }, 500),
    [],
  );

  useEffect(() => {
    let lat = userLatitude,
      lng = userLongtitude;
    if (lat === undefined) lat = 12.923946516889448;
    if (lng === undefined) lng = 77.5526110768168;
    (lat = Number(lat)), (lng = Number(lng));
    getLocationAddress(lat, lng);
    setMultipleData([
      ["location", [lat, lng]],
      ["latitude", lat],
      ["longtitude", lng],
    ]);
  }, [userLatitude, userLongtitude]);

  const displayMap = useMemo(
    () => (
      <MainMap
        className="h-[40vh] min-h-[250px]"
        center={config.location}
        zoom={16}
        scrollWheelZoom={true}
      >
        <LocationMarker
          getLocationAddress={getLocationAddress}
          flyToLocation={config.flyToLocation}
          fly={config.fly}
          setMultipleData={setMultipleData}
        />
      </MainMap>
    ),
    [config.location[0], config.location[1], config.fly],
  );

  return (
    <>
      <Card>
        <MainCardComponent setMultipleData={setMultipleData} config={config} />
        <CardBody>{displayMap}</CardBody>
        <AddressFooter config={config} setData={setData("addressDetails")} />
      </Card>
    </>
  );
}
