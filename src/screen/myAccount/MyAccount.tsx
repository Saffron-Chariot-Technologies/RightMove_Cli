// @ts-nocheck
import React, {useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  FlatList,
  BackHandler,
  Alert,
  AppState,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../type/common';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SetUserDataAction} from '../../redux/auth.reducer';

const MyAccount = ({route}: any) => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
  >;
  const navigation = useNavigation<loginScreenProps>();
  const {token, isSplashLoading, username} = useSelector(
    state => state.AuthReducer,
  );
  const dispatch = useDispatch();

  const NextScreen = gohome => {
    if (gohome == 'Order') {
      navigation.navigate('Order', {username});
    } else {
      navigation.navigate(gohome);
      console.log(gohome);
    }
  };

  const ListData = [
    {
      id: 1,

      icon: <AntDesignIcon name="filetext1" size={35} color="#013D9F" />,
      title: 'Your Orders',
      route: 'Order',
    },
    {
      id: 2,
      icon: <FeatherIcon name="folder-plus" size={35} color="#013D9F" />,
      title: 'New Booking',
      route: 'NewBooking',
    },
    {
      id: 3,
      icon: (
        <MaterialCommunityIcons
          name="truck-fast-outline"
          size={35}
          color="#013D9F"
        />
      ),
      title: 'Dispatch',
      route: 'Dispatch',
    },
    {
      id: 4,

      icon: <AntDesignIcon name="setting" size={35} color="#013D9F" />,
      title: 'Serviceability',
      route: 'ServiceAbility',
    },
    {
      id: 5,
      icon: <AntDesignIcon name="setting" size={35} color="#013D9F" />,
      title: 'Settings',
      route: 'Setting',
    },
    {
      id: 6,
      icon: <FontAwesomeIcon name="user-circle-o" size={35} color="#013D9F" />,
      title: 'Profile',
      route: 'Profile',
    },
  ];

  const ListUi = ({item}: {item: (typeof ListData)[0]}) => {
    return (
      <TouchableOpacity
        onPress={() => NextScreen(item.route)}
        className=" w-[30%] h-[110px] bg-white mt-[40px] ml-12  rounded-lg items-center justify-center">
        {item.icon}
        <Text className="text-[16px] font-CalibriBold text-center mt-2 text-black">
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              dispatch(SetUserDataAction({token: null, username: ''}));
              AsyncStorage.clear();
              // logout()
              // navigation.push('LoginStack', {screen: 'Login'});
            },
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <SafeAreaView className="flex-1  bg-white">
      <StatusBar barStyle={'dark-content'} backgroundColor="#FFFF" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className="h-36 justify-center  ">
          <Pressable>
            <Image
              className="w-80  h-24 self-center"
              source={require('../../assets/images/logo/mainlogo.png')}
            />
          </Pressable>
        </View>

        <View className=" flex-1 bg-[#013D9F] rounded-t-3xl pb-10">
          <Text className="text-3xl font-CalibriBold text-white text-center mt-10">
            My Account
          </Text>
          <ImageBackground
            className=" w-[100%] h-[267] absolute bottom-0"
            source={require('../../assets/images/background/bgblue.png')}></ImageBackground>

          <View>
            <FlatList
              data={ListData}
              renderItem={ListUi}
              numColumns={2}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccount;
