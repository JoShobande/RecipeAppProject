import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import SignUpSuccessScreen from '../screens/Auth/SignUpSuccess';

const AuthStack = createStackNavigator();

export default function AuthNavigator({ initialRouteName }) {
  return (
    <AuthStack.Navigator initialRouteName={initialRouteName}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="SignUpSuccess"
        component={SignUpSuccessScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
