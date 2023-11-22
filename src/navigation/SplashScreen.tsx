import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logo from '../assets/images/logo/mainlogo.png';
export const SplashScreen = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center align-middle ">
      <Image
        className="w-full"
        source={Logo}
        resizeMethod="resize"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
