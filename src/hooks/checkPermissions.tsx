import {PermissionsAndroid} from 'react-native';

export const useLocationPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return console.log('You can use the location');
    } else {
      return console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
