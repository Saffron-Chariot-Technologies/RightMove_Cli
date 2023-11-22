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
import {RootStackParamList} from '../../type/common';
import CustomText from '../../components/CustomText';
import FloatingTextInput from '../../components/FloatingTextInput';

const MobileSignIn = () => {
  type loginScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'MobileSignIn'
  >;
  const navigation = useNavigation<loginScreenProps>();

  const [mobileNumber, setMobileNumber] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-buttonText">
      <StatusBar backgroundColor="#013D9F" />
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

        <View className=" flex-1 bg-white rounded-t-3xl  p-6 justify-between">
          <CustomText
            classNames="text-3xl mt-[15] text-center font-[700] text-[#013D9F]"
            text="Login"
          />

          <FloatingTextInput
            label="Mobile Number"
            iconName="phone"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            type="numeric"
            onChangeText={text => {
              console.log(text);
            }}
          />

          <Button
            loading={loading}
            disabled={loading}
            contentStyle={{width: '100%'}}
            textColor="white"
            onPress={() => {
              // navigation.navigate('MyAccount')
              console.log('hoii');
            }}
            className={' bg-[#013D9F] justify-center rounded-[6px] h-[52px]'}
            mode="contained">
            LOGIN
          </Button>

          <TouchableOpacity className="bg-white  self-center">
            <Text className=" text-[#D21010]">Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MobileSignIn;
