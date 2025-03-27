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
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginBottom: 5,
    fontWeight:'700'
  },
  subtitle: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.regular,
    color: '#666',
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 15,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  termsText: {
    marginLeft: 8,
    fontSize: FontSizes.small,
    fontFamily: Fonts.regular,
    color: '#666',
  },

  signUpButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
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
    marginTop: 10
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    marginBottom: 10,
    color: Colors.black,
  },
  modalMessage: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    marginBottom: 20,
    color: Colors.black,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.medium,
    fontWeight:'700'
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
