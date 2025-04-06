import { StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: FontSizes.medium,
  },
  ingredientsList: {
    marginTop: 10,
  },
  ingredientItem: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.text,
    marginBottom: 5,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
  },
  // Styles for the dropdown picker
  dropdown: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
});
