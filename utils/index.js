import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = React.createContext();

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}

export const mergeData = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
    Alert.alert("Merge Data Error", e.message);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
    Alert.alert("Clear Data Error", e.message);
  }
};

export const isDiffJSON = (a, b) => {
  let ret = {};
  for (const i in b) {
    if (!Object.hasOwnProperty.call(a, i) || b[i] !== a[i]) {
      ret[i] = b[i];
    }
  }
  return Boolean(Object.keys(ret).length);
};

export const createInitial = (firstName, lastName) => {
  if (firstName && lastName) return firstName[0] + lastName[0];
  else if (firstName && firstName.length > 1) return firstName.substring(0, 2);
  else return "";
};
