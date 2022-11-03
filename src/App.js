import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  SafeAreaView,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';


import store from './stores';
import MainNavigation from './navigations/Navigation';

import OfflineGate from './screens/OfflineGate';

const App = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [permissionNeverAsk, setPermissionNeverAsk] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    checkPermission();
  }, []);

  useEffect(() => {
    if (!permissionsGranted && !permissionNeverAsk) {
      checkPermission();
    }
  }, [permissionsGranted, permissionNeverAsk]);

  useEffect(() => {
    const title = 'Permissions Needed';
    const message = 'Please Go into Settings -> Applications -> TRUCKWAY -> Permissions and Allow permissions to continue or reinstall the app';

    if (permissionNeverAsk) {
      Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: () => BackHandler.exitApp() }],
      );
    }
  }, [permissionNeverAsk]);

  const checkPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]).then(async (res) => {
        if (
          res['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
          res['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
          res['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
          res['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
        ) {
          setPermissionsGranted(true);
        } else if (
          res['android.permission.READ_EXTERNAL_STORAGE'] === 'never_ask_again' ||
          res['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again' ||
          res['android.permission.ACCESS_FINE_LOCATION'] === 'never_ask_again' ||
          res['android.permission.ACCESS_COARSE_LOCATION'] === 'never_ask_again'
        ) {
          setPermissionNeverAsk(true);
        } else {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
          ]);
          setPermissionsGranted(false);
        }
      });
    } catch (e) {
      ToastAndroid.show(e, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <OfflineGate>
          <MainNavigation />
        </OfflineGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
