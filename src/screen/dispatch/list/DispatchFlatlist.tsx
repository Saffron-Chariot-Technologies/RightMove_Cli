import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {DispatchList} from '../../../../utils/json/Temp';
import CustomText from '../../../components/CustomText';
import {Button, Modal} from 'native-base';

const DispatchFlatlist = ({item, key}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="border-[0.5px] p-3 mt-4 rounded-[6px] border-[#00000080]">
      {/* Dispatch Number */}
      <View className="flex-row justify-between ">
        <View className="w-[40%] ">
          <CustomText
            text="DISPATCH NUMBER"
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[20%] items-center ">
          <CustomText
            text="-"
            classNames="text-[#00000099]  text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[40%]">
          <CustomText
            text={`${item?.dispatchNo}`}
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
      </View>
      {/* Dispatch Number */}

      {/* Vehicle Number */}
      <View className="flex-row justify-between mt-2">
        <View className="w-[40%] ">
          <CustomText
            text="VEHICLE NUMBER"
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[20%] items-center ">
          <CustomText
            text="-"
            classNames="text-[#00000099]  text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[40%]">
          <CustomText
            text={`${item?.awbNo}`}
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
      </View>
      {/* Vehicle Number */}

      {/* Dispatch Date */}
      <View className="flex-row justify-between mt-2">
        <View className="w-[40%] ">
          <CustomText
            text="DISPATCH DATE"
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[20%] items-center ">
          <CustomText
            text="-"
            classNames="text-[#00000099]  text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[40%]">
          <CustomText
            text={`${item?.entryTime}`}
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
      </View>
      {/* Dispatch Date */}

      {/* Count */}
      <View className="flex-row justify-between mt-2">
        <View className="w-[40%] ">
          <CustomText
            text="COUNT"
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[20%] items-center ">
          <CustomText
            text="-"
            classNames="text-[#00000099]  text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[40%]">
          <CustomText
            text={`${item?.dispatchNo}`}
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
      </View>
      {/* Count */}

      {/* Action */}
      <View className="flex-row justify-between mt-2 items-center">
        <View className="w-[40%] ">
          <CustomText
            text="ACTION"
            classNames="text-[#00000099] text-[14px] font-Calibri"
          />
        </View>
        <View className="w-[20%] items-center ">
          <CustomText
            text="-"
            classNames="text-[#00000099]  text-[14px] font-Calibri"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          className="w-[40%] bg-[#013D9F] p-2 justify-center items-center rounded-[6px]">
          <CustomText
            text={`DETAILS`}
            classNames="text-[#00000099] text-[14px] font-Calibri text-white"
          />
        </TouchableOpacity>
      </View>
      {/* Action */}

      {/* Modal */}
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        bottom="4"
        minHeight={200}
        size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <View className="p-2 mt-8">
            <CustomText
              text="Dispatch Details"
              classNames="text-[#013D9F] font-bold text-[16px] text-center"
            />

            <View className=" p-2 bg-[#013D9F] mt-2 rounded-[6px] flex-row  justify-between">
              <View className="flex-1">
                <CustomText text="ENTRY NO." classNames="text-white" />
              </View>
              <View className="flex-1">
                <CustomText
                  text="AWB No."
                  classNames="text-white text-center"
                />
              </View>
              <View className="flex-1  items-end">
                <CustomText text="PIECE NO." classNames="text-white  " />
              </View>
            </View>

            {/* data */}
            <View className=" p-2  mt-2 rounded-[6px] flex-row  justify-between">
              <View className="flex-1">
                <CustomText text="1" classNames="text-center" />
              </View>
              <View className="flex-1">
                <CustomText text="12345678" classNames=" text-center" />
              </View>
              <View className="flex-1  ">
                <CustomText text="1" classNames="text-center" />
              </View>
            </View>
            {/*  dup data*/}
            <View className=" p-2  mt-2 rounded-[6px] flex-row  justify-between">
              <View className="flex-1">
                <CustomText text="1" classNames="text-center" />
              </View>
              <View className="flex-1">
                <CustomText text="12345678" classNames=" text-center" />
              </View>
              <View className="flex-1  ">
                <CustomText text="1" classNames="text-center" />
              </View>
            </View>
            <View className=" p-2  mt-2 rounded-[6px] flex-row  justify-between">
              <View className="flex-1">
                <CustomText text="1" classNames="text-center" />
              </View>
              <View className="flex-1">
                <CustomText text="12345678" classNames=" text-center" />
              </View>
              <View className="flex-1  ">
                <CustomText text="1" classNames="text-center" />
              </View>
            </View>
            <View className=" p-2  mt-2 rounded-[6px] flex-row  justify-between">
              <View className="flex-1">
                <CustomText text="1" classNames="text-center" />
              </View>
              <View className="flex-1">
                <CustomText text="12345678" classNames=" text-center" />
              </View>
              <View className="flex-1  ">
                <CustomText text="1" classNames="text-center" />
              </View>
            </View>
            <View className=" p-2  mt-2 rounded-[6px] flex-row  justify-between">
              <View className="flex-1">
                <CustomText text="1" classNames="text-center" />
              </View>
              <View className="flex-1">
                <CustomText text="12345678" classNames=" text-center" />
              </View>
              <View className="flex-1  ">
                <CustomText text="1" classNames="text-center" />
              </View>
            </View>
            {/*  dup data*/}
            {/* data */}
          </View>
        </Modal.Content>
      </Modal>
      {/* ModAL */}
    </View>
  );
};

export default DispatchFlatlist;
