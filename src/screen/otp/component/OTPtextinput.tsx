import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const OtpTextInput = ({digitCount, setOtp, otp}: any) => {
  const inputRefs = useRef([]);
  // const [otp, setOtp] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleInputChange = (index: any, value: any) => {
    setOtp((prevOtp: string) => {
      const updatedOtp = prevOtp.split('');
      updatedOtp[index] = value;
      return updatedOtp.join('');
    });

    if (value && index < digitCount - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputDelete = (index: any, value: any) => {
    setOtp((prevOtp: string) => {
      const updatedOtp = prevOtp.split('');
      updatedOtp[index] = '';
      return updatedOtp.join('');
    });

    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputKeyPress = (index: any, key: any) => {
    if (key === 'Backspace' && !otp[index]) {
      handleInputDelete(index, '');
    }
  };

  const handleInputFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <View className="">
      <View className="flex-row  justify-between ">
        {Array.from({length: digitCount}).map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            className={` w-[20%] h-[49px] border-[1px] rounded-[8px] text-center font-[Inter-Bold] text-black
            ${
              focusedIndex === index ? 'border-[#013D9F]' : 'border-[#D3D3D3]'
            }`}
            maxLength={1}
            value={otp[index]}
            selectionColor={'#013D9F'}
            keyboardType="numeric"
            onFocus={() => handleInputFocus(index)}
            onChangeText={value => handleInputChange(index, value)}
            onKeyPress={({nativeEvent: {key}}) =>
              handleInputKeyPress(index, key)
            }
          />
        ))}
      </View>
    </View>
  );
};

export default OtpTextInput;
