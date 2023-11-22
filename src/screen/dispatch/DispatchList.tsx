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
import {DispatchDropDown} from '../../../utils/json/Temp';
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

export const DispatchList = () => {
  const [ResponseList, setResponseList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [value, setValue] = useState('1');
  const {token, username} = useSelector(state => state.AuthReducer);

  const getDispatchList = async e => {
    console.log('eeee', e);
    console.log(searchQuery);
    const res = await Axios.get(`dispatches/${e}/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data) {
      setResponseList(res.data?.entries);
    }
    console.log('get', res.data?.entries?.length);
  };
  useEffect(() => {}, []);

  return (
    <SafeAreaView className="bg-white flex-1 p-4">
      <View className="mt-4 border-[0.5px] rounded-[6px] border-[#00000080]">
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
              onChangeText={e => {
                setSearchQuery(e);
                setTimeout(() => {
                  if (e.trim()) {
                    getDispatchList(e);
                  }
                }, 500);
              }}
              placeholder="Search"
              height={35}
            />
          </View>
        </View>
      </View>

      {/* flatlist */}

      <FlatList
        data={ResponseList.slice(0, value * 10)}
        keyExtractor={(item: any) => item?.id}
        initialNumToRender={5}
        maxToRenderPerBatch={4}
        renderItem={({item, index}) => {
          return <DispatchFlatlist key={index} item={item} />;
        }}
      />
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
