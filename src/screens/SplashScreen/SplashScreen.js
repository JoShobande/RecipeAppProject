import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import styles from './style'

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const handleStartCooking = () => {
    navigation?.navigate('SignIn'); 
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
          <View style={styles.topWrapper}>
            <Image
              source={require('../../../assets/images/splash/chefhat.png')}
              style={styles.hatImage}
              resizeMode="contain"
            />
            <Text style={styles.topText}>100K+ Premium Recipe</Text>
          </View>

          <View style={styles.middleWrapper}>
            <Text style={styles.title}>Get</Text> 
            <Text style={styles.title}>Cooking</Text>
            <Text style={styles.subtitle}>Simple way to find Tasty Recipe</Text>
          </View>

          <View style={styles.bottomWrapper}>
            <TouchableOpacity style={styles.button} onPress={handleStartCooking}>
              <Text style={styles.buttonText}>Start Cooking →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

