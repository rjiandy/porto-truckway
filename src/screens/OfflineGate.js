/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import rehydrateAction from '../stores/actions/offlineAction';

export function OfflineGate(props) {
  const {
    triggerGetNewData,
    triggerRehydrate,
    dispatchNetInfo
  } = props;
  const {
    isRefreshing,
    uniqueIdentifier
  } = props.offlineStore;

  const syncData = async () => {
    const storedData = await AsyncStorage.getItem('@data');
    // console.log(storedData);
    if (storedData && storedData.length > 0) {
      const todayDate = new Date().getDate();
      const dataDate = new Date(JSON.parse(storedData).shipmentPlanStore.currentShipments.date).getDate();
      if (dataDate !== todayDate) {
        await AsyncStorage.removeItem('@data');
        triggerGetNewData();
      } else {
        triggerRehydrate(JSON.parse(storedData));
      }
    } else {
      AsyncStorage.setItem('@data', JSON.stringify(props.state));
    }
  };

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatchNetInfo(state.isInternetReachable);
    });
    // Unsubscribe
    return (() => unsubscribe());
  }, []);

  useEffect(() => {
    syncData();
  }, []);

  useEffect(() => {
    if (isRefreshing) {
      AsyncStorage.removeItem('@data');
    } else {
      AsyncStorage.setItem('@data', JSON.stringify(props.state));
    }
  }, [uniqueIdentifier, isRefreshing]);

  return props.children;
}

function mapStateToProps(state) {
  return {
    state,
    offlineStore: state.offlineStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    triggerGetNewData: () => dispatch({ type: 'GET_NEW_DATA' }),
    triggerRehydrate: savedState => dispatch(rehydrateAction(savedState)),
    dispatchNetInfo: (isConnected) =>
      dispatch({
        type: 'NETWORK_CHANGED',
        isConnected
      })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineGate);
