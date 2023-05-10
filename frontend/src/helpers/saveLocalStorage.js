// storageKey -> Key of the local storage that you want to save the object
// objectToSave -> Object that you want to save in the local storage
const saveLocalStorage = (storageKey, objectToSave) => {
  const newObject = JSON.stringify(objectToSave);
  if (localStorage.getItem(storageKey) === null) {
    // If the key doesn't exist, create a object
    localStorage.setItem(storageKey, newObject);
  } else {
    // If the key does exist, create a new object
    localStorage.setItem(storageKey, newObject);
  }
};

export default saveLocalStorage;
