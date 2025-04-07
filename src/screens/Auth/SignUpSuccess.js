import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthContext';
import { Colors, Fonts, FontSizes } from '../../constants/theme';

export default function SignUpSuccessScreen() {
  const navigation = useNavigation();
  const { setSignUpSuccess } = useAuthContext();

 
  useEffect(() => {
    setSignUpSuccess(false);
  }, []);

  const handleGoToSignIn = () => {
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Successful!</Text>
      <Text style={styles.message}>
        Your account has been created successfully.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToSignIn}>
        <Text style={styles.buttonText}>Go to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
  },
});
