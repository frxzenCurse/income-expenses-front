export function setToLocalStorage(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}
export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
