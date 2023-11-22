// @ts-nocheck
//import liraries
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SetUserDataAction} from '../../redux/auth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppFonts} from '../../assets/fonts/AppFonts';

// create a component
const Profile = () => {
  const Data = [
    {id: 1, title: 'Edit Profile'},
    {id: 2, title: 'Privacy'},
    {id: 3, title: 'Settings'},
    {id: 4, title: 'Your Orders'},
    {id: 5, title: 'Invite A Frand'},
    {id: 6, title: 'Help'},
    {id: 7, title: 'Log Out'},
  ];
  const dispatch = useDispatch();
  const ListRender = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 22,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: item.id == 7 ? 'red' : 'black',
            fontFamily: AppFonts.CalibriRegular,
          }}>
          {item.title}
        </Text>
        <AntDesignIcon
          onPress={() => {
            if (index === 6) {
              dispatch(SetUserDataAction({token: null, username: ''}));
              AsyncStorage.clear();
            }
          }}
          name="right"
          size={20}
          color="black"
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#013D9F" barStyle="light-content" />

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          height: 150,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: AppFonts.CalibriRegular,
            color: '#fff',
          }}>
          Profile
        </Text>
        <Image source={require('../../assets/images/profile/edit.png')} />
      </View>

      <View className=" flex-1 bg-white rounded-t-3xl items-center">
        <Image
          source={require('../../assets/images/profile/profile.png')}
          style={{marginTop: -100}}
        />
        <Text className="text-4xl  text-center   font-CalibriBold text-PrimaryColor">
          RIGHTMOVE
        </Text>
        <Text className="text-base  font-Calibri text-center  text-content">
          b-1-Canada
        </Text>
        <View className="mt-[30] px-[20]">
          <FlatList data={Data} renderItem={ListRender} />
        </View>
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
export default Profile;
