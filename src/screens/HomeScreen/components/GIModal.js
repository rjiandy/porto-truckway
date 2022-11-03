import React from 'react';
import { StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

import {
  Section,
  StyledText
} from '../../../components';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

import mainImage from '../../../assets/shipment_not_gi.png';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1500
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 24,
    marginHorizontal: 40
  },
  button: {
    backgroundColor: colors.brightNavyBlue,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row'
  }
});

export default function GIModal(props) {
  const {
    onClose,
    shipmentNumber
  } = props;

  return (
    <Modal transparent>
      <Section style={styles.overlay}>
        <Section style={styles.content}>
          <Image
            source={mainImage}
            style={{ width: 100, height: 100, marginBottom: 10, alignSelf: 'center' }}
          />
          <StyledText style={[fonts['Roboto-16-black-bold'], { textAlign: 'center' }]}>
            Perhatian
          </StyledText>
          <StyledText style={[fonts['Roboto-14-davysGrey'], { textAlign: 'center' }]}>
            {`Shipment ${shipmentNumber} tidak dapat diproses, ada DO yang belum di GI. Harap melakukan GI terlebih dahulu`}
          </StyledText>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <StyledText style={fonts['Roboto-14-white-bold']}>
              Ya, Saya mengerti!
            </StyledText>
          </TouchableOpacity>
        </Section>
      </Section>
    </Modal>
  );
}
