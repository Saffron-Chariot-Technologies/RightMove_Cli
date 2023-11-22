import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Checkbox as PaperBox, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import moment from 'moment';
import {TouchableHighlight} from 'react-native';

const List = ({
  items,
  selected,
  onPress,
  onLongPress,
  handleLabel,
  handleReceipt,
  selectedItems,
  loading,
}: any) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        className={`flex-row border-[0.3px] items-center `}
        style={[selected && styles.selectedItem]}>
        <View className="w-[10%]">
          {selected ? (
            <>
              <View>
                <PaperBox
                  status={selected ? 'checked' : 'unchecked'}
                  color="#013D9F"
                  uncheckedColor="#000000"
                />
              </View>
            </>
          ) : (
            <View>
              <PaperBox
                status={'unchecked'}
                // color="#013D9F"
                onPress={onLongPress}
                uncheckedColor="#000000"
              />
            </View>
          )}
        </View>
        <View className=" w-[16%] mx-1">
          <Text className="text-[16px] font-Calibri opacity-70 text-black">
            {/* {moment(items?.OderDate).toISOString()} */}
            {items?.OderDate.slice(0, 5)}/{items?.OderDate.slice(8, 10)}
          </Text>
        </View>
        <View className=" flex-1">
          <Text
            selectable
            className="text-[16px] font-Calibri opacity-70 text-black">
            {items?.WaybillNo}
          </Text>
        </View>
        <View className=" flex-1 ">
          <Text className="text-[16px] font-Calibri opacity-70  text-center text-black">
            {items?.ClientName}
          </Text>
        </View>
        <View className="flex-1 flex-row p-2">
          <TouchableHighlight
            onPress={() => {
              // console.log({
              //   selectedItem: selectedItems?.length,
              //   isSelected: selected,
              // })
              handleLabel(selected ? selectedItems : [items]);
            }}
            className="border-[1px] flex-1 p-1  border-[0.5px] rounded-[63px] items-center mr-2 justify-center">
            <Image
              resizeMode="contain"
              className="w-[20px] h-[20px]"
              source={require('../../../assets/images/order/chain.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              // console.log({
              //   selectedItem: selectedItems?.length,
              //   isSelected: selected,
              // })
              handleReceipt(selected ? selectedItems : [items]);
            }}
            className="border-[1px] flex-1 p-1  border-[0.5px] rounded-[63px] items-center mr-2 justify-center">
            <Image
              resizeMode="contain"
              className="w-[20px] h-[20px]"
              source={require('../../../assets/images/order/chain.png')}
            />
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    </View>
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
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 0.5,
    borderRadius: 32,
    padding: 4,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: AppFonts.CalibriRegular,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: AppFonts.CalibriRegular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: AppFonts.CalibriRegular,
  },
});

export default List;
