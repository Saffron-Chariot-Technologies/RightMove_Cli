import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Button, Text, View, Image, Pressable, ScrollView} from 'react-native';
import ViewShot from 'react-native-view-shot';
import MyCustomModule from './MyCustomModule';
import RNFS from 'react-native-fs';
import {ToastAndroid} from 'react-native';
import Pdf from 'react-native-pdf';
import JSON5 from 'json5';

import {PERMISSIONS, check, request} from 'react-native-permissions';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {useSelector} from 'react-redux';
import Axios from '../../../utils/axios/Axios';
import {Dimensions} from 'react-native';
const ReceiptDownload = ({data, selectedData, onClick}: any) => {
  const Data = data ? data : selectedData;
  let comb: string[] = [];

  const [receiptDownloadData, setReceiptDownloadData] = useState(Data);
  const [loading, setLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const {token, username} = useSelector(state => state.AuthReducer);
  const viewShotRef = useRef<any>();
  const [screenshotUri, setScreenshotUri] = useState(null);
  const [BaseUrl, setBaseUrl] = useState([]);

  const checkPermission = async () => {
    const checkpermission = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    const checkpermissions = await check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    console.log('checkpermissions', checkpermissions);
    // if (checkpermission === 'blocked') {
    //   Linking.openSettings();
    // }
    if (checkpermissions === 'denied') {
      await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    }
    if (checkpermission === 'denied') {
      const status = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      console.log(status);
      if (status === 'blocked') {
        // Linking.openSettings();
      }
      if (status === 'granted') {
        await BluetoothStateManager.requestToEnable();
      }
    }
  };
  const onDownload = async () => {
    const timestamp = Date.now();

    const randomString = Math.random().toString(36).substring(7);
    const fileName = `captured_image_${timestamp}_${randomString}.pdf`;
    const fPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    // console.log('fPath', fPath);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const a = Data.map(i => i.WaybillNo);
    const uniqueWaybillNumbers = [...new Set(a)];
    console.log('uniqueWaybillNumbers', uniqueWaybillNumbers);
    Axios.post(
      'receipts',
      {
        AWBNos: uniqueWaybillNumbers,
      },
      config,
    )
      .then(async res => {
        const responseObject = JSON5.parse(res.data);

        await RNFS.writeFile(fPath, responseObject.data, 'base64');
        ToastAndroid.show('Downloading ...', ToastAndroid.LONG);

        // Rotate the Blob by 90 degrees

        // setIsPdfLoading(false);
      })
      .catch(res => {
        console.log('ABHAYA error', res);
        setIsPdfLoading(false);
      });
    // try {
    //   const uri = await viewShotRef.current.capture();
    //   console.log('Screenshot captured:', uri);
    //   const timestamp = Date.now();
    //   const randomString = Math.random().toString(36).substring(7);
    //   const fileName = `captured_image_${timestamp}_${randomString}.jpg`;
    //   const destinationPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    //   await RNFS.moveFile(uri, destinationPath);
    //   ToastAndroid.show('Downloaded Successful', ToastAndroid.SHORT);
    //   onClick();
    //   console.log(`Image saved to: ${destinationPath}`);
    // } catch (error) {
    //   console.error('Failed to capture screenshot:', error);
    //   ToastAndroid.show('Try again', ToastAndroid.SHORT);
    // }
  };

  const captureScreenshot = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      setScreenshotUri(uri);
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const fileName = `captured_image_${timestamp}_${randomString}.pdf`;
      const fPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      await RNFS.writeFile(fPath, BaseUrl[0], 'base64');

      if (uri) {
        MyCustomModule.goToNextScreen(uri, false, fPath);
      }
      // You can save the screenshot or perform further actions with the URI
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
    onClick();
  };

  const loadPdf = async () => {
    // setIsPdfLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const a = Data.map(i => i.WaybillNo);
    const uniqueWaybillNumbers = [...new Set(a)];

    console.log('uniqueWaybillNumbers', uniqueWaybillNumbers);
    for (let index = 0; index < uniqueWaybillNumbers.length; index++) {
      console.log(index);

      Axios.post(
        'receipts',
        {
          AWBNos: [uniqueWaybillNumbers[index]],
        },
        config,
      )
        .then(async res => {
          const responseObject = JSON5.parse(res.data);
          comb.push(responseObject.data);
          setTimeout(() => {
            setBaseUrl(comb);
          }, 500);
          // setIsPdfLoading(false);
        })
        .catch(res => {
          console.log('ABHAYA error', res);
          setIsPdfLoading(false);
        });
    }
  };
  useEffect(() => {
    checkPermission();
    loadPdf();
  }, []);
  // const onPressPrint = () => {
  //   MyCustomModule.goToNextScreen(screenshotUri);
  // };
  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
        }}>
        <ViewShot ref={viewShotRef}>
          {BaseUrl?.map((item: any, index: any) => (
            <Pdf
              key={index}
              source={{
                uri: `data:application/pdf;base64,${item}`,
              }}
              style={{
                flex: 1,
                width: Dimensions.get('window').width * 0.8,
                height: Dimensions.get('window').height * 0.6,
                backgroundColor: 'white',
              }}
            />
          ))}
        </ViewShot>
      </ScrollView>

      {/* {screenshotUri && ( */}
      <View>
        {/* <Text>Image Preview:</Text>
          <Image
            resizeMode="contain"
            source={{uri: screenshotUri}}
            style={{width: 200, height: 200}}
          />
          
          // <View className="mt-5 flex-row justify-end"> */}
        <View className="mt-5 flex-row justify-end">
          <TouchableOpacity
            onPress={onClick}
            className={`mr-2 p-2 bg-[#415980] rounded-[10px]`}>
            <Text className="text-white">Cancel </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 flex-row justify-end">
          <TouchableOpacity
            onPress={captureScreenshot}
            disabled={loading || isPdfLoading}
            className={`mr-2 p-2 ${
              loading ? 'bg-[#415980]' : 'bg-[#013D9F]'
            } rounded-[10px]`}>
            <Text className="text-white">Print {loading && '...'} </Text>
          </TouchableOpacity>
        </View>

        {/* <ReceiptPrint Data={Data} /> */}
      </View>

      {/* <Image
        resizeMode="contain"
        className="w-100 h-100"
        source={{uri: ViewData}}
      /> */}

      {/* buttons */}
      <View className="mt-5 flex-row justify-end">
        <TouchableOpacity
          onPress={onDownload}
          className="mr-2 p-2 bg-[#013D9F] rounded-[10px]">
          <Text className="text-white">Download</Text>
        </TouchableOpacity>
        {/* <ReceiptPrint Data={Data} /> */}
      </View>
      {/* buttons */}
    </View>
  );
};

export default ReceiptDownload;
