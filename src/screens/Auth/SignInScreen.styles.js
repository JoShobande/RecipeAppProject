import { StyleSheet } from 'react-native';
import { Colors, FontSizes, Fonts } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    fontWeight:'700',
    color: Colors.black,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: Fonts.regular,
    color: Colors.black,
    marginBottom: 30,
  },

  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: FontSizes.small,
    color: Colors.black,
    fontFamily: Fonts.regular,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  passwordInput:{
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  forgotPassword: {
    marginTop: 5,
    textAlign: 'right',
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.small,
  },

  signInButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.medium,
    fontWeight:'700'
  },

  orText: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.small,
    color: '#888',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:10
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.small,
    color: '#666',
  },
  footerLink: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.small,
    color: Colors.primary,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});
