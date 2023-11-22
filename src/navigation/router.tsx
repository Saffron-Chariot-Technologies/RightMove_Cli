import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../type/common';
import {useDispatch, useSelector} from 'react-redux';
import {UserStack} from './UserStack';
import {LoginStack} from './LoginStack';
import {SetUserDataAction} from '../redux/auth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {keys} from '../../utils/storage/Storage';
import SplashScreen from './SplashScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNav = () => {
  const {token, isSplashLoading, username} = useSelector(
    state => state.AuthReducer,
  );
  const dispatch = useDispatch();
  const getToken = async () => {
    const t = await AsyncStorage.getItem(keys.userToken);
    const u = await AsyncStorage.getItem('username');
    dispatch(SetUserDataAction({token: t?.replaceAll('"', ''), username: u}));
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Test"
        screenOptions={{
          animation: 'none',
          headerShown: false,
        }}>
        {isSplashLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          <>
            {token ? (
              <Stack.Screen children={UserStack} name="UserStack" />
            ) : (
              <Stack.Screen children={LoginStack} name="LoginStack" />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
