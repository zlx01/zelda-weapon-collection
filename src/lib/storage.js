export const STORAGE_KEY = "zelda-weapon-collection:acquired:v1";

export function readAcquiredWeapons() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

export function writeAcquiredWeapons(acquiredIds) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...acquiredIds]));
}

export function clearAcquiredWeapons() {
  window.localStorage.removeItem(STORAGE_KEY);
}
