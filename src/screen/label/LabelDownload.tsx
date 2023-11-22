import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import MyCustomModule from '../receipt/MyCustomModule';
import RNFS from 'react-native-fs';
import {ToastAndroid} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import Axios from '../../../utils/axios/Axios';
import {useSelector} from 'react-redux';
import JSON5 from 'json5';
import Pdf from 'react-native-pdf';
import {Dimensions} from 'react-native';
import BlobUtil from 'react-native-blob-util';

// import {PDFDocument, PDFPage} from 'react-native-pdf-lib';

const LabelDownload = ({data, selectedData, onClick}: any) => {
  const Data = data ? data : selectedData;
  let comb: string[] = [];

  const [labelDownloadData, setLabelDownloadData] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const {token, username} = useSelector(state => state.AuthReducer);

  const viewShotRef = useRef<any>();
  const [screenshotUri, setScreenshotUri] = useState(null);
  const [BaseUrl, setBaseUrl] = useState([]);

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

    for (let index = 0; index < uniqueWaybillNumbers.length; index++) {
      Axios.post(
        'labels',
        {
          AWBNos: [uniqueWaybillNumbers[index]],
        },
        config,
      )
        .then(async res => {
          const responseObject = JSON5.parse(res.data);
          comb.push(responseObject.data);
          // const pdfData = await BlobUtil.fs.readFile(
          //   responseObject.data,
          //   'base64',
          // );

          // Rotate the Blob by 90 degrees

          setTimeout(() => {
            setBaseUrl(comb);
          }, 600);
          // setIsPdfLoading(false);
        })
        .catch(res => {
          console.log('ABHAYA error', res);
          setIsPdfLoading(false);
        });
      setIsPdfLoading(false);
    }

    Axios.post(
      'labels',
      {
        AWBNos: uniqueWaybillNumbers,
      },
      config,
    )
      .then(async res => {
        const responseObject = JSON5.parse(res.data);
        setLabelDownloadData(responseObject.data);
        // console.log(responseObject.data);
        // setIsPdfLoading(false);
      })
      .catch(res => {
        console.log('ABHAYA error', res);
        setIsPdfLoading(false);
      });
  };
  // console.log(Data);
  const onDownload = async () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `captured_image_${timestamp}_${randomString}.pdf`;
    const fPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const a = Data.map(i => i.WaybillNo);
    const uniqueWaybillNumbers = [...new Set(a)];
    ToastAndroid.show('Downloading ...', ToastAndroid.LONG);

    Axios.post(
      'labels',
      {
        AWBNos: uniqueWaybillNumbers,
      },
      config,
    )
      .then(async res => {
        const responseObject = JSON5.parse(res.data);

        await RNFS.writeFile(fPath, responseObject.data, 'base64');
        ToastAndroid.show('Downloading Completed', ToastAndroid.LONG);

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
    //   onClick();
    //   ToastAndroid.show('Downloaded Successful', ToastAndroid.SHORT);

    //   console.log(`Image saved to: ${destinationPath}`);
    // } catch (error) {
    //   console.error('Failed to capture screenshot:', error);
    //   ToastAndroid.show('Try again', ToastAndroid.SHORT);
    // }
  };
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
  const captureScreenshot = async () => {
    const a = Data.map(i => i.WaybillNo);
    const uniqueWaybillNumbers = [...new Set(a)];
    setLoading(true);
    const checkpermission = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    console.log('checkpermission', checkpermission);
    if (checkpermission === 'granted') {
      try {
        const uri = await viewShotRef.current.capture();
        setScreenshotUri(uri);
        console.log('Screenshot captured:', uri);
        setLoading(false);
        // console.log(BaseUrl[0]);
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const fileName = `captured_image_${timestamp}_${randomString}.pdf`;
        const fPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        await RNFS.writeFile(fPath, labelDownloadData, 'base64');

        if (uri) {
          MyCustomModule.goToNextScreen(uri, true, fPath);
        }
        onClick();

        // You can save the screenshot or perform further actions with the URI
      } catch (error) {
        console.error('Failed to capture screenshot:', error);
        onClick();
        setLoading(false);
      }
    }
    if (checkpermission === 'blocked') {
      Linking.openSettings();
    }
    if (checkpermission === 'denied') {
      request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT)
        .then(result => {
          if (result === 'blocked') {
            Linking.openSettings();
          }
          if (result === 'granted') {
            BluetoothStateManager.requestToEnable().then(async res => {});
          }
        })
        .catch(err => {
          console.log(err);
          onClick();

          ToastAndroid.show('Permission error', ToastAndroid.SHORT);
        });
    }
    setLoading(false);

    onClick();
  };
  useEffect(() => {
    checkPermission();
    loadPdf();
  }, []);
  useEffect(() => {}, [BaseUrl.length]);
  return (
    <View className="bg-white">
      <ScrollView contentContainerStyle={{}}>
        <ViewShot ref={viewShotRef}>
          {BaseUrl?.map((item: any, index: any) => (
            <View
              key={index}
              style={{
                transform: [{rotate: '90deg'}],
                marginTop: index === 0 ? -80 : 0,
                marginBottom: index === BaseUrl.length - 1 ? 100 : 0,
              }}>
              <Pdf
                fitPolicy={10}
                singlePage
                horizontal
                source={{
                  uri: `data:application/pdf;base64,${item}`,
                }}
                style={{
                  width: Dimensions.get('window').width * 1.2,
                  height: Dimensions.get('window').height * 0.6,

                  // transform: [{rotate: '90deg'}],
                }}
              />
            </View>
          ))}
        </ViewShot>
      </ScrollView>

      {/* <TouchableOpacity onPress={captureScreenshot}>
        <Text className="text-black">Capture Screenshot</Text>
      </TouchableOpacity>
      {BaseUrl && (
        <View>
          <Text>Image Preview:</Text>
          <Image
            resizeMode="contain"
            source={{uri: screenshotUri}}
            style={{width: 200, height: 200}}
          />
        </View>
      )} */}

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

      {/* buttons */}
      <View className="mt-5 flex-row justify-end">
        <TouchableOpacity
          onPress={onDownload}
          className="mr-2 p-2 bg-[#013D9F] rounded-[10px]">
          <Text className="text-white">Download</Text>
        </TouchableOpacity>
        {/* <LabelPrint Data={Data} /> */}
      </View>
      {/* buttons */}
    </View>
  );
};

export default LabelDownload;

// <ScrollView>
//   <ViewShot ref={viewShotRef}>
//     {labelDownloadData?.map((item: any, index: any) => (
//       <View
//         key={index}
//         className="flex-1 border-[1px] h-[100%] bg-white mb-5">
//         <View className="border-[1px] p-1 items-center ">
//           <Image
//             source={require('../../assets/images/booking/trackon.png')}
//           />
//         </View>
//         <View className="flex-row">
//           <View className="border-[1px] p-1 items-center w-[35%]">
//             <Text className="text-[13px] font-Calibri text-black">
//               Orgin
//             </Text>
//           </View>
//           <View className="border-[1px] p-1 items-center w-[65%]">
//             <Text className="text-[13px] font-Calibri text-black">
//               Destination
//             </Text>
//           </View>
//         </View>

//         <View className="flex-row">
//           <View className="border-[1px] p-1 items-center w-[35%]">
//             <Text className="text-[13px] font-Calibri text-black">
//               IXC
//             </Text>
//           </View>
//           <View className="border-[1px] p-1 items-center w-[65%]">
//             <Text className="text-[13px] font-Calibri text-black">
//               {item.Destination}
//             </Text>
//           </View>
//         </View>

//         <View className="border-[1px] items-center ">
//           <Image
//             className="w-[200px] h-[60px]"
//             resizeMode="contain"
//             source={require('../../assets/images/order/barcode.jpg')}
//           />
//           <Text className="text-[13px] font-Calibri text-black">
//             {item?.WaybillNo}
//           </Text>
//         </View>

//         <View className="border-[1px] flex-row justify-between p-1">
//           <Text className="text-[13px] font-Calibri text-black">
//             CustRefNo. : {item?.ReferenceId}
//           </Text>
//           <Text className="text-[13px] font-Calibri text-black">
//             Mode : {item?.Mode}
//           </Text>
//         </View>

//         <View className="border-[1px] flex-row justify-between p-1">
//           <Text className="text-[13px] font-Calibri text-black">
//             Consignee : {item?.ConsigneeName}
//           </Text>
//         </View>

//         <View className="border-[1px] items-center p-4">
//           <Text className="text-[18px] text-black">{item?.Mode}</Text>
//         </View>

//         <View className="border-[1px] p-1">
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-[13px] font-Calibri text-black">
//               PCS : {item?.Pieces}
//             </Text>
//             <Text className="text-[13px] font-Calibri text-black">
//               Dt: {item?.OderDate}
//             </Text>
//           </View>
//           <Text className="text-[13px] font-Calibri text-black">
//             Shipment Value: {item?.Weight}
//           </Text>
//           <Text className="text-[13px] font-Calibri text-black">
//             Contains: test booking
//           </Text>
//         </View>
//         <View className="border-[1px] p-1">
//           <Text className="text-[13px] font-Calibri text-black">
//             From/Return Details: {item?.ClientName}
//           </Text>
//         </View>
//         <View className="border-[1px] p-1">
//           <Text className="text-[13px] font-Calibri text-black">
//             Track your Shipment at trackon.in
//           </Text>
//         </View>
//       </View>
//     ))}
//   </ViewShot>
// </ScrollView>;
