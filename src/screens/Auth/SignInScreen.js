import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import styles from './SignInScreen.styles';
import { Colors, Fonts, FontSizes } from '../../constants/theme';


export default function SignInScreen() {
  const navigation = useNavigation();
  const { signIn, signUpSuccess, setSignUpSuccess } = useAuthContext(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (signUpSuccess) {
      setShowSuccessModal(true);
    }
  }, [signUpSuccess]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setSignUpSuccess(false);
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Validation Error', 'Both email and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Sign In Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSignUpNavigation = () => {
    navigation?.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>Hello,</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, { flex: 1 }]}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(prev => !prev)}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={handleSignUpNavigation}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Sign Up Successful!</Text>
            <Text style={modalStyles.modalMessage}>
              Your account has been created successfully. Please sign in.
            </Text>
            <TouchableOpacity style={modalStyles.modalButton} onPress={handleCloseModal}>
              <Text style={modalStyles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
  },
});
