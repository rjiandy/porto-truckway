import Geolocation from 'react-native-geolocation-service';

export default function GetCurrentLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (success) => resolve(success),
      (err) => reject(err),
      {
        timeout: 7000,
        distanceFilter: 100
      }
    );
  });
}
