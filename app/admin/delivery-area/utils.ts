import {   EventLayer, featureGroupAreas, } from "./interfaces";

export * from "./interfaces"
export * from "./apis"

const formatLayerDetails = (layer: EventLayer) => {
  const radius = layer._mRadius;
  const { lat, lng } = layer._latlng;

  return {
    radius,
    lat,
    lng,
  };
};

export const addNewArea = (
  layer: EventLayer,
  setFeatures: (...args: any) => void,
) => {
  const id = layer._leaflet_id;
  setFeatures((prevFeatures: featureGroupAreas) => {
    prevFeatures.created[id] = formatLayerDetails(layer);
    return { ...prevFeatures };
  });
};

export const updateMapAreas = (
  layers: {
    [leafletId: string]: EventLayer;
  },
  setFeatures: (...args: any) => void,
) => {
  const keys = Object.keys(layers);
  setFeatures((prevFeatures: featureGroupAreas) => {
    const { created, current } = prevFeatures;
    keys.forEach((key) => {
      if (created[key]) {
        created[key] = formatLayerDetails(layers[key]);
        return;
      }
      Object.assign(current[key], formatLayerDetails(layers[key]));
    });
    return { ...structuredClone(prevFeatures) };
  });
};

export const deleteMapAreas = (
  layers: {
    [leafletId: string]: EventLayer;
  },
  setFeatures: (...args: any) => void,
) => {
  const keys = Object.keys(layers);
  setFeatures((prevFeatures: featureGroupAreas) => {
    const { created, current, deleted } = prevFeatures;
    const curDeletes: number[] = [];
    keys.forEach((key) => {
      if (!current[key] && !created[key]) return;
      if (current[key]) {
        curDeletes.push(current[key].dbId);
        delete current[key];
      } else {
        delete created[key];
      }
    });

    deleted.push(...curDeletes);
    return { ...structuredClone(prevFeatures) };
  });
};
