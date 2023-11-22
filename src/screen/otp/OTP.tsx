import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomText from '../../components/CustomText';
import OtpTextInput from './component/OTPtextinput';
import {Button as PaperButton} from 'react-native-paper';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [loadingOTP, setLoadingOTP] = useState(false);

  const sendOtp = () => {
    console.log('sendotp');
  };

  const handleButton = () => {
    console.log('Button');
  };
  return (
    <View className={'flex-1 justify-evenly items-center bg-white p-6'}>
      <View className=" items-center">
        <Image
          resizeMode="contain"
          className="w-[214px] h-[242px]"
          source={require('../../assets/images/otp/otp.png')}
        />
        <CustomText
          classNames="text-center mt-5"
          text="We will send a verification code to your registered mobile number"
        />
      </View>

      <View className=" p-6 ">
        <OtpTextInput digitCount={4} setOtp={setOtp} otp={otp} />
      </View>

      <View className="w-[100%]">
        <View className="flex-row items-center justify-center">
          <CustomText text="Don't receive the code ?" />
          <PaperButton
            loading={loadingOTP}
            disabled={loadingOTP}
            onPress={sendOtp}
            className="items-end  "
            textColor="#013D9F">
            RESEND!
          </PaperButton>
        </View>
        <View className="w-[100%]">
          <PaperButton
            onPress={handleButton}
            contentStyle={{width: '100%'}}
            textColor="white"
            className={' bg-[#013D9F] justify-center rounded-[6px] '}
            mode="contained">
            DONE
          </PaperButton>
        </View>
      </View>
    </View>
  );
};

export default Otp;
