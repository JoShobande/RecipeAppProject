import React, { useState, useEffect } from 'react';
import RootNavigation from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaView, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Poppins_Regular: Poppins_400Regular,
      Poppins_Bold: Poppins_700Bold,
    });
  };

  useEffect(() => {
    (async () => {
      await loadFonts();
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    })();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <RootNavigation />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
