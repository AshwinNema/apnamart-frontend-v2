import { get, set, remove, clear } from "local-storage";
import { useRouter } from "next/router";

export function getLocalStorageKey<T>(attribute: string): T {
  return get(attribute);
}

export const setLocalStorageKey = (attribute: string, value: any) => {
  set(attribute, value);
};

export const removeLocalStorageKey = (key: string) => {
  remove(key);
};

export const clearStorage = () => {
  clear();
  return null;
};

export const redirect = (route: string) => {
  const router = useRouter();
  router.push(route);
};
