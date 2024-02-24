export const storeInSession = (key, value) => {
  // Set a value in the session storage
  return sessionStorage.setItem(key, value);
};
// Get a value from the session storage
let storedValue = null;
export const lookInSession = (key) => {
  return (storedValue = sessionStorage.getItem(key));
};

// Remove a value from the session storage
export const removeFromSession = (key) => {
  return sessionStorage.removeItem(key);
};

// Clear all values from the session storage
export const logOutUser = () => {
  return sessionStorage.clear();
};
