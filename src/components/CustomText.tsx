import React, {FC} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

interface CustomTextProps {
  text: string;
  classNames?: string;
}

const CustomText: FC<CustomTextProps> = ({text, classNames}) => {
  return (
    <View>
      <Text className={`text-black ${classNames}`}>{text}</Text>
    </View>
  );
};

export default CustomText;
