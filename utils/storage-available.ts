// ----------------------------------------------------------------------
// Checks if localStorage is available in the current environment
export function localStorageAvailable() {
  try {
    // Attempt to use localStorage to determine its availability
    const testKey = '__some_random_key_you_are_not_going_to_use__';

    // Try to set and remove an item in localStorage
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);

    // If successful, localStorage is available
    return true;
  } catch (error) {
    // An error occurred, indicating that localStorage is not available
    return false;
  }
}

// ----------------------------------------------------------------------
// Gets an item from localStorage or returns a default value if not available
export function localStorageGetItem(key: string, defaultValue = '') {
  // Check if localStorage is available
  const storageAvailable = localStorageAvailable();

  let value;

  // If localStorage is available, attempt to get the item
  if (storageAvailable) {
    // Use localStorage to get the item, or use the default value if not present
    value = localStorage.getItem(key) || defaultValue;
  }

  // Return the retrieved value or the default value
  return value;
}
