import React from 'react';
import {View} from 'react-native';
import {TextInput, DefaultTheme} from 'react-native-paper';
import {AppFonts} from '../assets/fonts/AppFonts';

export type FI = {
  label?: string;
  iconName: string;
  value: string | undefined;
  placeholder: string;
  iconColor?: string | undefined;
  type?: string;
  secureTextEntry?: boolean;
  height?: number | undefined;
  onChangeText: (text: string) => void;
};

const FloatingTextInput = ({
  label,
  iconName,
  placeholder,
  onChangeText,
  value,
  iconColor,
  type,
  secureTextEntry,
  height,
}: FI) => {
  return (
    <View>
      <TextInput
        // @ts-ignore
        keyboardType={type ? type : 'default'}
        className="font-Calibri"
        style={{
          marginBottom: 5,
          height: height,
          fontFamily: AppFonts.CalibriRegular,
        }}
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        mode={'outlined'}
        label={label}
        value={value}
        outlineColor={'#013D9F'}
        activeOutlineColor={'#013D9F'}
        theme={DefaultTheme}
        secureTextEntry={secureTextEntry ? true : false}
        right={
          <TextInput.Icon
            icon={iconName}
            onPress={() => {}}
            color={iconColor ? iconColor : 'lightgrey'}
          />
        }
      />
    </View>
  );
};
export default FloatingTextInput;
