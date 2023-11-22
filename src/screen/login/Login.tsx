import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import {TextInput, DefaultTheme, Button} from 'react-native-paper';
import FloatingTextInput from '../../components/FloatingTextInput';
import CustomText from '../../components/CustomText';
import Axios from '../../../utils/axios/Axios';
import {tokenAtom} from '../../../utils/store/TokenStore';
import {useAtom} from 'jotai';
import {keys, storeData} from '../../../utils/storage/Storage';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '../../type/common';
import {useDispatch} from 'react-redux';
import {SetUserDataAction} from '../../redux/auth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppFonts} from '../../assets/fonts/AppFonts';

const Login = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
  >;
  const navigation = useNavigation<loginScreenProps>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [promt, setPrompt] = useState(false);
  const [token, setToken] = useAtom(tokenAtom);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);
    setPrompt(false);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.append('Username', username);
      formData.append('Password', password);

      const res = await Axios.post('login', formData, config);

      if (res?.data) {
        const parsedData = JSON.parse(res.data.replace(/'/g, '"'));
        console.log(parsedData?.jwt);
        setToken(parsedData?.jwt);
        storeData({key: keys?.userToken, value: parsedData?.jwt});
        AsyncStorage.setItem('username', username);
        setLoading(false);
        dispatch(
          SetUserDataAction({
            token: parsedData?.jwt.replaceAll('"', ''),
            username: username,
          }),
        );

        // navigation.navigate('MyAccount', {username: username});
      }
    } catch (error: any) {
      setLoading(false);
      console.log({error: error});
      console.log({error: error?.response?.data});
      Toast.show({
        type: 'error',
        text1: 'Incorrect Credential',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-buttonText">
      <StatusBar backgroundColor="#013D9F" />
      <View style={{zIndex: 100}} className={'w-full'}>
        <Toast visibilityTime={2000} />
      </View>
      <View className="flex-1">
        <ImageBackground
          className="flex-1"
          source={require('../../assets/images/background/loginBackground.png')}>
          <View className="h-44 justify-center items-center">
            <Image
              resizeMode="contain"
              className="w-[349px] h-[102px]"
              source={require('../../assets/images/logo/mainlogo.png')}
            />
          </View>

          <View className=" flex-1 bg-white rounded-t-3xl  p-6 ">
            <CustomText
              classNames="text-4xl mt-[15] text-center font-CalibriBold text-[#013D9F]"
              text="Login"
            />

            {/* username and password */}
            <View className="mt-8">
              <FloatingTextInput
                label="Username"
                iconName="account"
                placeholder="Enter username"
                value={username}
                onChangeText={text => {
                  setUsername(text);
                }}
              />

              <TextInput
                style={{
                  marginBottom: 5,
                  fontFamily: AppFonts.CalibriRegular,
                }}
                placeholder={'Enter password'}
                onChangeText={text => {
                  setPassword(text);
                }}
                mode={'outlined'}
                label="Password"
                value={password}
                outlineColor={'#013D9F'}
                activeOutlineColor={'#013D9F'}
                theme={DefaultTheme}
                secureTextEntry={hidePass ? true : false}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setHidePass(!hidePass)}
                    color={'lightgrey'}
                  />
                }
              />
            </View>
            {/* username and password */}

            {promt ? (
              <>
                <View>
                  <Text className="text-[#ff0f0f] font-Calibri ">
                    Fill all fields
                  </Text>
                </View>
              </>
            ) : null}

            <View className="mt-[30]">
              <Button
                loading={loading}
                disabled={loading}
                contentStyle={{width: '100%'}}
                textColor="white"
                onPress={() => {
                  // navigation.navigate('MyAccount')
                  {
                    username && password ? handleLogin() : setPrompt(true);
                  }
                }}
                className={
                  ' bg-[#013D9F] justify-center rounded-[6px] h-[52px]'
                }
                mode="contained">
                <Text className="font-Calibri text-[18px]">Login</Text>
              </Button>
            </View>

            {/* <View className="mt-[20]">
              <TouchableOpacity
                className=" self-center	 "
                onPress={() => navigation.navigate('Forgot')}
              >
                <Text className="text-primeRed  text-sm font-medium	 ">
                  Forgot Your Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View className=" items-center flex-row justify-between self-center  mt-[25]  w-10/12	 ">
              <Image className="w-2/5" source={Imagepath.line} />
              <Text className=" text-black  text-sm font-medium  max-h-10">
                OR
              </Text>
              <Image className="w-2/5" source={Imagepath.line} />
            </View>

            <TouchableOpacity className="self-center mt-[15] ">
              <Image
                className=""
                source={Imagepath.googleIcon}
                style={{
                  resizeMode: 'contain',
                  height: 30,
                  width: 30,
                  marginTop: 10,
                }}
              />
            </TouchableOpacity> */}

            <View className=" justify-end flex-1 mt-[40]">
              <TouchableOpacity className="bg-white  self-center">
                <Text className=" text-[#D21010] font-Calibri text-[16px]">
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Login;
