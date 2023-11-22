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
} from 'react-native';
import {Checkbox as PaperBox, IconButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableHighlight} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';

const DatePicker = ({
  showPicker,
  date,
  setShowPicker,
  setDate,
  handleFilterByDate,
}: any) => {
  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    hideDateTimePicker();
    if (selectedDate) {
      const originalDate = selectedDate;
      const dateNew = new Date(originalDate);
      const day = dateNew.getDate();
      const month = dateNew.getMonth() + 1; // Months are zero-based
      const year = dateNew.getFullYear();
      const formattedDate = `${day.toString().padStart(2, '0')}/${month
        .toString()
        .padStart(2, '0')}/${year}`;

      console.log({DatePickerSelectedDate: formattedDate});
      handleFilterByDate(formattedDate);
      setDate(selectedDate);
    }
  };
  return (
    <View className="items-center justify-center  w-[20%]">
      <TouchableNativeFeedback onPress={showDateTimePicker} className="">
        <Image
          resizeMode="contain"
          className="w-[25px] h-[25px]"
          source={require('../../../assets/images/order/orders.png')}
        />
      </TouchableNativeFeedback>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date" // or "time" for time picker
          display="default" // or "spinner" or "calendar" for Android
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};
export default DatePicker;
