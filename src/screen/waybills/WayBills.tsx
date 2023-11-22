import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Modal} from 'native-base';
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {RootStackParamList} from '../../type/common';
import LabelDownload from '../label/LabelDownload';
import ReceiptDownload from '../receipt/ReceiptDownload';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const WayBills = ({route}: any) => {
  type homeScreenProps = NativeStackNavigationProp<
    RootStackParamList,
    'WayBills'
  >;
  const navigation = useNavigation<homeScreenProps>();

  const [labelLoading, setLabelLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const [data, setData] = useState([route?.params?.data]);

  const handleLabel = () => {
    setShowModal(true);
    setShowLabel(true);
    setShowReceipt(false);
  };

  const handleReceipt = () => {
    setShowModal(true);
    setShowLabel(false);
    setShowReceipt(true);
  };

  const Temp = [
    {
      title: 'WAYBILL NO',
      body: data[0]?.WaybillNo,
      icon: <Icon name="account-balance-wallet" size={18} color="black" />,
    },
    {
      title: 'CLIENT NAME',
      body: data[0]?.ClientName,
      icon: (
        <MaterialCommunityIcons
          name="account-edit-outline"
          size={20}
          color="black"
        />
      ),
    },
    {
      title: 'REFRENCE ID',
      body: data[0]?.ReferenceId,
      icon: <FontAwesomeIcon name="id-card-o" size={18} color="black" />,
    },
    {
      title: 'COURIER',
      body: data[0]?.Courier,
      icon: <FontAwesomeIcon name="truck" size={18} color="black" />,
    },
    {
      title: 'TYPE',
      body: data[0]?.PaymentType,
      icon: <FeatherIcon name="type" size={18} color="black" />,
    },
    {
      title: 'DATE',
      body: data[0].OderDate,
      icon: (
        <MaterialCommunityIcons name="calendar-range" size={18} color="black" />
      ),
    },
    {
      title: 'CONSIGNEE',
      body: data[0]?.ConsigneeName,
      icon: <MaterialCommunityIcons name="repeat" size={18} color="black" />,
    },
    {
      title: 'DESTINATION',
      body: data[0]?.Destination,
      icon: <FontAwesomeIcon name="desktop" size={18} color="black" />,
    },
    {
      title: 'PIECES',
      body: data[0]?.Pieces,
      icon: <AntDesignIcon name="piechart" size={18} color="black" />,
    },
    {
      title: 'WEIGHT',
      body: data[0]?.Weight,
      icon: <MaterialCommunityIcons name="scale" size={18} color="black" />,
    },
    {
      title: 'MODE',
      body: data[0]?.Mode,
      icon: (
        <MaterialCommunityIcons name="record-circle" size={18} color="black" />
      ),
    },
  ];

  return (
    <View className="flex-1 p-2">
      <ScrollView>
        {Temp?.map((items, index) => (
          <View className="flex-1 p-1 border-[0.7px] rounded-[44px]  mt-[10px] h-[44px] items-center opacity-50 flex-row">
            <View className="flex-1 flex-row items-center ml-2">
              <Text className="mr-2">{items?.icon}</Text>
              <Text className="text-black">{items.title}</Text>
            </View>
            <View className="flex-1  items-center">
              <Text className="text-black">-</Text>
            </View>
            <View className="flex-1  ">
              <Text className="text-black">{items.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* button */}
      <View className="mt-2">
        <Button
          loading={labelLoading}
          disabled={labelLoading}
          contentStyle={{width: '100%'}}
          onPress={handleLabel}
          className={' bg-[#013D9F] rounded-[20px]'}
          mode="contained">
          Label
        </Button>
        <Button
          loading={labelLoading}
          disabled={labelLoading}
          contentStyle={{width: '100%'}}
          onPress={handleReceipt}
          className={'bg-[#013D9F] mt-2 rounded-[20px]'}
          mode="contained">
          Receipt
        </Button>
      </View>
      {/* button */}

      {/* modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content width={'90%'}>
          {/* <Modal.CloseButton /> */}
          {/* <Modal.Header>Contact Us</Modal.Header> */}
          <Modal.Body>
            <View>
              {showLabel ? <LabelDownload data={data} /> : null}
              {showReceipt ? <ReceiptDownload data={data} /> : null}
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* modal */}
    </View>
  );
};
export default WayBills;
