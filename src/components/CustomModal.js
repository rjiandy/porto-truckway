import React from 'react';
import { Image, Modal } from 'react-native';
import PropTypes from 'prop-types';

import { deviceWidth } from '../utils/platform';

import Col from './Col';
import StyledText from './StyledText';
import Section from './Section';
import PrimaryButton from './PrimaryButton';

// import colors from '../themes/colors';

import styles from './styles/CustomModal-style';

const CustomModal = (props) => {
  const {
    title,
    subtitle,
    isVisible,
    primaryButtonText,
    primaryButtonOnPress,
    img,
    customTitleContainerStyle,
    customTitleStyle,
    onRequestClose
  } = props;

  const imgHeight = deviceWidth <= 320 ? 70 : 150;
  const imgWidth = deviceWidth <= 320 ? 90 : 190;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <Section style={styles.containerBackground}>
        <Col style={[styles.containerModal]}>
          <Section style={{ alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              source={img}
              style={{ height: imgHeight, width: imgWidth }}
            />
          </Section>
          <Section style={[styles.titleContainer, customTitleContainerStyle]}>
            <StyledText font="Roboto-16-black-bold" style={[styles.title, customTitleStyle]}>{title}</StyledText>
            {subtitle && (
              <Section style={{ paddingTop: 4 }}>
                <StyledText
                  font={deviceWidth <= 320 ? 'Roboto-12' : 'Roboto-14'}
                  style={{ textAlign: 'center' }}
                >
                  {subtitle}
                </StyledText>
              </Section>
            )}
          </Section>
          <Section style={styles.containerButton}>
            <PrimaryButton
              label={primaryButtonText}
              style={{ width: deviceWidth * 0.6, height: 30 }}
              // isLoading={isLoading}
              onPress={primaryButtonOnPress}
            />
          </Section>
        </Col>
      </Section>
    </Modal>
  );
};

export default CustomModal;

CustomModal.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  customTitleContainerStyle: PropTypes.instanceOf(Object),
  customTitleStyle: PropTypes.instanceOf(Object),
  img: PropTypes.number,
  isVisible: PropTypes.bool,
  primaryButtonText: PropTypes.string,
  primaryButtonOnPress: PropTypes.func,
  onRequestClose: PropTypes.func
};

CustomModal.defaultProps = {
  onRequestClose: () => console.log('on request close')
};
