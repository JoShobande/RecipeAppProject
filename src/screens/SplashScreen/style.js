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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  contentContainer: {
    flex: 1,
  },
  topWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  middleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 40,
  },

  topText: {
    color: Colors.white,
    fontSize: 18, 
    fontFamily: Fonts.bold,
    fontWeight:'700',
  },
  title: {
    color: Colors.white,
    fontSize: 50, 
    fontFamily: Fonts.bold,
    fontWeight:'700',
    marginBottom: 10,
    marginBottom:0,
    marginTop: 0
  },
  subtitle: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    fontWeight:'700',
    marginTop: 10,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
    fontWeight:'700',
  },
  hatImage: {
    width: 100,  
    height: 100,
    marginBottom: 10,
  },
});
