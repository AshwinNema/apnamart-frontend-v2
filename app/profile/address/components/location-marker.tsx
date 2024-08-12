import { Marker, useMapEvents } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { mainConfig } from "../utils";
import { multiplePathSetter } from "@/app/_utils";
import { renderToString } from "react-dom/server";
import { GlowingMarker } from "@/app/_custom-components";

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
  const icon = useMemo(
    () =>
      new DivIcon({
        html: renderToString(<GlowingMarker />),
      }),
    [],
  );
  const map = useMapEvents({
    drag() {
      const newLatLng = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
      setPosition(newLatLng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng);
      const { lat, lng } = e.latlng;
      getLocationAddress(lat, lng);
      setMultipleData([
        ["latitude", lat],
        ["longtitude", lng],
      ]);
    },
    dragend(event) {
      const { lat, lng } = event.target.getCenter();
      getLocationAddress(lat, lng);
      setMultipleData([
        ["latitude", lat],
        ["longtitude", lng],
      ]);
    },
    moveend(event) {
      const { lat, lng } = event.target.getCenter();
      const newLatLng = new L.LatLng(lat, lng);
      setPosition(newLatLng);
      getLocationAddress(lat, lng);
      setMultipleData([
        ["latitude", lat],
        ["longtitude", lng],
      ]);
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
    setMultipleData([
      ["fly", false],
      ["latitude", lat],
      ["longtitude", lng],
    ]);
    setPosition(latLng);
  }, [flyToLocation, map, fly]);

  return <Marker position={position} icon={icon} />;
}
