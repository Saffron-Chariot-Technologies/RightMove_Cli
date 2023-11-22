import React, {useState} from 'react';
import {TouchableOpacity, TouchableOpacityBase} from 'react-native';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  TouchableHighlight,
} from 'react-native';
import {IconButton} from 'react-native-paper';

const BookingHeader = ({
  courierActive,
  setCourierActive,
  expressActive,
  setExpressActive,
  cargoActive,
  setCargoActive,
}: any) => {
  return (
    <View className=" mt-2">
      <StatusBar backgroundColor="#013D9F" barStyle="light-content" />

      <View className="flex-row justify-between">
        {/* courier */}
        <Pressable
          onPress={() => {
            setCourierActive(true);
            setExpressActive(false);
            setCargoActive(false);
          }}
          className={`border-[0.5px]  flex-1 flex-row items-center justify-center rounded-[3px] mr-1 border-gray-400 ${
            courierActive ? `bg-[#013D9F] border-gray-0` : null
          }`}>
          <IconButton
            icon={'truck'}
            size={15}
            iconColor={courierActive ? 'white' : '#013D9F'}
          />
          <Text
            className={`${
              courierActive
                ? ` text-white text-[14px] font-Calibri`
                : `text-[14px] font-CalibriBold text-gray-500`
            } `}>
            COURIER
          </Text>
        </Pressable>
        {/* courier */}

        {/* Express */}
        <Pressable
          onPress={() => {
            setCourierActive(false);
            setExpressActive(true);
            setCargoActive(false);
          }}
          className={`border-[0.5px]  flex-1 flex-row items-center justify-center rounded-[3px] mr-1 border-gray-400 ${
            expressActive ? `bg-[#013D9F] border-gray-0` : null
          }`}>
          <IconButton
            icon={'truck-fast'}
            size={15}
            iconColor={expressActive ? 'white' : '#013D9F'}
          />
          <Text
            className={`${
              expressActive
                ? ` text-white text-[14px] font-Calibri`
                : `text-[14px] font-CalibriBold text-gray-500`
            } `}>
            EXPRESS
          </Text>
        </Pressable>
        {/* Express */}

        {/* CARGO */}
        <Pressable
          onPress={() => {
            setCourierActive(false);
            setExpressActive(false);
            setCargoActive(true);
          }}
          className={`border-[0.5px]  flex-1 flex-row items-center justify-center rounded-[3px] border-gray-400 ${
            cargoActive ? `bg-[#013D9F] border-gray-0` : null
          }`}>
          <IconButton
            icon={'airplane'}
            size={15}
            iconColor={cargoActive ? 'white' : '#013D9F'}
          />
          <Text
            className={`${
              cargoActive
                ? ` text-white text-[14px] font-Calibri`
                : `text-[14px] font-CalibriBold text-gray-500`
            } `}>
            CARGO
          </Text>
        </Pressable>
        {/* CARGO */}
      </View>

      {/* Banner */}
      <View className="mt-2 border-[0.5px] p-2 flex-row justify-between items-center border-gray-400">
        <TouchableOpacity className="h-[34px]">
          <Image
            resizeMode="contain"
            className="w-[60px] h-[34px] flex-1"
            source={require('../../../assets/images/booking/trackon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity className="h-[34px]">
          <Image
            resizeMode="contain"
            className="w-[60px] h-[12px] flex-1"
            source={require('../../../assets/images/booking/delhivery.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity className="h-[34px]">
          <Image
            resizeMode="contain"
            className="w-[59px] h-[12px] flex-1"
            source={require('../../../assets/images/booking/dtdc.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            className="w-[60px] h-[16px] flex-1"
            source={require('../../../assets/images/booking/professional.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            className="w-[60px] h-[16px] flex-1"
            source={require('../../../assets/images/booking/professional.png')}
          />
        </TouchableOpacity>
      </View>
      {/* Banner */}
    </View>
  );
};

export default BookingHeader;
