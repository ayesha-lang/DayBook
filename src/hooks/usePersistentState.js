import { useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage.js';

/* Like useState, but loads from and saves to localStorage. */
export default function usePersistentState(key, init, normalize) {
  const [value, setValue] = useState(() => {
    const loaded = normalize(loadFromLocalStorage(key));
    return loaded ?? init();
  });
  const [storageOK, setStorageOK] = useState(true);

  useEffect(() => {
    setStorageOK(saveToLocalStorage(key, value));
  }, [key, value]);

  return [value, setValue, storageOK];
}