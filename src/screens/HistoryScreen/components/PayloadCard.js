import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import {
  Section,
  StyledText,
  Col,
  CustomIcon,
  Icon
} from '../../../components';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

import ErrorIcon from '../../../assets/error_icon.png';

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gainsboro,
    padding: 14,
    borderRadius: 4
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  cardButton: {
    borderColor: colors.brightNavyBlue,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7
  },
  cardRedBar: {
    width: 18,
    height: 1,
    backgroundColor: colors.cinnabar,
    marginBottom: 4
  },
  cardErrorText: {
    flexDirection: 'row',
    flex: 1
  },
  errorDetail: {
    fontStyle: 'italic',
    borderBottomWidth: 1,
    borderColor: colors.brightNavyBlue
  },
  modalOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 14,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  mainButton: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.brightNavyBlue,
    borderRadius: 6,
    marginTop: 24
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 6,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue
  },

  // TAG STYLES
  tagContainer: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginBottom: 6
  },
  tagBorder: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: colors.davysGrey
  }
});

function PaymentTag(props) {
  const { paymentType } = props;
  switch (paymentType) {
    case 'COD': {
      return (
        <Section style={[styles.tagContainer, { backgroundColor: colors.emerald }]}>
          <StyledText style={fonts['Roboto-12-white']}>COD</StyledText>
        </Section>
      );
    }
    case 'CBD': {
      return (
        <Section style={[styles.tagContainer, { backgroundColor: colors.yellowGreen }]}>
          <StyledText style={fonts['Roboto-12-white']}>CBD</StyledText>
        </Section>
      );
    }
    case 'TOP': {
      return (
        <Section style={[styles.tagContainer, styles.tagBorder]}>
          <StyledText style={fonts['Roboto-12-davysGrey']}>TOP</StyledText>
        </Section>
      );
    }
    default: {
      return null;
    }
  }
}

function PayloadCard(props) {
  const [displayErrorModal, setDisplayErrorModal] = useState(false);

  const {
    customerName,
    customerID,
    isCOD,
    isCBD,
    isTOP,
    isError,
    errorMessage,
    pickupStatus,
    deliveryStatus,
    onRetryPress
  } = props;

  const modifiedErrorMessage = errorMessage && errorMessage.length > 36 ? `${errorMessage.slice(0, 33)}...` : errorMessage;
  return (
    <Section style={styles.cardContainer}>
      {
        displayErrorModal && (
          <Modal transparent>
            <Section style={styles.modalOverlay}>
              <Section style={styles.modalContent}>
                <Image
                  source={ErrorIcon}
                  style={{ width: 68, height: 68, marginTop: 12, marginBottom: 14, alignSelf: 'center' }}
                />
                <Col style={{ alignItems: 'center' }}>
                  <StyledText style={fonts['Roboto-16-black-bold']}>Perhatian!</StyledText>
                  <StyledText
                    style={[fonts['Roboto-14-davysGrey'], { textAlign: 'center' }]}
                  >
                    {errorMessage}
                  </StyledText>
                </Col>
                <TouchableOpacity
                  style={styles.mainButton}
                  onPress={() => {
                    Clipboard.setString(errorMessage);
                  }}
                >
                  <StyledText style={fonts['Roboto-14-white']}>
                    Salin
                  </StyledText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => setDisplayErrorModal(false)}
                >
                  <StyledText style={fonts['Roboto-14-blue']}>Tutup</StyledText>
                </TouchableOpacity>
              </Section>
            </Section>
          </Modal>
        )
      }
      <Section style={styles.flexRow}>
        <Col style={{ flex: 1 }}>
          <StyledText style={fonts['Roboto-12-davysGrey']}>Nama Toko</StyledText>
          <StyledText style={fonts['Roboto-14-davysGrey-bold']}>
            {customerName && customerName.length > 20 ? `${customerName.slice(0, 18)}...` : customerName}
          </StyledText>
        </Col>
        <Col style={{ alignItems: 'flex-end', flex: 0.7 }}>
          <StyledText style={[fonts['Roboto-12-davysGrey'], { textAlign: 'right' }]}>
            Metode Pembayaran
          </StyledText>
          <Section style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4, flex: 1, flexWrap: 'wrap' }}>
            {isTOP && <PaymentTag paymentType="TOP" />}
            {isCOD && <PaymentTag paymentType="COD" />}
            {isCBD && <PaymentTag paymentType="CBD" />}
          </Section>
        </Col>
      </Section>
      <Section style={[styles.flexRow, !isError && { marginBottom: 0 }]}>
        <Col>
          <StyledText style={fonts['Roboto-12-davysGrey']}>ID Pelanggan</StyledText>
          <StyledText style={fonts['Roboto-14-davysGrey-bold']}>{customerID}</StyledText>
        </Col>
        <Col style={{ alignItems: 'flex-end' }}>
          <StyledText style={fonts['Roboto-12-davysGrey']}>Status</StyledText>
          <Section style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4 }}>
            {
              deliveryStatus && (
                <Section style={{ marginLeft: 4 }}>
                  <CustomIcon type="deliveryIcon" status={deliveryStatus} width={24} height={24} />
                </Section>
              )
            }
            {
              pickupStatus && (
                <Section style={{ marginLeft: 4 }}>
                  <CustomIcon type="pickupIcon" status={pickupStatus} width={24} height={24} />
                </Section>
              )
            }
          </Section>
        </Col>
      </Section>
      {
        isError && (
          <Section style={[styles.flexRow, { marginBottom: 0 }]}>
            <Col style={{ flex: 1 }}>
              <Section style={styles.cardRedBar} />
              <Section style={styles.cardErrorText}>
                <Icon name="md-information-circle" color={colors.cinnabar} size={12} style={{ marginRight: 4 }} />
                <Section>
                  <StyledText style={[fonts['Roboto-10-cinnabar'], { flex: 1, flexWrap: 'wrap' }]}>
                    {`Perhatian! ${modifiedErrorMessage}`}
                  </StyledText>
                  <TouchableOpacity
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => setDisplayErrorModal(true)}
                  >
                    <StyledText style={[fonts['Roboto-10-blue'], styles.errorDetail]}>
                      klik untuk lihat lebih
                    </StyledText>
                  </TouchableOpacity>
                </Section>
              </Section>
            </Col>
            <Col style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity style={styles.cardButton} onPress={onRetryPress}>
                <StyledText style={fonts['Roboto-14-blue-bold']}>Ulangi Proses</StyledText>
              </TouchableOpacity>
            </Col>
          </Section>
        )
      }
    </Section>
  );
}

export default PayloadCard;
