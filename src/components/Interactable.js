import React, { Component } from 'react';
import {
  PanResponder,
  StyleSheet,
  Animated,
  StatusBar,
  Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import PropTypes from 'prop-types';

import colors from '../themes/colors';

import { deviceHeight } from '../utils/platform';

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'column',
    zIndex: 10000
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  draggableContainer: {
    backgroundColor: 'transparent',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1
  }
});

const STATUS = {
  CLOSED: 0,
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3
};

const GESTURE_THRESHOLD = 100;
const HEADER_HEIGHT = 44;

function getSmallPanelHeight() {
  const draggableHeight = 30;
  const deviceBrand = DeviceInfo.getBrand();

  let smallPanelHeight = 0;
  if (Platform.OS === 'android') {
    const hasNotch = Math.round(StatusBar.currentHeight) > 25;
    if (hasNotch) {
      smallPanelHeight = (deviceHeight * 0.95);
    } else if (deviceBrand.toUpperCase() === 'ASUS') {
      smallPanelHeight = deviceHeight - (draggableHeight + StatusBar.currentHeight - HEADER_HEIGHT);
    } else {
      smallPanelHeight = deviceHeight - (draggableHeight + StatusBar.currentHeight);
    }
  }
  return smallPanelHeight;
}

export default class Interactable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerTop: deviceHeight * 0.4,
      pan: new Animated.ValueXY({ x: 0, y: deviceHeight - HEADER_HEIGHT }),
      panelLargeHeight: deviceHeight - HEADER_HEIGHT,
      panelSmallHeight: getSmallPanelHeight(),
      panelMediumHeight: deviceHeight * 0.4,
      status: STATUS.MEDIUM
    };

    this.pan = new Animated.ValueXY({ x: 0, y: deviceHeight - HEADER_HEIGHT });
    this.animatedValueY = 0;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: 0,
          y: this.animatedValueY
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: (evt, gestureState) => {
        const { moveY, dy } = gestureState;
        const { panelSmallHeight } = this.state;
        let newTop = moveY - 17;
        if (newTop <= 0) {
          newTop = 0;
        } else if (newTop > (deviceHeight - (96 - HEADER_HEIGHT))) {
          newTop = panelSmallHeight;
        }

        this.state.pan.setValue({
          x: 0,
          y: dy
        });

        this.setState({
          containerTop: newTop
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { moveY, dy, vy } = gestureState;
        const { panelMediumHeight, status } = this.state;
        this.state.pan.flattenOffset();

        if (dy === 0) {
          this.animateTo(status);
        } else if (dy < -GESTURE_THRESHOLD || vy < -0.5) {
          // swipe up
          if (status === STATUS.MEDIUM) {
            this.animateTo(STATUS.LARGE);
          } else if (status === STATUS.SMALL) {
            if (moveY < panelMediumHeight) {
              this.animateTo(STATUS.LARGE);
            } else {
              this.animateTo(STATUS.MEDIUM);
            }
          } else {
            this.animateTo(STATUS.MEDIUM);
          }
        } else if (dy > GESTURE_THRESHOLD || vy > 0.5) {
          // swipe down
          if (status === STATUS.MEDIUM) {
            this.animateTo(STATUS.SMALL);
          } else if (status === STATUS.LARGE) {
            if (dy < (panelMediumHeight + panelMediumHeight / 2 + HEADER_HEIGHT) && dy > (panelMediumHeight - panelMediumHeight / 2 - HEADER_HEIGHT)) {
              this.animateTo(STATUS.MEDIUM);
            } else {
              this.animateTo(STATUS.SMALL);
            }
          } else {
            this.animateTo(STATUS.MEDIUM);
          }
        } else {
          this.animateTo(status);
        }
      }
    });
  }

  componentDidMount = () => {
    this.animatedValueY = 0;
    this.state.pan.y.addListener((value) => (this.animatedValueY = value.value));
  };

  animateTo = (newStatus = 2) => {
    let newY = 0;

    switch (newStatus) {
      case 0:
        newY = 0;
        break;
      case 1:
        newY = this.state.panelSmallHeight;
        break;
      case 2:
        newY = this.state.panelMediumHeight;
        break;
      case 3:
        newY = HEADER_HEIGHT;
        break;
      default:
        newY = HEADER_HEIGHT;
    }
    this.setState({
      status: newStatus,
      containerTop: newY
    });

    // Animated.parallel([
    //   Animated.spring(this.state.pan, {
    //     friction: 25,
    //     tension: 80,
    //     toValue: { x: 0, y: newY },
    //     useNativeDriver: true
    //   })
    // ]).start();
  }

  render() {
    const {
      containerTop
    } = this.state;
    const { children } = this.props;

    return (
      <Animated.View
        style={[
          styles.allContainer,
          { top: containerTop }
        ]}
      >
        <Animated.View style={styles.container}>
          <Animated.View
            {...this._panResponder.panHandlers}
            style={styles.draggableContainer}
          >
            <Animated.View style={{ height: 2, width: 60, backgroundColor: colors.gainsboro, borderRadius: 1 }} />
          </Animated.View>
          <Animated.View style={styles.contentContainer}>
            {children}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

Interactable.propTypes = {
  children: PropTypes.instanceOf(Object)
};
