import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {Checkbox as PaperBox, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Modal} from 'native-base';
import LabelDownload from '../label/LabelDownload';
import ReceiptDownload from '../receipt/ReceiptDownload';
import {tokenAtom} from '../../../utils/store/TokenStore';
import {useAtom} from 'jotai';
import Axios from '../../../utils/axios/Axios';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from './datepicker/DatePicker';
import List from './flatlist/List';
import {dropdownData} from '../../../utils/json/DropDown';
import {RootStackParamList} from '../../type/common';
import JSON5 from 'json5';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {TouchableHighlightBase} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import PDFView from 'react-native-pdf';

const Order = ({route}: any) => {
  type homeScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'WayBills'
  >;
  const navigation = useNavigation<homeScreenProps>();
  const {token, username} = useSelector(state => state.AuthReducer);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [data, setData] = useState();
  const [renderData, setRenderData] = useState();
  // console.log('token', token);
  const [showModal, setShowModal] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('1');
  const [label, setLabel] = useState('MANIFESTED');

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const handleOrders = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append('Username', username);
      formData.append('Usertype', 'delboy');
      formData.append('CompanyCode', 'tcpl');

      const res = await Axios.post('orders', formData, config);
      // console.log('orders', res.data);
      const responseObject = JSON5.parse(res.data);
      // const validJSONString = res.data.replace(/'/g, '"');
      // console.log(validJSONString.replace(/'/g, '"'));
      if (res.data) {
        setOrderItems(responseObject.orderitems);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log({error: error});
    }
  };

  const handleOnPress = (item: any) => {
    if (selectedItems.length) {
      return selectItems(item);
    }

    navigation.navigate('WayBills', {data: item});
    // console.log('Pressed:', item.id); // Single tap action
  };

  const getSelected = (item: any) => {
    return selectedItems.some(selectedItem => selectedItem.id === item.id);
  };

  const deSelectItems = () => {
    setSelectedItems([]);
  };

  const selectItems = (item: any) => {
    const isItemSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );
    if (isItemSelected) {
      const newListItems = selectedItems.filter(
        selectedItem => selectedItem.id !== item.id,
      );
      setSelectedItems(newListItems);
    } else {
      selectedItems.length < 10
        ? setSelectedItems([...selectedItems, item])
        : console.log('Above 10');
    }
    // console.log('isItemSelected', selectedItems.length);
  };

  const handleLabel = (items: any) => {
    setSelectedData(items);
    setShowModal(true);
    setShowLabel(true);
    setShowReceipt(false);
  };

  const handleReceipt = (items: any) => {
    setSelectedData(items);
    setShowModal(true);
    setShowLabel(false);
    setShowReceipt(true);
  };

  useEffect(() => {
    // Initialize counter
    let idCounter = 1;
    // Transform input array into output array with IDs assigned
    const transformedArray: any = orderItems.map((input: any) => ({
      ...input, // Include all input fields
      id: idCounter++, // Add id field with current counter value
    }));
    // setLoading(false)
    // Set state with transformed array
    // console.log({output: transformedArray[0]});
    let filteredData = transformedArray.filter((item: any, index: any) => {
      if (item.AWBStatus == label) {
        return item;
      }
    });
    setRenderData(transformedArray);
    setData(filteredData);
  }, [orderItems]);

  const handleDropdown = (item: any) => {
    // console.log(item.label);
    setValue(item.value);
    setLabel(item.label);
    // const awbstatus = renderData.map(i => ({status: i.AWBStatus}));
    // console.log(awbstatus);
    let filteredData = renderData.filter((items: any) => {
      if (items.AWBStatus == item.label) {
        return item;
      }
      if (item.label == 'ALL') {
        return renderData;
      }
    });
    setData(filteredData);
  };
  const handleDateFilter = async text => {
    const filteredItems = await renderData.filter(
      (item: {OderDate: string}) => {
        return item.OderDate.startsWith(text);
      },
    );
    setData(filteredItems);
  };
  const handleFilterByDate = (text: string) => {
    // PDFView

    setInputDate(text);
    const filteredItems = renderData.filter((item: {OderDate: string}) => {
      return item.OderDate.startsWith(text);
    });
    // console.log(renderData[0].WaybillNo);
    const filteredWayBillData = renderData.filter(
      (item: {WaybillNo: string}) => {
        return item?.WaybillNo.startsWith(text);
      },
    );
    setData(filteredWayBillData);
    if (!text) {
      let filteredData = renderData.filter((items: any) => {
        if (items.AWBStatus == label) {
          return items;
        }
      });
      setData(filteredData);
    }
  };

  useEffect(() => {
    const originalDate = date;
    const dateNew = new Date(originalDate);
    const day = dateNew.getDate();
    const month = dateNew.getMonth() + 1; // Months are zero-based
    const year = dateNew.getFullYear();
    const formattedDate = `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;

    // console.log({formattedDate: formattedDate}); // Output: 19/06/2023
  }, [date]);

  useEffect(() => {
    handleOrders();
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <List
          items={item}
          onPress={() => handleOnPress(item)}
          onLongPress={() => selectItems(item)}
          selected={getSelected(item)}
          handleLabel={handleLabel}
          handleReceipt={handleReceipt}
          selectedItems={selectedItems}
          loading={loading}
        />
      );
    },
    [selectedItems],
  );

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1">
      <StatusBar backgroundColor="#013D9F" barStyle={'light-content'} />

      {/* dropdown */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={dropdownData}
        itemTextStyle={{
          color: 'black',
          fontSize: 16,
          fontFamily: AppFonts.CalibriRegular,
        }}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          handleDropdown(item);
        }}
      />
      {/* dropdown */}

      {/* search */}
      <View className="p-4 flex-row justify-between">
        <View className="flex-row bg-[#EAE7E7]  justify-between rounded-[50px] w-[80%]">
          <TextInput
            className="ml-4 w-[80%] text-black"
            placeholderTextColor={'black'}
            placeholder="Search by AWB no..."
            // keyboardType="numeric"
            value={inputDate}
            onChangeText={text => {
              handleFilterByDate(text);
            }}
          />
          <IconButton style={{width: 30}} icon={'magnify'} />
        </View>
        <DatePicker
          date={date}
          setDate={setDate}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          handleFilterByDate={handleDateFilter}
        />
      </View>
      {/* search */}

      {/* top-heading */}
      <View className="flex-row  p-2 border-[0.7px] opacity-70 justify-between  ">
        <View className="w-[10%] ">
          <Text className="text-[19px] font-Calibri ">{/* check */}</Text>
        </View>
        <View className=" flex-1 ">
          <Text className="text-[19px] font-Calibri  text-black">Date</Text>
        </View>
        <View className=" flex-1">
          <Text className="text-[19px] font-Calibri text-black">AWB No.</Text>
        </View>
        <View className=" flex-1 items-center">
          <Text className="text-[19px] font-Calibri text-black">
            Client Name
          </Text>
        </View>
        <View className="flex-1 flex-row p-2">
          <View className="border-[1px] flex-1  h-[23px] w-[45px] border-[0.5px] rounded-[63px] items-center mr-2">
            <Text className="text-[18px] font-Calibri text-black">L</Text>
          </View>
          <View className="border-[1px] flex-1  h-[23px] w-[45px] border-[0.5px] rounded-[63px] items-center mr-2">
            <Text className="text-[18px] font-Calibri text-black">R</Text>
          </View>
        </View>
      </View>
      {/* top-heading*/}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Pressable onPress={deSelectItems} className="mb-[210px]">
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              renderItem={renderItem}
            />
          </Pressable>
        </>
      )}

      {/* modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content width={'90%'}>
          <Modal.Body>
            <View>
              {showLabel ? (
                <LabelDownload
                  onClick={() => {
                    setShowModal(false);
                  }}
                  selectedData={selectedData}
                />
              ) : null}
              {showReceipt ? (
                <ReceiptDownload
                  onClick={() => {
                    setShowModal(false);
                  }}
                  selectedData={selectedData}
                />
              ) : null}
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* modal */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxText: {
    color: 'white',
    fontSize: 16,
    fontFamily: AppFonts.CalibriRegular,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#6495ED',
  },
  dropdown: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 0.5,
    borderRadius: 32,
    padding: 4,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: AppFonts.CalibriRegular,
    color: 'black',
  },
  selectedTextStyle: {
    color: 'black',
    fontSize: 16,
    fontFamily: AppFonts.CalibriRegular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

export default Order;
