import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import { Actions } from 'react-native-router-flux';

import getShipmentPlan, { refreshShipmentAction, saveShipmentProgress } from '../../stores/actions/shipmentPlanAction';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

import lightBulb from '../../assets/lightbulb.png';
import todayShipment from '../../assets/truck-shipments.png';
import nextShipment from '../../assets/next-shipment.png';

import {
  Page,
  Section,
  StyledText,
  Icon,
  Header,
  LoadingBar,
  CustomModal
} from '../../components';

import sessionExpImg from '../../assets/session_expired.png';
import errorCloudImg from '../../assets/error_cloud.png';

import isShipmentGIValid from './helpers/checkStatusGI';

import DriverHeader from './components/DriverHeader';
import GIModal from './components/GIModal';
import ShipmentItem, { ShipmentEmpty, NotFoundShipment } from './components/ShipmentItem';

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  searchBox: {
    width: '100%',
    height: 40,
    flexDirection: 'row'
  },
  searchInputContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingLeft: 12,
    overflow: 'hidden',
    borderRadius: 6,
    flexDirection: 'row'
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchButton: {
    backgroundColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    width: 61,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    alignSelf: 'flex-end'
  },

  scrollInfo: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: colors.starCommandBlue,
    alignItems: 'center'
  },
  lightBulbImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 7
  },
  todayShipmentsContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    marginBottom: 10,
    backgroundColor: colors.white,
    flexDirection: 'column'
  },
  todayShipmentHeader: {
    flexDirection: 'row',
    marginBottom: 12
  },
  todayTruckImage: {
    width: 18,
    height: 18,
    marginRight: 6
  },
  grayBar: {
    width: '100%',
    height: 10,
    backgroundColor: colors.cultured
  }
});

function HomeScreen(props) {
  const {
    isLoading,
    isRefreshing,
    refreshShipments,
    nextShipments,
    currentShipments,
    fetchShipmentPlan,
    shouldGetNewData,
    shipmentPlanStore,
    logout,
    selectShipment,
    startShipment,

    saveShipment
  } = props;

  const [driverName, setDriverName] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isGIBlocked, setGIBlocked] = useState(false);
  const [selectedShipmentNumber, setSelectedShipmentNumber] = useState('');
  const [driverId, setDriverId] = useState('');

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem('@username').then(name => isMounted && setDriverName(name));
    AsyncStorage.getItem('@driverId').then(driverID => isMounted && setDriverId(driverID));
    if (shouldGetNewData) {
      fetchShipmentPlan();
    }
    return () => { isMounted = false; };
  }, [shouldGetNewData, fetchShipmentPlan]);

  useEffect(() => {
    if (!isRefreshing && shipmentPlanStore.errorRefresh) {
      setModalVisible(true);
    }
  }, [shipmentPlanStore.errorRefresh, isRefreshing]);

  useEffect(() => {
    if (!isLoading && shipmentPlanStore.error) {
      setModalVisible(true);
    }
  }, [isLoading, shipmentPlanStore.error]);

  useEffect(() => {
    if (!isLoading && shipmentPlanStore.error) {
      setModalVisible(true);
    }
  }, [shipmentPlanStore.error, isLoading]);

  useEffect(() => {
    if (shipmentPlanStore.error) {
      if (shipmentPlanStore.error.status === 401) {
        setIsSessionExpired(true);
      }
    }
  }, [shipmentPlanStore.error]);

  useEffect(() => {
    if (!isRefreshing && shipmentPlanStore.errorRefresh) {
      if (shipmentPlanStore.errorRefresh.status === 401) {
        setIsSessionExpired(true);
      }
    }
  }, [isRefreshing, shipmentPlanStore.errorRefresh]);

  const onShipmentProgress = async (selectedShipment, data) => {
    const payload = {
      driver_id: driverId,
      shipment_plan_number: selectedShipment
    };
    startShipment(selectedShipment, data);
    saveShipment(payload);
  };


  return (
    <Page>
      <Header home />
      <LoadingBar visible={isLoading} />

      {
        isGIBlocked && (
          <GIModal
            onClose={() => setGIBlocked(false)}
            shipmentNumber={selectedShipmentNumber}
          />
        )
      }

      <DriverHeader name={driverName} />
      <Section style={styles.searchContainer}>
        <Section style={styles.searchBox}>
          <Section style={styles.searchInputContainer}>
            <Section style={styles.textInputContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (searchValue.length > 0) {
                    setSearchValue('');
                    setActiveSearch('');
                  }
                }}
              >
                <Icon
                  name={searchValue.length < 1 ? 'md-search' : 'md-close'}
                  size={16}
                  style={{ color: colors.spanishGray }}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Cari nomor shipment"
                value={searchValue}
                onChangeText={(val) => setSearchValue(val)}
                style={{ flex: 1 }}
              />
            </Section>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setActiveSearch(searchValue)}
            >
              <StyledText style={fonts['Roboto-14-white']}>Cari</StyledText>
            </TouchableOpacity>
          </Section>
        </Section>
      </Section>
      <Section style={styles.scrollInfo}>
        <Image
          source={lightBulb}
          style={styles.lightBulbImage}
          resizeMode="cover"
        />
        <StyledText style={fonts['Roboto-12-white']}>
          Tarik ke bawah untuk <StyledText style={fonts['Roboto-12-white-bold']}>Memperbaharui Data.</StyledText>
        </StyledText>
      </Section>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshShipments()}
            colors={[colors.brightNavyBlue]}
          />
        }
      >
        {
          currentShipments.length > 0 ? (
            <Section style={styles.todayShipmentsContainer}>
              <Section style={styles.todayShipmentHeader}>
                <Image source={todayShipment} resizeMode="cover" style={styles.todayTruckImage} />
                <StyledText style={fonts['Roboto-16-blue']}>
                  Rencana Pengiriman Hari Ini
                </StyledText>
              </Section>
              {
                (
                  currentShipments.length > 0 &&
                  currentShipments.filter(({ shipment_plan_number }) => shipment_plan_number.includes(activeSearch)).length > 0
                ) ?
                  currentShipments.filter(({ shipment_plan_number }) => shipment_plan_number.includes(activeSearch)).map((data, idx) => (
                    <ShipmentItem
                      key={idx}
                      isCollapsed={idx === 0}
                      isToday
                      shipmentPlanNumber={data.shipment_plan_number}
                      customerCount={data.customer_count}
                      itemCount={data.item_count}
                      deliveryCount={data.delivery_count}
                      pickupCount={data.pickup_count}
                      onDetailPress={() => {
                        setSelectedShipmentNumber(data.shipment_plan_number);
                        if (isShipmentGIValid(data)) {
                          if (data.shipment_in_progress === 1) {
                            selectShipment(data.shipment_plan_number, data);
                            onShipmentProgress(data.shipment_plan_number, data);
                            Actions.customerListScreen();
                          } else {
                            onShipmentProgress(data.shipment_plan_number, data);
                            Actions.customerListScreen();
                          }
                        } else {
                          setGIBlocked(true);
                        }
                      }}
                      shipmentInProgress={data.shipment_in_progress === 1}
                    />
                  )) : <NotFoundShipment />
              }
            </Section>
          ) : (
            <ShipmentEmpty />
          )
        }
        <Section style={styles.grayBar} />
        {
          nextShipments.length > 0 ? (
            <Section style={styles.todayShipmentsContainer}>
              <Section style={styles.todayShipmentHeader}>
                <Image source={nextShipment} resizeMode="cover" style={styles.todayTruckImage} />
                <StyledText style={fonts['Roboto-16-black-bold']}>
                  Pengiriman Hari Lain
                </StyledText>
              </Section>
              <StyledText style={[fonts['Roboto-14-davysGrey'], { marginBottom: 14 }]}>
                {moment().add(1, 'day').format('DD') === moment(shipmentPlanStore.nextShipments.date).format('DD') && 'Besok, '}
                {moment(shipmentPlanStore.nextShipments.date).format('DD MMMM YYYY')}
              </StyledText>
              {
                (
                  nextShipments.length > 0 &&
                  nextShipments.filter(({ shipment_plan_number }) => shipment_plan_number.includes(activeSearch)).length > 0
                ) ?
                  nextShipments.filter(({ shipment_plan_number }) => shipment_plan_number.includes(activeSearch)).map((data, idx) => (
                    <ShipmentItem
                      key={idx}
                      shipmentPlanNumber={data.shipment_plan_number}
                      customerCount={data.customer_count}
                      itemCount={data.item_count}
                      deliveryCount={data.delivery_count}
                      pickupCount={data.pickup_count}
                      onDetailPress={() => {
                        selectShipment(data.shipment_plan_number, data);
                        Actions.customerListScreen();
                      }}
                    />
                  )) : <NotFoundShipment />
              }
            </Section>
          ) : (
            <ShipmentEmpty />
          )
        }
      </ScrollView>
      {modalVisible && (
        <CustomModal
          img={isSessionExpired ? sessionExpImg : errorCloudImg}
          title={isSessionExpired ? 'Sesi Anda Telah Habis' : 'Error Get Data'}
          subtitle={isSessionExpired ? 'Mohon login kembali' : 'Silahkan ulangi lagi.'}
          primaryButtonText={isSessionExpired ? 'Login Kembali' : 'Coba Lagi'}
          primaryButtonOnPress={() => {
            if (isSessionExpired) {
              // AsyncStorage.clear();
              AsyncStorage.removeItem('@token');
              AsyncStorage.removeItem('@username');
              AsyncStorage.removeItem('@branchLoc');
              AsyncStorage.removeItem('@driverId');
              AsyncStorage.removeItem('@branchId');
              AsyncStorage.removeItem('@data');
              logout();
              Actions.reset('loginScreen');
            } else {
              refreshShipments();
              setModalVisible(false);
            }
          }}
          onRequestClose={() => setModalVisible(false)}
          isVisible={modalVisible}
        />
      )}
    </Page>
  );
}

export function mapStateToProps(state) {
  const {
    offlineStore
  } = state;
  const {
    isLoading,
    currentShipments,
    nextShipments,
    isRefreshing
  } = state.shipmentPlanStore;

  return {
    isLoading,
    currentShipments: currentShipments.shipments,
    nextShipments: nextShipments.shipments,
    isRefreshing,
    shouldGetNewData: offlineStore.shouldGetNewData,
    shipmentPlanStore: state.shipmentPlanStore
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchShipmentPlan: () => dispatch(getShipmentPlan()),
    refreshShipments: () => dispatch(refreshShipmentAction()),
    logout: () => dispatch({ type: 'LOGOUT' }),
    selectShipment: (selectedShipment, data) => dispatch({
      type: 'SELECT_SHIPMENT', selectedShipment, customers: data.customers
    }),
    startShipment: (selectedShipment, data) => dispatch({
      type: 'START_SHIPMENT',
      selectedShipment,
      customers: data.customers
    }),
    saveShipment: (data) => dispatch(saveShipmentProgress(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
