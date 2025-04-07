import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import { useAuthContext } from '../context/AuthContext';

export default function RootNavigation() {
  const { user } = useAuthContext();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <MainNavigator />
      ) : (
        <AuthNavigator initialRouteName="SignIn" />
      )}
    </NavigationContainer>
  );
}
