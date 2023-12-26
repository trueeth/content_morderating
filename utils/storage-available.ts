export function localStorageAvailable() {
  try {
    const testKey = '__some_random_key_you_are_not_going_to_use__';

    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);

    return true;
  } catch (error) {
    return false;
  }
}

// ----------------------------------------------------------------------
export function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable();

  let value;
  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}
