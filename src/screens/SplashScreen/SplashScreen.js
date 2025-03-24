// src/screens/SplashScreen.js
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import styles from './style'

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const handleStartCooking = () => {
    // Navigate to Sign In, Home, or wherever you want
    navigation.navigate('SignIn'); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash/splash.jpg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>
          <Text style={styles.topText}>100k+ Premium Recipe</Text>

          <Text style={styles.title}>Get Cooking</Text>

          <Text style={styles.subtitle}>
            Simple way to find Tasty Recipe
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleStartCooking}
          >
            <Text style={styles.buttonText}>Start Cooking  →</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

