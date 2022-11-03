import React, { useState, useEffect } from 'react';
import { Image, Linking, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import jwt from 'jwt-decode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Body,
  Page,
  Section,
  StyledText,
  TextInputField,
  Row,
  PrimaryButton,
  CustomModal
} from '../../components';

import { fetchLogin } from '../../stores/actions';

import colors from '../../themes/colors';

import truckwayLogo from '../../assets/truckway_logo.png';
import bizzyDistLogo from '../../assets/bizzy_dist_logo.png';
import wrongAccount from '../../assets/wrong_account.png';

function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [unameOnSuccess, setUnameOnSuccess] = useState(false);
  const [unameOnError, setUnameOnError] = useState(false);
  const [password, setPassword] = useState('');
  const [pwdOnSuccess, setPwdOnSuccess] = useState(false);
  const [pwdOnError, setPwdOnError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const callcenter = '+62 124 9242';

  const { authStore, login, isLoading } = props;

  const handleDisableButton = () => {
    if (unameOnError && pwdOnError) {
      return true;
    }

    if (unameOnError || pwdOnError) {
      return true;
    }

    if (username.length === 0 || password.length === 0) {
      return true;
    }

    if (username.length === 0 && password.length === 0) {
      return true;
    }
    if (isLoading) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    await login(username, password);
  };

  useEffect(() => {
    AsyncStorage.getItem('@rememberMe').then((data) => {
      const cred = JSON.parse(data);
      if (data) {
        setUsername(cred.username);
        setPassword(cred.password);
      }
    });
    AsyncStorage.getItem('@token').then((token) => {
      if (token && token.length > 0) {
        Actions.homeScreen();
      }
    });
  }, []);

  useEffect(() => {
    if (__DEV__ && username === '') {
      setUsername('rodi');
      setPassword('Password123!');
    }
  }, [username]);

  useEffect(() => {
    if (authStore.payload.code === 200) {
      const payload = jwt(authStore.payload.data.token, Config.TOKEN_JWT_SECRET);

      AsyncStorage.setItem('@token', authStore.payload.data.token);
      AsyncStorage.setItem('@driverId', payload.driver_id);
      AsyncStorage.setItem('@username', payload.driver_name);
      AsyncStorage.setItem('@branchLoc', JSON.stringify(payload.branch_details));
      AsyncStorage.setItem('@branchId', payload.branch.toString());

      Actions.mainTabs();
    }

    if (!isLoading && authStore.error.code === 404) {
      setUnameOnError(true);
      setPwdOnError(false);
      setModalVisible(true);
      setModalTitle('Nama pengguna tidak terdaftar atau salah');
    }

    if (!isLoading && authStore.error.code === 400) {
      setPwdOnError(true);
      setUnameOnError(false);
      setModalVisible(true);
      setModalTitle('Kata sandi Anda salah');
    }
  }, [authStore, isLoading]);

  useEffect(() => {
    if (rememberMe) {
      const credential = {
        username,
        password
      };
      AsyncStorage.setItem('@rememberMe', JSON.stringify(credential));
    } else {
      AsyncStorage.removeItem('@rememberMe');
    }
  }, [rememberMe, username, password]);

  return (
    <Page>
      <Body style={{ paddingHorizontal: 14 }}>
        <Section
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 30
          }}>
          <Image
            source={truckwayLogo}
            resizeMode="contain"
            style={{ width: 194, height: 50 }}
          />
        </Section>
        <Section style={{ paddingTop: 20 }}>
          <TextInputField
            label="Nama Pengguna"
            placeholder="contoh, Bambang02"
            iconName="account"
            onFocus={() => {
              setUnameOnSuccess(true);
              setUnameOnError(false);
            }}
            onBlur={() => setUnameOnSuccess(false)}
            onSuccess={unameOnSuccess}
            onError={unameOnError}
            onChangeText={val => setUsername(val)}
            value={username}
            labelError="*salah/tidak terdaftar"
          />
        </Section>
        <Section style={{ paddingTop: 14 }}>
          <TextInputField
            label="Kata Sandi"
            placeholder="********"
            iconName="lock"
            onFocus={() => {
              setPwdOnSuccess(true);
              setPwdOnError(false);
            }}
            onBlur={() => setPwdOnSuccess(false)}
            onSuccess={pwdOnSuccess}
            onError={pwdOnError}
            onChangeText={val => setPassword(val)}
            value={password}
            secureTextEntry
            labelError="*salah"
          />
        </Section>
        <Row style={{ paddingTop: 14 }}>
          <TouchableWithoutFeedback onPress={() => setRememberMe(!rememberMe)}>
            <Row style={{ alignItems: 'center' }}>
              <Section
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: rememberMe ? colors.mountainMeadow : colors.cultured2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Icon
                  name="check"
                  size={20}
                  color={colors.white}
                />
              </Section>
              <Section style={{ paddingLeft: 10 }}>
                <StyledText font="Roboto-14-dimGray">Ingat saya</StyledText>
              </Section>
            </Row>
          </TouchableWithoutFeedback>
        </Row>
        <Section style={{ paddingTop: 30 }}>
          <PrimaryButton
            label="Masuk"
            isLoading={isLoading}
            disabled={handleDisableButton()}
            onPress={() => handleSubmit()}
          />
        </Section>
        <Section style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
          <StyledText font="Roboto-12-davysGrey">
            Untuk Bantuan, Hubungi
            <StyledText font="Roboto-12-blue" onPress={() => Linking.openURL(`tel:${callcenter}`)}>
              {` ${callcenter}`}
            </StyledText>
          </StyledText>
        </Section>
      </Body>
      <Section
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20
        }}
      >
        <Image
          source={bizzyDistLogo}
          style={{ width: 80, height: 50 }}
          resizeMode="contain"
        />
      </Section>
      <CustomModal
        img={wrongAccount}
        title={modalTitle}
        primaryButtonText="Coba Lagi"
        primaryButtonOnPress={() => {
          setModalVisible(false);
        }}
        onRequestClose={() => setModalVisible(false)}
        isVisible={modalVisible}
      />
    </Page>
  );
}

function mapStateToProps(state) {
  return {
    authStore: state.authStore,
    isLoading: state.authStore.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(fetchLogin(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
