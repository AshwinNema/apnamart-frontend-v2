import ls, { get, set } from "local-storage";

export const getBrowserAttribute = (attribute: string) => {
  return get(attribute);
};

export const setBrowserAttribute = (attribute: string, value: any) => {
  return set(attribute, value);
};
