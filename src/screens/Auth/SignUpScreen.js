import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import CheckBox from 'expo-checkbox'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import styles from './SignUpScreen.styles';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { signUp } = useAuthContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z]+$/;
  const passwordRegex = /[A-Za-z]/;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const validateFields = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }
    if (!nameRegex.test(firstName)) {
      Alert.alert('Validation Error', 'First Name must contain only letters.');
      return false;
    }
    if (!nameRegex.test(lastName)) {
      Alert.alert('Validation Error', 'Last Name must contain only letters.');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert('Validation Error', 'Password must contain at least one letter.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return false;
    }
    if (!acceptTerms) {
      Alert.alert('Validation Error', 'You must accept the terms & conditions.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateFields()) return;
    setIsLoading(true);
    try {
      // Pass firstName and lastName to signUp.
      await signUp(email, password, firstName, lastName);
      setIsModalVisible(true);
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToSignIn = async () => {
    setIsModalVisible(false);
    navigation.navigate('SignIn');
  };

  const handleSignInNavigation = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>
        Let’s help you set up your account, it won’t take long.
      </Text>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          placeholderTextColor="#aaa"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      {/* Last Name Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          placeholderTextColor="#aaa"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>


      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
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

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, { flex: 1 }]}
            placeholder="Re-type Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(prev => !prev)}>
            <Ionicons
              name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Accept Terms */}
      <View style={styles.termsContainer}>
        <CheckBox
          value={acceptTerms}
          onValueChange={setAcceptTerms}
          color={acceptTerms ? '#16a34a' : undefined}
          style={styles.checkbox}
        />
        <Text style={styles.termsText}>Accept terms & condition</Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already a member? </Text>
        <TouchableOpacity onPress={handleSignInNavigation}>
          <Text style={styles.footerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Up Successful!</Text>
            <Text style={styles.modalMessage}>
              Your account has been created successfully. Please click the button below to sign in.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleGoToSignIn}>
              <Text style={styles.modalButtonText}>Go to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
