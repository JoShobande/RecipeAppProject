import { StyleSheet, Dimensions } from 'react-native';
import { Colors, FontSizes, Fonts } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  imageBackground: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
    zIndex: 2,
  },
  topText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    marginBottom: 5,
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.xlarge,
    fontFamily: Fonts.bold,
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontFamily: Fonts.regular,
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
  },
});
