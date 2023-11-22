// @ts-nocheck
//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// create a component
const ServiceAbility = () => {
  const Data = [
    {
      id: 1,
      title: 'COURIER',
    },
    {id: 2, title: 'PINCODE'},
    {id: 3, title: 'CITY'},
    {id: 4, title: 'STATE'},
    {id: 5, title: 'SERVICEABILITY'},
    {id: 6, title: 'PRE-PAID'},
    {id: 7, title: 'TOPAY/COD'},
    {id: 8, title: 'ODA'},
  ];
  const ListRender = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '50%',
          marginTop: 18,
        }}>
        <Text
          className=" font-Calibri text-[16px] text-black"
          tyle={{fontSize: 12, fontWeight: '600'}}>
          {item.title}
        </Text>
        <Text
          className=" font-Calibri text-[16px] text-black"
          style={{fontSize: 14, fontWeight: '600'}}>
          -
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <TextInput
          style={{
            borderBottomWidth: 1,
            padding: 10,
            borderColor: '#fff',
            width: '70%',
            color: 'white',
          }}
          placeholderTextColor={'#fff'}
          placeholder={'Enter pincode........'}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 18,
            width: '40%',
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text className=" font-Calibri text-[16px] text-black">
            Check service
          </Text>
        </TouchableOpacity>
      </View>

      <View className=" flex-1 bg-white rounded-t-3xl  p-[20]">
        <Text className="text-3xl mt-[15]  text-center   font-CalibriBold text-[#013D9F]">
          Track Status
        </Text>

        <FlatList data={Data} renderItem={ListRender} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013D9F',
  },
});

//make this component available to the app
export default ServiceAbility;
