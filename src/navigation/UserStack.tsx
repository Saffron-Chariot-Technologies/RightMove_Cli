import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../type/common';
import MobileSignIn from '../screen/mobileSignIn/MobileSignIn';
import MyAccount from '../screen/myAccount/MyAccount';
import Order from '../screen/orders/Order';
import Test from '../screen/test';
import NewBooking from '../screen/newBooking/NewBooking';
import ServiceAbility from '../screen/serviceAbility/ServiceAbility';
import WayBills from '../screen/waybills/WayBills';
import Dispatch from '../screen/dispatch/DIspatch';
import Profile from '../screen/profile/Profile';
import Otp from '../screen/otp/OTP';
import Login from '../screen/login/Login';
import {AppFonts} from '../assets/fonts/AppFonts';
import {DispatchList} from '../screen/dispatch/DispatchList';

export const UserStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      // initialRouteName="Test"
      screenOptions={{
        animation: 'none',
        headerTitleStyle: {
          fontFamily: AppFonts.CalibriBold,
        },
      }}>
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MobileSignIn"
        component={MobileSignIn}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="MyAccount"
        component={MyAccount}
      />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="NewBooking" component={NewBooking} />
      <Stack.Screen name="ServiceAbility" component={ServiceAbility} />
      <Stack.Screen name="WayBills" component={WayBills} />
      <Stack.Screen name="Dispatch" component={Dispatch} />
      <Stack.Screen name="DispatchList" component={DispatchList} />

      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
