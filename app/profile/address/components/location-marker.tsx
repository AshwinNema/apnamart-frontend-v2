import { Marker, useMapEvents } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { mainConfig } from "../utils";
import { multiplePathSetter } from "@/app/_utils";
import { renderToString } from "react-dom/server";
import { GlowingMarker } from "@/app/_custom-components";
import { useProfileDispatch } from "@/lib/profile/hooks";
import { setAddressDetails } from "@/lib/profile/slices/address-slice";

export default function LocationMarker({
  getLocationAddress,
  flyToLocation,
  fly,
  setMultipleData,
}: {
  getLocationAddress: (lat: number, lng: number) => void;
  flyToLocation: mainConfig["flyToLocation"];
  fly: mainConfig["fly"];
  setMultipleData: multiplePathSetter;
}) {
  const dispatch = useProfileDispatch();
  const icon = useMemo(
    () =>
      new DivIcon({
        html: renderToString(<GlowingMarker />),
      }),
    [],
  );

  const setLatLng = (lat: string | number, lng: string | number, otherDetails?: object) => {
    dispatch(
      setAddressDetails({
        latitude: Number(lat),
        longtitude: Number(lng),
        ...otherDetails
      }),
    );
  }

  const map = useMapEvents({
    drag() {
      const newLatLng = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
      setPosition(newLatLng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng);
      const { lat, lng } = e.latlng;
      setLatLng(lat, lng)
      getLocationAddress(lat, lng);
    },
    dragend(event) {
      const { lat, lng } = event.target.getCenter();
      getLocationAddress(lat, lng);
      setLatLng(lat, lng)
    },
    moveend(event) {
      const { lat, lng } = event.target.getCenter();
      const newLatLng = new L.LatLng(lat, lng);
      setPosition(newLatLng);
      getLocationAddress(lat, lng);
      setLatLng(lat, lng)
    },
    zoom(event) {
      dispatch(
        setAddressDetails({
          zoom: event.target._zoom,
        }),
      );
    },
  });

  const [position, setPosition] = useState(
    new L.LatLng(map.getCenter().lat, map.getCenter().lng),
  );

  useEffect(() => {
    if (!flyToLocation || !fly) return;
    const [lat, lng] = flyToLocation;
    const latLng = new L.LatLng(lat, lng);
    getLocationAddress(lat, lng);
    map.flyTo(latLng);
    map.setView(latLng);
    setMultipleData([["fly", false]]);
    dispatch(
      setAddressDetails({
        latitude: lat,
        longtitude: lng,
      }),
    );
    setPosition(latLng);
  }, [flyToLocation, map, fly]);

  return <Marker position={position} icon={icon} />;
}
