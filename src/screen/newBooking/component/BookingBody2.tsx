import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import {Checkbox, DefaultTheme} from 'react-native-paper';

const BookingBody2 = ({
  setVisibleBody,
  paid,
  setPaid,
  topay,
  setTopay,
  cod,
  setCod,
  topayCod,
  setTopayCod,
  ownerRisk,
  setOwnerRisk,
  carrierRisk,
  setCarrierRisk,
  ewayBill1,
  setEwayBill1,
  amount1,
  setAmount1,
  invoiceNo1,
  setInvoiceNo1,
  ewayBill2,
  setEwayBill2,
  amount2,
  setAmount2,
  invoiceNo2,
  setInvoiceNo2,
  ewayBill3,
  setEwayBill3,
  amount3,
  setAmount3,
  invoiceNo3,
  setInvoiceNo3,
  productDescription,
  setProductDescription,
  referenceId,
  setRefrenceId,
  mode,
  setMode,
  itemType,
  setItemType,
}: any) => {
  const [visibleInvoice, setVisibleInvoice] = useState(1);

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="  p-3 ">
          {/* <-------------- Frieght ----------------> */}
          <View className="border-[0.5px] rounded-[3px] border-[#013D9F]">
            {/* header */}
            <View className="p-2 bg-[#013D9F] rounded-[3px]">
              <Text className="text-white">Freight</Text>
            </View>
            {/* header */}
            {/* checkbox */}
            <View className=" flex-row flex-1 justify-between">
              <View className="flex-row items-center flex-1">
                <Checkbox
                  status={paid ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  theme={DefaultTheme}
                  onPress={() => {
                    setPaid(true);
                    setTopay(false);
                    setCod(false);
                    setTopayCod(false);
                  }}
                />
                <Text className="text-black">PAID</Text>
              </View>
              <View className="flex-row items-center flex-1 ">
                <Checkbox
                  status={topay ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  theme={DefaultTheme}
                  onPress={() => {
                    setPaid(false);
                    setTopay(true);
                    setCod(false);
                    setTopayCod(false);
                  }}
                />
                <Text className="text-black">TOPAY</Text>
              </View>
              <View className="flex-row items-center  flex-1 ">
                <Checkbox
                  status={cod ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  theme={DefaultTheme}
                  onPress={() => {
                    setPaid(false);
                    setTopay(false);
                    setCod(true);
                    setTopayCod(false);
                  }}
                />
                <Text className="text-black">COD</Text>
              </View>
              <View className="flex-row items-center flex-1 ">
                <View className="flex-1">
                  <Checkbox
                    status={topayCod ? 'checked' : 'unchecked'}
                    color={'#013D9F'}
                    theme={DefaultTheme}
                    onPress={() => {
                      setPaid(false);
                      setTopay(false);
                      setCod(false);
                      setTopayCod(true);
                    }}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-black">TOPAY+COD</Text>
                </View>
              </View>
            </View>
            {/* checkbox */}

            <View className="bg-[#E4E2E2] p-2 ml-2 mr-2 mb-3 mt-3 rounded-[3px]">
              <Text> Cod Amount</Text>
            </View>
          </View>
          {/* <-------------- Frieght ----------------> */}

          {/* <----------- Insurance Type ------------> */}
          <View className="border-[0.5px] rounded-[3px] border-[#013D9F] mt-4">
            {/* header */}
            <View className="p-2 bg-[#013D9F] rounded-[3px]">
              <Text className="text-white">Insurance Type</Text>
            </View>
            {/* header */}
            {/* checkbox */}
            <View className=" flex-row">
              <View className="flex-row items-center mr-4">
                <Checkbox
                  status={ownerRisk ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  theme={DefaultTheme}
                  onPress={() => {
                    setOwnerRisk(true);
                    setCarrierRisk(false);
                  }}
                />
                <Text className="text-black">Owner Risk</Text>
              </View>
              <View className="flex-row items-center">
                <Checkbox
                  status={carrierRisk ? 'checked' : 'unchecked'}
                  color={'#013D9F'}
                  theme={DefaultTheme}
                  onPress={() => {
                    setOwnerRisk(false);
                    setCarrierRisk(true);
                  }}
                />
                <Text className="text-black">Carrier Risk</Text>
              </View>
            </View>
            {/* checkbox */}
          </View>
          {/* <----------- Insurance Type ------------> */}

          {/* <----------- Invoice Details ------------> */}
          <View className="border-[0.5px] rounded-[3px] border-[#013D9F] mt-4">
            {/* header */}
            <View className="p-2 bg-[#013D9F] rounded-[3px]">
              <Text className="text-white">Invoice Details</Text>
            </View>
            {/* header */}
            {/* invoice detail 1 */}
            <View className="p-2">
              <Text className="text-black">Eway Bill *</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={ewayBill1}
                  onChangeText={text => {
                    console.log(text);
                    setEwayBill1(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Amount</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={amount1}
                  onChangeText={text => {
                    console.log(text);
                    setAmount1(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Invoice No</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={invoiceNo1}
                  onChangeText={text => {
                    console.log(text);
                    setInvoiceNo1(text);
                  }}
                />
              </View>
            </View>
            {/* invoice detail 1 */}
            {/* invoice detail 2 */}
            {visibleInvoice > 1 ? (
              <>
                <View className="p-2">
                  <Text className="text-black">Eway Bill 2</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={ewayBill2}
                      onChangeText={text => {
                        console.log(text);
                        setEwayBill2(text);
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
                      value={amount2}
                      onChangeText={text => {
                        console.log(text);
                        setAmount2(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Invoice No 2</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={invoiceNo2}
                      onChangeText={text => {
                        console.log(text);
                        setInvoiceNo2(text);
                      }}
                    />
                  </View>
                </View>
              </>
            ) : null}
            {/* invoice detail 2 */}
            {/* invoice detail 3 */}
            {visibleInvoice > 2 ? (
              <>
                <View className="p-2">
                  <Text className="text-black">Eway Bill 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={ewayBill3}
                      onChangeText={text => {
                        console.log(text);
                        setEwayBill3(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Amount 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={amount3}
                      onChangeText={text => {
                        console.log(text);
                        setAmount3(text);
                      }}
                    />
                  </View>
                </View>
                <View className="p-2">
                  <Text className="text-black">Invoice No 3</Text>
                  <View className="border-[0.5px] rounded-[3px] border-gray-400">
                    <TextInput
                      style={{color: 'black'}}
                      selectionColor={'black'}
                      value={invoiceNo3}
                      onChangeText={text => {
                        console.log(text);
                        setInvoiceNo3(text);
                      }}
                    />
                  </View>
                </View>
              </>
            ) : null}
            {/* invoice detail 3 */}
            {/* additional Invoice and delete Invoice */}
            <View className="p-2 flex-row justify-between">
              <Pressable
                onPress={() => {
                  if (visibleInvoice < 3) {
                    setVisibleInvoice(visibleInvoice + 1);
                  }
                }}
                className="justify-center items-center p-2  rounded-[3px] bg-[#013D9F]">
                <Text className="text-white">+ Additional Invoice</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (visibleInvoice > 1) {
                    setVisibleInvoice(visibleInvoice - 1);
                  }
                }}
                className="justify-center items-center p-2  rounded-[3px] bg-[#013D9F]">
                <Text className="text-white">- Delete Invoice</Text>
              </Pressable>
            </View>
            {/* additional Invoice and delete invoice*/}
          </View>
          {/* <----------- Invoice Details ------------> */}

          {/* <-------------- Shipment Details ----------------> */}
          <View className="border-[0.5px] rounded-[3px] border-[#013D9F] mt-4">
            {/* header */}
            <View className="p-2 bg-[#013D9F] rounded-[3px]">
              <Text className="text-white">Shipment Details</Text>
            </View>
            <View className="p-2">
              <Text className="text-black">Product Description</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={productDescription}
                  onChangeText={text => {
                    console.log(text);
                    setProductDescription(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Reference Id *</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  value={referenceId}
                  onChangeText={text => {
                    console.log(text);
                    setRefrenceId(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Mode *</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  placeholder="Surface"
                  className="ml-2"
                  value={mode}
                  onChangeText={text => {
                    console.log(text);
                    setMode(text);
                  }}
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="text-black">Item Type *</Text>
              <View className="border-[0.5px] rounded-[3px] border-gray-400">
                <TextInput
                  style={{color: 'black'}}
                  selectionColor={'black'}
                  placeholder="DOX"
                  className="ml-2"
                  value={itemType}
                  onChangeText={text => {
                    console.log(text);
                    setItemType(text);
                  }}
                />
              </View>
            </View>
            {/* header */}
          </View>
          {/* <-------------- Shipment Details ----------------> */}

          {/* <-------------- Footer ----------------> */}
          <View className=" items-center mt-4 mb-4 flex-row justify-center">
            <Pressable
              onPress={() => {
                setVisibleBody(1);
              }}
              className="justify-center items-center  w-[81px] h-[28px] rounded-[3px] bg-[#DDDFDF] mr-4">
              <Text className="text-black">Back</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setVisibleBody(3);
              }}
              className="justify-center items-center  w-[81px] h-[28px] rounded-[3px] bg-[#013D9F]">
              <Text className="text-white">Next</Text>
            </Pressable>
          </View>
          {/* <-------------- Footer ----------------> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingBody2;
