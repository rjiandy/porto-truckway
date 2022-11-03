import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconicons from 'react-native-vector-icons/Ionicons';

import colors from '../themes/colors';
import truckwayLogo from '../assets/truckway_logo.png';

import CustomIcon from './CustomIcon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingHorizontal: 14
  },
  headerContainer: {
    width: '100%',
    height: 44,
    backgroundColor: colors.brightNavyBlue,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

function NetworkStatus(props) {
  const { label, isConnected } = props;
  return (
    <View
      style={{
        backgroundColor: isConnected ? colors.darkPastelGreen : colors.jet,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20
      }}
    >
      <Text style={{ color: colors.white, fontSize: 12 }}>{label}</Text>
    </View>
  );
}

function Header(props) {
  const [statusText, setStatusText] = useState('');
  const [isConnected, setIsConnected] = useState(null);
  const [visible, setVisible] = useState(false);
  const { home, title, hideScan } = props;

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);
    });

    // Unsubscribe
    return (() => unsubscribe());
  }, []);


  useEffect(() => {
    let isMounted = true;
    if (isConnected) {
      setStatusText('Koneksi Internet Kembali Tersambung');
      setTimeout(() => {
        if (isMounted) { setVisible(false); }
      }, 3000);
    } else if (isConnected === false) {
      setStatusText('Koneksi Internet Anda Terputus');
      setVisible(true);
    }
    return () => { isMounted = false; };
  }, [isConnected]);

  if (home) {
    return (
      <View>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Image
              source={truckwayLogo}
              resizeMode="contain"
              style={{ height: 22, width: 86 }}
            />
          </View>
          {
            !hideScan && (
              <TouchableOpacity style={{ flex: 0.1 }} onPress={() => alert('scan')}>
                <CustomIcon type="scan" height={18} width={18} />
              </TouchableOpacity>
            )
          }
          <TouchableOpacity style={{ flex: 0.15, alignItems: 'flex-end' }} onPress={() => alert('notification')}>
            <Icon
              name="bell-outline"
              size={20}
              color={colors.davysGrey}
            />
          </TouchableOpacity>
        </View>
        {visible && (
          <NetworkStatus label={statusText} isConnected={isConnected} />
        )}
      </View>
    );
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Iconicons name="md-arrow-back" size={18} style={{ color: colors.white }}/>
        </TouchableOpacity>
        <Text style={{ marginLeft: 14, color: colors.white, fontSize: 14 }}>
          {title}
        </Text>
      </View>
      {visible && (
        <NetworkStatus label={statusText} isConnected={isConnected} />
      )}
    </View>
  );
}

export default Header;
