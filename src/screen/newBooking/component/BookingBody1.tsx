import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import {Checkbox, DefaultTheme} from 'react-native-paper';

const BookingBody1 = ({
  setVisibleBody,
  manual,
  automatic,
  setAutomatic,
  setManual,
  clientName,
  setClientName,
  pickupLocations,
  setPickupLocations,
  name,
  setName,
  address1,
  setAddress1,
  address2,
  setAddress2,
  pincode,
  setPincode,
  mobileNumber,
  setMobileNumber,
  state,
  setState,
  email,
  setEmail,
  oda,
  setOda,
  saveAddressForFuture,
  setSaveAddressForFuture,
}: any) => {
  return (
    <View className="flex-1">
      <ScrollView>
        <View className="p-3">
          {/* <---------------newBooking -----------> */}
          <View className="border-[0.5px] rounded-[3px] border-[#013D9F]">
            {/* header */}
            <View className="p-2 bg-[#013D9F] rounded-[3px]">
              <Text className="text-white font-Calibri text-[16px]">
                New Booking
              </Text>
            </View>
            {/* header */}
            {/* checkbox */}
            <View className=" flex-row">
              <View className="flex-row items-center mr-4">
                <Checkbox
                  theme={DefaultTheme}
                  status={manual ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  onPress={() => {
                    setManual(!manual);
                    setAutomatic(false);
                  }}
                />
                <Text className="text-black font-Calibri text-[16px]">
                  Manual
                </Text>
              </View>
              <View className="flex-row items-center">
                <Checkbox
                  theme={DefaultTheme}
                  status={automatic ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  onPress={() => {
                    setAutomatic(!automatic);
                    setManual(false);
                  }}
                />
                <Text className="text-black font-Calibri text-[16px]">
                  Automatic
                </Text>
              </View>
            </View>
            {/* checkbox */}

            <View className="bg-[#E4E2E2] p-2 ml-2 mr-2 rounded-[3px]">
              <Text className="text-black font-Calibri text-[16px]">
                {' '}
                AWB Number
              </Text>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Client Name *
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={clientName}
                  onChangeText={text => {
                    console.log(text);
                    setClientName(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Pickup Locations
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={pickupLocations}
                  onChangeText={text => {
                    console.log(text);
                    setPickupLocations(text);
                  }}
                />
              </View>
            </View>
          </View>
          {/* <-------------- newBooking -----------> */}

          {/* <---------- Consignee Address ---------> */}
          <View className="border-[0.5px] rounded-[3px] border-[#013D9F] mt-4">
            {/* header */}
            <View className="p-2 bg-[#013D9F] rounded-[3px]">
              <Text className="text-white">Consignee Address</Text>
            </View>
            {/* header */}

            <View className="p-2 ">
              <View className="border-[0.5px] rounded-[3px] border-gray-400 h-[30px] justify-center">
                <Text className="opacity-40 ml-1 text-black font-Calibri text-[16px]">
                  {' '}
                  Choose Address
                </Text>
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Name *
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={name}
                  onChangeText={text => {
                    console.log(text);
                    setName(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Address Line 1 *
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={address1}
                  onChangeText={text => {
                    console.log(text);
                    setAddress1(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Address Line 2{' '}
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={address2}
                  onChangeText={text => {
                    console.log(text);
                    setAddress2(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Pincode *{' '}
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={pincode}
                  onChangeText={text => {
                    console.log(text);
                    setPincode(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Mobile Number *
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={mobileNumber}
                  onChangeText={text => {
                    console.log(text);
                    setMobileNumber(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">State</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={state}
                  onChangeText={text => {
                    console.log(text);
                    setState(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2">
              <Text className="text-black font-Calibri text-[16px]">
                Email{' '}
              </Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  className="font-Calibri text-[16px]"
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={email}
                  onChangeText={text => {
                    console.log(text);
                    setEmail(text);
                  }}
                />
              </View>
            </View>

            <View className="p-2 flex-row justify-between ">
              <View className="flex-row items-center mr-4">
                <Text className="text-black font-Calibri text-[16px]">ODA</Text>
                <Checkbox
                  status={oda ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  theme={DefaultTheme}
                  onPress={() => {
                    setOda(!oda);
                  }}
                />
              </View>

              <View className="flex-row items-center mr-4 ">
                <Checkbox
                  status={saveAddressForFuture ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  theme={DefaultTheme}
                  onPress={() => {
                    setSaveAddressForFuture(!saveAddressForFuture);
                  }}
                />
                <Text className="text-black font-Calibri text-[16px]">
                  Save Address for Future
                </Text>
              </View>
            </View>
          </View>
          {/* <---------- Consignee Address ---------> */}

          {/* <-------------- Footer ----------------> */}
          <View className="justify-center items-center mt-4 mb-4">
            <Pressable
              onPress={() => {
                setVisibleBody(2);
              }}
              className="justify-center items-center  w-[81px] h-[28px] rounded-[3px] bg-[#013D9F]">
              <Text className="text-white font-Calibri text-[16px]">Next</Text>
            </Pressable>
          </View>
          {/* <-------------- Footer ----------------> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingBody1;
