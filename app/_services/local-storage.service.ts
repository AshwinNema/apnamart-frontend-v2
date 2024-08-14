import { get, set, remove } from "local-storage";

export enum storageAttributes {
  user = "user",
  tokens = "tokens",
  theme = "theme",
}

export function getLocalStorageKey<T>(attribute: storageAttributes): T {
  return get(attribute);
}

export const setLocalStorageKey = (
  attribute: storageAttributes,
  value: any,
) => {
  set(attribute, value);
};

export const removeLocalStorageKey = (key: storageAttributes) => {
  remove(key);
};

export const clearUserStorage = () => {
  removeLocalStorageKey(storageAttributes.tokens);
  removeLocalStorageKey(storageAttributes.user);
  return null;
};

export const redirect = (route: string) => {
  window.location.href = `${window.location.href}${route}`;
};
