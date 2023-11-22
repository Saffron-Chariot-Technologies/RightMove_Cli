import React, {useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {
  Modal,
  Button,
  ScrollView,
  Center,
  VStack,
  NativeBaseProvider,
} from 'native-base';
import {IconButton} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const UploadFile = ({}: any) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const pickGallery = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      //   const compressedImage = await manipulateAsync(
      //     result.assets[0].uri,
      //     [{ resize: { width: 800 } }],
      //     { compress: 0.7, format: SaveFormat.JPEG }
      //   )
      //   console.log({ compressedImage })
      console.log(result.assets[0].uri);
      //   setFile(result.assets[0].uri)
      //   setImage(result.assets[0].uri)
      //   handleMedia(compressedImage?.uri)
    } else {
      alert('You did not select any image.');
    }
  };

  const pickImage = async () => {
    setModalVisible(false);
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    console.log({status});
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    } else {
      try {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          // aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          //   const compressedImage = await manipulateAsync(
          //     result.assets[0].uri,
          //     [{ resize: { width: 800 } }],
          //     { compress: 0.7, format: SaveFormat.JPEG }
          //   )
          //   console.log({ compressedImage })
          console.log(result.assets[0].uri);
          //   setFile(result.assets[0].uri)
          // handleImage(result.assets[0].uri)
          //   setImage(result.assets[0].uri)
          //   await handleMedia(compressedImage?.uri)
        } else {
          alert('You did not select any image.');
        }
      } catch (error: any) {
        console.log({error: error?.response?.data});
      }
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        className="bg-[#E3E3E3] p-1  rounded-[3px]">
        <Text className="">Browse</Text>
      </Pressable>

      {/* <------------ Modal ------------> */}
      <Modal isOpen={modalVisible} onClose={setModalVisible}>
        <Modal.Content>
          <Modal.CloseButton className="" />
          <Modal.Body>
            <View className="flex-row justify-around mt-10 mb-10">
              <View>
                <Pressable
                  onPress={() => {
                    pickImage();
                  }}
                  className="border-[1px] bg-[#013D9F] rounded-[3px]">
                  <IconButton icon={'camera'} size={30} color="white" />
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    pickGallery();
                  }}
                  className="bg-[#D9D9D9] rounded-[3px]">
                  <IconButton icon={'camera-image'} size={30} color="#646363" />
                </Pressable>
              </View>
            </View>
            <View>
              <Pressable className="bg-[#013D9F] rounded-[3px] p-3 justify-center items-center">
                <Text className="text-white">Open</Text>
              </Pressable>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* <------------ Modal ------------> */}
    </View>
  );
};
export default UploadFile;
