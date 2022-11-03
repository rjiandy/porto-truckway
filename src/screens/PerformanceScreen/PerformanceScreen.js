import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Body,
  Page,
  Section,
  StyledText,
  PrimaryButton
} from '../../components';

function PerformanceScreen(props) {
  const { logout } = props;

  const handleLogout = () => {
    AsyncStorage.getItem('@rememberMe').then((item) => {
      if (!item) {
        AsyncStorage.removeItem('@rememberMe');
        AsyncStorage.removeItem('@token');
        AsyncStorage.removeItem('@username');
        AsyncStorage.removeItem('@branchLoc');
        AsyncStorage.removeItem('@driverId');
        AsyncStorage.removeItem('@branchId');
        AsyncStorage.removeItem('@data');
      } else {
        AsyncStorage.removeItem('@token');
        AsyncStorage.removeItem('@username');
        AsyncStorage.removeItem('@branchLoc');
        AsyncStorage.removeItem('@driverId');
        AsyncStorage.removeItem('@branchId');
        AsyncStorage.removeItem('@data');
      }
    }).then(() => {
      logout();
      Actions.reset('loginScreen');
    });
  };

  return (
    <Page>
      <Body>
        <Section>
          <StyledText>PerformanceScreen</StyledText>
        </Section>
        <PrimaryButton
          label="LOGOUT"
          // isLoading={isLoading}
          // disabled={handleDisableButton()}
          onPress={() => handleLogout()}
        />
      </Body>
    </Page>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch({ type: 'LOGOUT' })
  };
}

export default connect(null, mapDispatchToProps)(PerformanceScreen);
