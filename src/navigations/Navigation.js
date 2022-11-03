import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Router,
  Stack,
  Scene,
  Tabs
} from 'react-native-router-flux';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import PerformanceScreen from '../screens/PerformanceScreen/PerformanceScreen';
import CustomerListScreen from '../screens/CustomerListScreen/CustomerListScreen';
import CustomerSummaryScreen from '../screens/CustomerSummaryScreen/CustomerSummaryScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen/CustomerDetailScreen';
import NavigationMapScreen from '../screens/MapScreen/NavigationMapScreen';
import MaterialListScreen from '../screens/MaterialListScreen/MaterialListScreen';
import CODTransactionScreen from '../screens/CODTransactionScreen/CODTransactionScreen';
import SummaryScreen from '../screens/SummaryScreen/SummaryScreen';

import { TabIcon } from '../components';
import colors from '../themes/colors';

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3
  }
});

const Truckway = () => {
  return (
    <Router>
      <Stack key="root" headerMode="none">
        <Scene key="loginScreen" component={LoginScreen} title="Login" />
        <Scene key="customerListScreen" component={CustomerListScreen} title="Customer List" />
        <Scene key="customerSummaryScreen" component={CustomerSummaryScreen} title="Customer Summary" />
        <Scene key="customerDetailScreen" component={CustomerDetailScreen} title="Customer Summary" />
        <Scene key="navigationMapScreen" component={NavigationMapScreen} title="Navigation Map" />
        <Scene key="materialListScreen" component={MaterialListScreen} title="Material List" />
        <Scene key="CODTransactionScreen" component={CODTransactionScreen} title="COD Transaction" />
        <Scene key="materialListScreen" component={MaterialListScreen} title="Material List" />

        <Scene key="summaryScreen" component={SummaryScreen} title="E - Sign" />
        <Tabs
          key="mainTabs"
          tabBarPosition="bottom"
          activeTintColor={colors.brightNavyBlue}
          inactiveTintColor={colors.davysGrey}
          tabBarStyle={styles.tabBar}
          type="replace"
          lazy
          showLabel={false}
        >
          <Scene
            key="homeScreen"
            component={HomeScreen}
            title="HomeScreen"
            icon={({ tintColor }) => (
              <TabIcon name="Beranda" tintColor={tintColor} />
            )}
          />
          <Scene
            key="chatScreen"
            component={ChatScreen}
            title="ChatScreen"
            icon={({ tintColor }) => (
              <TabIcon name="Pesan" tintColor={tintColor} />
            )}
          />
          <Scene
            key="historyScreen"
            component={HistoryScreen}
            title="HistoryScreen"
            icon={({ tintColor }) => (
              <TabIcon name="Riwayat" tintColor={tintColor} />
            )}
          />
          <Scene
            key="performanceScreen"
            component={PerformanceScreen}
            title="PerformanceScreen"
            icon={({ tintColor }) => (
              <TabIcon name="Performa" tintColor={tintColor} />
            )}
          />
        </Tabs>
      </Stack>
    </Router>
  );
};

export default Truckway;
