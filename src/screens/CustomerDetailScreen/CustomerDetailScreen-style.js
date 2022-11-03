import { StyleSheet } from 'react-native';

import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingBottom: 14,
    marginBottom: 6,
    borderBottomWidth: 10,
    borderColor: colors.cultured
  },
  inverseButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 6
  },
  bottomOverlay: {
    position: 'absolute',
    flexDirection: 'column',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 500,
    justifyContent: 'flex-end'
  },
  bottomModalContent: {
    padding: 14,
    backgroundColor: 'white',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    flexDirection: 'column'
  },
  bottomContent: {
    flexDirection: 'column',
    marginBottom: 14,
    alignItems: 'center'
  },
  button: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },
  disabledButton: {
    borderColor: colors.silver
  },
  disabledText: {
    color: colors.silver
  },

  photoSection: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.lightGray
  },
  buttonSection: {
    flexDirection: 'column',
    paddingBottom: 14
  },
  img: {
    width: 18,
    height: 18,
    marginLeft: 6
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    zIndex: 100
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 14,
    paddingTop: 14,
    flexDirection: 'column',
    paddingBottom: 14
  },
  modalCenterContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 24,
    marginHorizontal: 24
  },
  iconButton: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    minHeight: 40,
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: 'row'
  },
  overlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 2000
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 24,
    paddingHorizontal: 10,
    marginTop: 100
  },
  reasonsContainer: {
    width: '80%',
    height: '45%',
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 10
  },
  reasonChoice: {
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderColor: colors.lightGray
  }
});

export default styles;
