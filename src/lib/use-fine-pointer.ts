import { useSyncExternalStore } from "react";

const query = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useFinePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
