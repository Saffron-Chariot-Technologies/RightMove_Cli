import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Text, View} from 'react-native';
import CustomText from '../../components/CustomText';
import {Button, Checkbox, DefaultTheme} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {DispatchDropDown, DispatchList} from '../../../utils/json/Temp';
import FloatingTextInput from '../../components/FloatingTextInput';
import {FlatList} from 'react-native';
import DispatchFlatlist from './list/DispatchFlatlist';
import Axios from '../../../utils/axios/Axios';
import {useAtom} from 'jotai';
import {tokenAtom} from '../../../utils/store/TokenStore';
import {useSelector} from 'react-redux';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {GStyle} from '../../components/GlobalStyle';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Dispatch = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [awbNumber, setAwbNumber] = useState('');
  const [isVehicleAdded, setIsVehicleAdded] = useState(false);
  const [DispatchResponse, setDispatchResponse] = useState(null);
  const [operationType, setOperationType] = useState('ADD_AWB');
  const {token, username} = useSelector(state => state.AuthReducer);
  // console.log('token', token);

  const addDispatch = async () => {
    const formData = new FormData();
    formData.append('vehicleNo', vehicleNumber);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const dispatchPost = await Axios.post(`dispatches`, formData, config);
    if (dispatchPost.status === 200) {
      setIsVehicleAdded(true);
      ToastAndroid.show('Dispatch Added', ToastAndroid.SHORT);
      setDispatchResponse(dispatchPost.data);
      Toast.show({
        type: 'success',
        text1: 'Vehicle No. Added',
      });
      console.log('dispatchPost', dispatchPost.data);
    } else {
      setIsVehicleAdded(false);
    }
  };

  const dispatchOperationCall = async () => {
    const formData = new FormData();
    formData.append('vehicleNo', vehicleNumber);
    console.log('dispatchOperation');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    formData.append('operationType', operationType);

    formData.append('awbNo', awbNumber);
    Axios.post(
      `dispatches/${DispatchResponse.dispatchNo}/operations`,
      formData,
      config,
    )
      .then(res => {
        console.log(res.data);
        ToastAndroid.show('Success', ToastAndroid.LONG);
        Toast.show({
          type: 'success',
          text1: 'Dispatch Added',
        });
      })
      .catch(err => {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        err.response.status == 412 &&
          Alert.alert('Error', err.response.data.error_description);
        err.response.status == 409 &&
          Alert.alert(
            'Awb no error',
            `${err.response.data.error_description} , do you want to increment the piece no.`,
            [
              {
                text: 'Yes',
                onPress: () => {
                  setOperationType('INCREMENT_PIECE');
                  // dispatchOperationCall();
                },
                style: 'cancel',
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
              onDismiss: () => {},
            },
          );
      });
  };
  const dispatchOperationCompleteCall = async () => {
    const formData = new FormData();
    if (!vehicleNumber) {
      Alert.alert('Error in getting vehicle number !');
      return;
    }
    formData.append('vehicleNo', vehicleNumber);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    formData.append('operationType', 'COMPLETE_DISPATCH');

    formData.append('awbNo', awbNumber);
    Axios.post(
      `dispatches/${DispatchResponse.dispatchNo}/operations`,
      formData,
      config,
    )
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Dispatch Completed',
        });
        setVehicleNumber('');
        setIsVehicleAdded(false);
        setOperationType('ADD_AWB');
        setDispatchResponse(null);
        setAwbNumber('');
        console.log(res.data);
        ToastAndroid.show('Success', ToastAndroid.LONG);
      })
      .catch(err => {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        err.response.status == 412 &&
          Alert.alert('Error', err.response.data.error_description);
        err.response.status == 409 &&
          Alert.alert(
            'Awb no error',
            `${err.response.data.error_description} , do you want to increment the piece no.`,
            [
              {
                text: 'Yes',
                onPress: () => {
                  setOperationType('INCREMENT_PIECE');
                  // dispatchOperationCall();
                },
                style: 'cancel',
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
              onDismiss: () => {},
            },
          );
      });
  };

  const check = !DispatchResponse || !awbNumber;
  const {navigate} = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1 p-4">
      {/* head */}
      <View style={{zIndex: 100}} className={'w-full'}>
        <Toast visibilityTime={2000} />
      </View>
      <View>
        <CustomText
          text="Vehicle Number:"
          classNames="font-CalibriBold text-[16px] ml-2"
        />
        <View className="items-center mt-2 flex-row justify-between">
          <TextInput
            editable={!isVehicleAdded}
            className="bg-[#EAE7E7] w-[70%] font-Calibri text-[15px] rounded-[32px] text-black p-2  "
            placeholder="Enter Vehicle Number"
            placeholderTextColor={'#00000080'}
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
          />
          <Button
            disabled={isVehicleAdded || vehicleNumber.length === 0}
            className={'bg-[#013D9F] rounded-[6px] w-[10%]'}
            textColor="white"
            onPress={addDispatch}>
            <Text className="font-CalibriBold text-[18px]">Add</Text>
          </Button>
        </View>
        <Text className="text-green-500 mt-2 font-thin text[12px text-center">
          {isVehicleAdded && 'Vehicle number added'}
        </Text>

        <CustomText
          text="AWB Number"
          classNames="font-CalibriBold text-[16px]  ml-2 mt-4"
        />

        <TextInput
          className="bg-[#EAE7E7] mt-2 font-Calibri text-[15px] rounded-[32px] text-black p-2 "
          placeholder="Enter AWB Number"
          placeholderTextColor={'#00000080'}
          value={awbNumber}
          onChangeText={setAwbNumber}
        />

        <View className="justify-center  items-center mt-6">
          <Button
            className="bg-[#013D9F]  rounded-[6px] w-[50%]"
            textColor="white"
            disabled={check}
            onPress={dispatchOperationCall}
            mode="contained">
            <Text className="font-Calibri text-[15px]">Submit</Text>
          </Button>

          <Button
            className="bg-[#019f75] mt-10 h-16 flex justify-center align-middle items-center rounded-[6px] w-[70%]"
            textColor="white"
            disabled={check}
            onPress={() => {
              Alert.alert(
                'Complete Dispatch',
                `do you want to complete dispatch ?`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      dispatchOperationCompleteCall();
                    },
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () => {},
                },
              );
            }}>
            <Text className="font-CalibriBold text-[22px]">
              Dispatch Complete
            </Text>
          </Button>

          <TouchableOpacity
            onPress={() => {
              navigate('DispatchList');
            }}>
            <CustomText
              text="Dispatch List"
              classNames="font-CalibriBold text-[16px] text-[#013D9F] underline ml-2 mt-16"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* head */}

      {/* body */}
      {/* <View className="mt-4 border-[0.5px] rounded-[6px] border-[#00000080]">
        <View className="bg-[#013D9F] p-1.5 rounded-[6px]">
          <CustomText
            text="Dispatch Result"
            classNames="text-center font-Calibri text-[17px] text-white"
          />
        </View>
        <View className="flex-row justify-between">
          <View className="p-2 flex-row justify-between items-center w-[50%]">
            <CustomText
              text="Show"
              classNames="opacity-50 font-Calibri text-[14px]"
            />
            <Dropdown
              data={DispatchDropDown}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{
                color: 'black',
                fontSize: 12,
                fontFamily: AppFonts.CalibriRegular,
              }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
            <CustomText
              text="Entries"
              classNames="opacity-50 font-Calibri text-[14px]"
            />
          </View>
          <View className="w-[40%] mr-2 ">
            <FloatingTextInput
              iconName="magnify"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search"
              height={35}
            />
          </View>
        </View>
      </View> */}

      {/* flatlist */}

      {/* <FlatList
        data={ResponseList}
        keyExtractor={(item: any) => item?.id}
        renderItem={({item, index}) => {
          return <DispatchFlatlist key={index} item={item} />;
        }}
      /> */}

      {/* flatlist */}
      {/* body */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxText: {
    color: 'white',
    fontSize: 16,
    fontFamily: AppFonts.CalibriRegular,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#6495ED',
  },
  dropdown: {
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 2,
    width: 50,
    height: 25,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'black',
    fontFamily: AppFonts.CalibriRegular,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: 'black',
    fontFamily: AppFonts.CalibriRegular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

export default Dispatch;
