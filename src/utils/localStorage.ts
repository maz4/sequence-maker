import { ValueOf } from "@/lib/valueOf";
import { StorageData } from "./localStorageTypes";

export const APP_STORAGE_KEY = "capoeira-sequence-maker";

/**
 * Saves data to localStorage under a specific key within the app's namespace
 * @param key - The key under which to store the data
 * @param data - The data to store (can be any serializable type)
 * @returns boolean indicating success or failure
 */
export const saveToStorage = (key: string, data: unknown): boolean => {
  try {
    // Get existing data
    const existingData = getFromStorage() || {};

    // Update data for the specific key
    const updatedData = {
      ...existingData,
      [key]: data,
    };

    // Save the entire updated object
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

/**
 * Retrieves all data from the app's storage namespace
 * @returns The stored data object or null if not found
 */
export const getFromStorage = (): StorageData | null => {
  try {
    const data = localStorage.getItem(APP_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

/**
 * Retrieves data for a specific key from the app's storage namespace
 * @param key - The key for which to retrieve data
 * @returns The stored data for the key or null if not found
 */
export const getItemFromStorage = (
  key: string
): ValueOf<StorageData> | null => {
  try {
    const data = getFromStorage();
    return data && data[key] ? data[key] : null;
  } catch (error) {
    console.error("Error reading item from localStorage:", error);
    return null;
  }
};

/**
 * Removes data for a specific key from the app's storage namespace
 * @param key - The key to remove
 * @returns boolean indicating success or failure
 */
export const removeFromStorage = (key: string): boolean => {
  try {
    const data = getFromStorage();
    if (data && key in data) {
      delete data[key];
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
    return false;
  }
};

/**
 * Clears all data from the app's storage namespace
 * @returns boolean indicating success or failure
 */
export const clearStorage = (): boolean => {
  try {
    localStorage.removeItem(APP_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};
