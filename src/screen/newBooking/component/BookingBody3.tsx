import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import UploadFile from './UploadFile';

const BookingBody3 = ({
  setVisibleBody,
  pcs,
  setPcs,
  totalWt,
  setTotalWt,
  // dimension 1
  unit1,
  setUnit1,
  length1,
  setLength1,
  height1,
  setHeight1,
  qty1,
  setQty1,
  width1,
  setWidth1,
  // dimension 2
  unit2,
  setUnit2,
  length2,
  setLength2,
  height2,
  setHeight2,
  qty2,
  setQty2,
  width2,
  setWidth2,
  // dimension 3
  unit3,
  setUnit3,
  length3,
  setLength3,
  height3,
  setHeight3,
  qty3,
  setQty3,
  width3,
  setWidth3,
  // other charges
  otherCharges,
  setOtherCharges,
  adjustment,
  setAdjustment,
  shipmentCost,
  setShipmentCost,
  // file
  file,
  setFile,
}: any) => {
  const [visibleInvoice, setVisibleInvoice] = useState(1);

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="p-2">
          {/* <-------------- Header ----------------> */}
          <View className="p-2">
            <Text className="text-black">PCS *</Text>
            <View className="border-[0.5px] rounded-[3px] border-gray-400">
              <TextInput
                style={{color: 'black'}}
                selectionColor={'black'}
                placeholder="DOX"
                className="ml-2"
                value={pcs}
                onChangeText={text => {
                  console.log(text);
                  setPcs(text);
                }}
              />
            </View>
          </View>
          <View className="p-2">
            <Text className="text-black">Total Wt.(in Kg)* *</Text>
            <View className="border-[0.5px] rounded-[3px] border-gray-400">
              <TextInput
                style={{color: 'black'}}
                selectionColor={'black'}
                placeholder="DOX"
                className="ml-2"
                value={pcs}
                onChangeText={text => {
                  console.log(text);
                  setPcs(text);
                }}
              />
            </View>
          </View>
          {/* <-------------- Header ----------------> */}

          {/* <-------------- Dimensions ----------------> */}
          <View className="border-[0.5px] rounded-[3px] border-[#013D9F] mt-4">
            {/* header */}
            <View className="p-2 bg-[#013D9F] rounded-[3px]">
              <Text className="text-white">Dimensions</Text>
            </View>
            {/* header */}
            {/* dimension detail 1 */}
            <View className="p-2">
              <Text className="text-black">Unit</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={unit1}
                  onChangeText={text => {
                    console.log(text);
                    setUnit1(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Length</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={length1}
                  onChangeText={text => {
                    console.log(text);
                    setLength1(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Height</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={height1}
                  onChangeText={text => {
                    console.log(text);
                    setHeight1(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Qty</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={qty1}
                  onChangeText={text => {
                    console.log(text);
                    setQty1(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Width</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={width1}
                  onChangeText={text => {
                    console.log(text);
                    setWidth1(text);
                  }}
                />
              </View>
            </View>
            {/* dimension detail 1 */}
            {/* dimension detail 2 */}
            {visibleInvoice > 1 ? (
              <>
                <View className="p-2">
                  <Text className="text-black">Unit 2</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={unit2}
                      onChangeText={text => {
                        console.log(text);
                        setUnit2(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Amount 2</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={length2}
                      onChangeText={text => {
                        console.log(text);
                        setLength2(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Height 2</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={height2}
                      onChangeText={text => {
                        console.log(text);
                        setHeight2(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Qty 2</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={qty2}
                      onChangeText={text => {
                        console.log(text);
                        setQty2(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Width 2</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={width2}
                      onChangeText={text => {
                        console.log(text);
                        setWidth2(text);
                      }}
                    />
                  </View>
                </View>
              </>
            ) : null}
            {/* dimension detail 2 */}
            {/* dimension detail 3 */}
            {visibleInvoice > 2 ? (
              <>
                <View className="p-2">
                  <Text className="text-black">Unit 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={unit3}
                      onChangeText={text => {
                        console.log(text);
                        setUnit3(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Length 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={length3}
                      onChangeText={text => {
                        console.log(text);
                        setLength3(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Height 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={height3}
                      onChangeText={text => {
                        console.log(text);
                        setHeight3(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Qty 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={qty3}
                      onChangeText={text => {
                        console.log(text);
                        setQty3(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Width 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={width3}
                      onChangeText={text => {
                        console.log(text);
                        setWidth3(text);
                      }}
                    />
                  </View>
                </View>
              </>
            ) : null}
            {/* dimension detail 3 */}
            {/* additional Invoice and delete Invoice */}
            <View className="p-2 flex-row justify-between">
              <Pressable
                onPress={() => {
                  if (visibleInvoice < 3) {
                    setVisibleInvoice(visibleInvoice + 1);
                  }
                }}
                className="justify-center items-center   rounded-[3px] bg-[#013D9F] ">
                <IconButton icon={'plus'} size={15} iconColor="white" />
              </Pressable>
              <Pressable
                onPress={() => {
                  if (visibleInvoice > 1) {
                    setVisibleInvoice(visibleInvoice - 1);
                  }
                }}
                className="justify-center items-center rounded-[3px] bg-[#013D9F]">
                <IconButton icon={'minus'} size={15} iconColor="white" />
              </Pressable>
            </View>
            {/* additional Invoice and delete invoice*/}
          </View>
          {/* <-------------- Dimensions ----------------> */}

          {/* <-------------- Others ----------------> */}
          <View className="p-2 mt-4">
            <Text className="text-black">Other Charges</Text>
            <View className="border-[0.5px] rounded-[3px] border-gray-400">
              <TextInput
                style={{color: 'black'}}
                selectionColor={'black'}
                placeholder={'0.00'}
                className="ml-2"
                value={otherCharges}
                onChangeText={text => {
                  console.log(text);
                  setOtherCharges(text);
                }}
              />
            </View>
          </View>
          {/* <-------------- Others ----------------> */}

          {/* <-------------- adjustment ----------------> */}
          <View className="p-2">
            <Text className="text-black">Adjustment</Text>
            <View className="border-[0.5px] rounded-[3px] border-gray-400">
              <TextInput
                style={{color: 'black'}}
                selectionColor={'black'}
                placeholder="0.00"
                className="ml-2"
                value={adjustment}
                onChangeText={text => {
                  console.log(text);
                  setAdjustment(text);
                }}
              />
            </View>
          </View>
          {/* <-------------- adjustment ----------------> */}

          {/* <-------------- Shipment cost ----------------> */}
          <View className="p-2 ">
            <Text className="text-black">Shipment Cost</Text>
            <View className="flex-row justify-between">
              <View className="border-[0.5px] rounded-[3px] border-gray-400 w-[65%]">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  placeholder="0.00"
                  className="ml-2"
                  value={shipmentCost}
                  onChangeText={text => {
                    console.log(text);
                    setShipmentCost(text);
                  }}
                />
              </View>
              <View>
                <Pressable className="bg-[#013D9F] p-1 rounded-[3px]">
                  <Text className="text-white">Calculate Cost</Text>
                </Pressable>
              </View>
            </View>
          </View>
          {/* <-------------- shipment cost ----------------> */}

          {/* <-------------- Upload Invoice ----------------> */}
          <View className="p-2 flex-row justify-between">
            <View className="border-[0.5px] rounded-[3px]  border-gray-400 w-[65%] items-center flex-row justify-between">
              <Text className="ml-2 text-black">Choose File{file}</Text>
              {/* <UploadFile /> */}
            </View>
            <View>
              <Pressable className="bg-[#013D9F] p-1 rounded-[3px]">
                <Text className="text-white">Upload Invoice</Text>
              </Pressable>
            </View>
          </View>
          {/* <-------------- Upload Invoice ----------------> */}

          {/* <-------------- Footer ----------------> */}
          <View className=" items-center mt-4 mb-4 flex-row justify-center">
            <Pressable
              onPress={() => {
                setVisibleBody(2);
              }}
              className="justify-center items-center  w-[81px] h-[32px] rounded-[3px] bg-[#DDDFDF] mr-4">
              <Text className="text-black">Back</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log('submit');
              }}
              className="justify-center items-center  p-1.5 rounded-[3px] bg-[#013D9F]">
              <Text className="text-white">Submit Booking</Text>
            </Pressable>
          </View>
          {/* <-------------- Footer ----------------> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingBody3;
