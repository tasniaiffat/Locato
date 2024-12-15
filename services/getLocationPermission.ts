import * as Location from "expo-location";
import { showAlert } from "./alertUtil";

export const getLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  return status;
};
