import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";

export interface mapProps {
  center: [number, number];
  children?: React.ReactNode;
  className?: string;
  zoom?: number;
  scrollWheelZoom?: boolean;
}

export function MainMap({
  center,
  children,
  className,
  zoom,
  scrollWheelZoom,
}: mapProps) {
  return (
    <MapContainer
      center={center}
      className={`${className ? className : ""}`}
      zoom={zoom}
      scrollWheelZoom={!!scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
