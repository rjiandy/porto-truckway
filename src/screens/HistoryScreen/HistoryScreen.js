import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import {
  Body,
  Page,
  Section,
  StyledText,
  Header,
  Icon
} from '../../components';


import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

import PendingIcon from '../../assets/pending.png';
import DoneIcon from '../../assets/done.png';

import Tab from './components/Tab';
import PayloadCard from './components/PayloadCard';

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    marginHorizontal: 14,
    alignItems: 'center',
    marginBottom: 20
  },
  dropdownImage: {
    width: 18,
    height: 18,
    marginRight: 10
  },
  submissionContainer: {
    paddingTop: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 10
  },
  textContainer: {
    marginLeft: 6,
    flex: 1
  },
  redInfo: {
    marginTop: 18
  }
});

function HistoryScreen(props) {
  const { activeData, pendingList, doneList, retrySubmit } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [isPendingCollapsed, setPendingCollapsed] = useState(true);
  const [isFinishedCollapsed, setFinishedCollapsed] = useState(false);

  const currentData = activeData ? activeData.submissionData.payload : null;
  return (
    <Page>
      <Header home hideScan />
      <Body>
        <Tab
          labels={['Tugas Harian', 'Update']}
          activeTab={selectedTab}
          onSelect={(tabIndex) => setSelectedTab(tabIndex)}
        />

        {
          currentData && (
            <Section style={styles.submissionContainer}>
              <Section style={styles.iconContainer}>
                <Icon name="swap-vertical-outline" size={20} color={colors.davysGrey} />
              </Section>
              <Section style={styles.textContainer}>
                <StyledText style={[fonts['Roboto-12-spanishGray'], { marginBottom: 2 }]}>
                  Sedang Mengupload
                </StyledText>
                <StyledText style={fonts['Roboto-14-davysGrey-bold']}>
                  {
                    currentData.shiptoparty_name && currentData.shiptoparty_name.length > 20 ?
                      `${currentData.shiptoparty_name.slice(0, 18)}...`
                      : currentData.shiptoparty_name
                  }
                </StyledText>
                <Section style={styles.redInfo}>
                  <Section style={{ width: 18, height: 1, backgroundColor: colors.cinnabar, marginBottom: 6 }} />
                  <Section style={{ flexDirection: 'row' }}>
                    <Icon name="md-information-circle" color={colors.cinnabar} size={12} style={{ marginRight: 4 }} />
                    <StyledText style={[fonts['Roboto-10-cinnabar'], { alignItems: 'flex-start', flexWrap: 'wrap', flex: 1 }]}>
                      Perhatian! Mohon untuk tidak mengubah data atau menutup aplikasi selama proses upload.
                    </StyledText>
                  </Section>
                </Section>
              </Section>
              <Section>
                <ActivityIndicator size={40} color={colors.brightNavyBlue} />
              </Section>
            </Section>
          )
        }

        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setPendingCollapsed(!isPendingCollapsed)}
        >
          <Image source={PendingIcon} style={styles.dropdownImage} />
          <StyledText style={[fonts['Roboto-16-black-bold'], { flex: 1 }]}>
            {`Menunggu Diproses (${pendingList.length})`}
          </StyledText>
          <Icon name={isPendingCollapsed ? 'chevron-up' : 'chevron-down'} size={18} />
        </TouchableOpacity>
        {
          isPendingCollapsed && pendingList.map((data, index) => (
            <PayloadCard {...data} key={index} onRetryPress={() => retrySubmit(data.key)} />
          ))
        }

        <TouchableOpacity
          style={[styles.dropdownButton, { marginTop: 20 }]}
          onPress={() => setFinishedCollapsed(!isFinishedCollapsed)}
        >
          <Image source={DoneIcon} style={styles.dropdownImage} />
          <StyledText style={[fonts['Roboto-16-black-bold'], { flex: 1 }]}>
            {`Sukses Diproses (${doneList.length})`}
          </StyledText>
          <Icon name={isFinishedCollapsed ? 'chevron-up' : 'chevron-down'} size={18} />
        </TouchableOpacity>
        {
          isFinishedCollapsed && doneList.map((data, index) => (
            <PayloadCard {...data} key={index} />
          ))
        }

      </Body>
    </Page>
  );
}

function mapPayloadToHistory(data) {
  const { error, submissionData, key } = data;
  const { payload } = submissionData;

  const isHaveDelivery = payload.delivery_count > 0;
  const isCOD = isHaveDelivery && payload.payment_types.filter((type) => type === 'COD').length > 0;
  const isCBD = isHaveDelivery && payload.payment_types.filter((type) => type === 'CBD').length > 0;
  const isTOP = isHaveDelivery && !isCOD && !isCBD;
  return {
    customerName: payload.shiptoparty_name,
    customerID: payload.shiptoparty_code,
    isCOD,
    isCBD,
    isTOP,
    isError: error && error.length > 0 ? true : false,
    errorMessage: error,
    deliveryStatus: payload.shipment_status_customer.delivery,
    pickupStatus: payload.shipment_status_customer.pickup,
    key
  };
}

function mapStateToProps(state) {
  const { mainQueue } = state.submitStore;
  const [
    activeData,
    pendingList,
    doneList
  ] = [
    mainQueue.find((data) => data.status === 'IN_PROGRESS'),
    mainQueue.filter((data) => data.status === 'PENDING' || data.status === 'FAILED').map(mapPayloadToHistory),
    mainQueue.filter((data) => data.status === 'SUCCESS').map(mapPayloadToHistory)
  ];
  return {
    activeData,
    pendingList,
    doneList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    retrySubmit: (key) => dispatch({
      type: 'RETRY_SUBMIT',
      key
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
