export const setToSessionStorage = (key: string, value: string): void => {
  sessionStorage.setItem(key, value)
}

export const getFromSessionStorage = (key: string): string | null => {
  return sessionStorage.getItem(key)
}

export const removeFromSessionStorage = (key: string): void => {
  sessionStorage.removeItem(key)
}
