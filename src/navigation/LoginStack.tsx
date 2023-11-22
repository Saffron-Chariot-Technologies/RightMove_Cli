import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../type/common';
import MobileSignIn from '../screen/mobileSignIn/MobileSignIn';
import Otp from '../screen/otp/OTP';
import Login from '../screen/login/Login';

export const LoginStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      // initialRouteName="Test"
      screenOptions={{animation: 'none'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MobileSignIn"
        component={MobileSignIn}
      />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
