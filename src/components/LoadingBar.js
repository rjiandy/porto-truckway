/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';

import colors from '../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blackTransparent,
    flex: 1,
    justifyContent: 'center'
  },
  progress: {
    margin: 10
  }
});

function LoadingBar(props) {
  const { visible } = props;

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      animate();
    }
  }, [visible]);

  useEffect(() => {
    if (progress === 1) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [progress]);

  useEffect(() => {
    if (isLoading) {
      if (progress >= 0.9 && visible === false) {
        finish();
      }
    }
  }, [visible, progress]);

  const animate = () => {
    let localProgress = 0;
    setProgress(localProgress);
    setTimeout(() => {
      const interval = setInterval(() => {
        const randomNum = Math.random() / 5;
        if (localProgress > 0.9) {
          setProgress(0.9);
        } else {
          if (localProgress + randomNum > 0.9) {
            localProgress = 0.9;
            clearInterval(interval);
          } else {
            localProgress += randomNum;
          }
          setProgress(localProgress);
        }
      }, 500);
    }, 1000);
  };

  const finish = () => {
    let localProgress = progress;
    setTimeout(() => {
      const interval = setInterval(() => {
        const randomNumber = Math.random() / 5;
        if (localProgress >= 1) {
          setProgress(1);
          setIsLoading(false);
          clearInterval(interval);
        } else {
          localProgress += randomNumber;
        }
        setProgress(localProgress);
      }, 500);
    }, 500);
  };

  return (
    <Modal
      style={[
        styles.container
      ]}
      onRequestClose={() => console.log('onRequestClose')}
      animationType="fade"
      transparent
      visible={isLoading}
    >
      <View style={[styles.circles]}>
        <Progress.Circle
          style={styles.progress}
          progress={progress}
          indeterminate={false}
          showsText
          size={80}
          color={colors.white}
        />
      </View>
    </Modal>
  );
}

LoadingBar.propTypes = {
  visible: PropTypes.bool,
  setParentDisplay: PropTypes.func,
  setLoadingParent: PropTypes.func
};

function mapStateToProps(state) {
  return {
    visible: state.shipmentPlanStore.isLoading
  };
}

export default connect(mapStateToProps)(LoadingBar);
