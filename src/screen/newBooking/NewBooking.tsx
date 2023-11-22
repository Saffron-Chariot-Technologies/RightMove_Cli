import React, {useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import BookingHeader from './component/BookingHeader';
import BookingBody1 from './component/BookingBody1';
import BookingBody2 from './component/BookingBody2';
import BookingBody3 from './component/BookingBody3';

const NewBooking = () => {
  // header
  const [courierActive, setCourierActive] = useState(true);
  const [expressActive, setExpressActive] = useState(false);
  const [cargoActive, setCargoActive] = useState(false);

  // Visible body
  const [visibleBody, setVisibleBody] = useState(1);

  // BODY part1
  const [manual, setManual] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [clientName, setClientName] = useState('');
  const [pickupLocations, setPickupLocations] = useState('');
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [oda, setOda] = useState('');
  const [saveAddressForFuture, setSaveAddressForFuture] = useState('');

  // BODY part2
  const [paid, setPaid] = useState(false);
  const [topay, setTopay] = useState(false);
  const [cod, setCod] = useState(false);
  const [topayCod, setTopayCod] = useState(false);
  const [ownerRisk, setOwnerRisk] = useState(false);
  const [carrierRisk, setCarrierRisk] = useState(false);

  const [ewayBill1, setEwayBill1] = useState('');
  const [amount1, setAmount1] = useState('');
  const [invoiceNo1, setInvoiceNo1] = useState('');

  const [ewayBill2, setEwayBill2] = useState('');
  const [amount2, setAmount2] = useState('');
  const [invoiceNo2, setInvoiceNo2] = useState('');

  const [ewayBill3, setEwayBill3] = useState('');
  const [amount3, setAmount3] = useState('');
  const [invoiceNo3, setInvoiceNo3] = useState('');

  const [productDescription, setProductDescription] = useState('');
  const [referenceId, setRefrenceId] = useState('');
  const [mode, setMode] = useState('');
  const [itemType, setItemType] = useState('');

  // BODY part 3
  const [pcs, setPcs] = useState('');
  const [totalWt, setTotalWt] = useState('');

  const [unit1, setUnit1] = useState('');
  const [length1, setLength1] = useState('');
  const [height1, setHeight1] = useState('');
  const [qty1, setQty1] = useState('');
  const [width1, setWidth1] = useState('');

  const [unit2, setUnit2] = useState('');
  const [length2, setLength2] = useState('');
  const [height2, setHeight2] = useState('');
  const [qty2, setQty2] = useState('');
  const [width2, setWidth2] = useState('');

  const [unit3, setUnit3] = useState('');
  const [length3, setLength3] = useState('');
  const [height3, setHeight3] = useState('');
  const [qty3, setQty3] = useState('');
  const [width3, setWidth3] = useState('');

  const [otherCharges, setOtherCharges] = useState('');
  const [adjustment, setAdjustment] = useState('');
  const [shipmentCost, setShipmentCost] = useState('');

  const [file, setFile] = useState('');

  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor="#013D9F" barStyle="light-content" />

      {/* header */}
      <BookingHeader
        courierActive={courierActive}
        setCourierActive={setCourierActive}
        expressActive={expressActive}
        setExpressActive={setExpressActive}
        cargoActive={cargoActive}
        setCargoActive={setCargoActive}
      />
      {/* header */}

      {/* body */}
      {visibleBody == 1 ? (
        <>
          <BookingBody1
            setVisibleBody={setVisibleBody}
            manual={manual}
            setManual={setManual}
            automatic={automatic}
            setAutomatic={setAutomatic}
            clientName={clientName}
            setClientName={setClientName}
            pickupLocations={pickupLocations}
            setPickupLocations={setPickupLocations}
            name={name}
            setName={setName}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            pincode={pincode}
            setPincode={setPincode}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            state={state}
            setState={setState}
            email={email}
            setEmail={setEmail}
            oda={oda}
            setOda={setOda}
            saveAddressForFuture={saveAddressForFuture}
            setSaveAddressForFuture={setSaveAddressForFuture}
          />
        </>
      ) : null}

      {visibleBody == 2 ? (
        <>
          <BookingBody2
            setVisibleBody={setVisibleBody}
            // frieght
            paid={paid}
            setPaid={setPaid}
            topay={topay}
            setTopay={setTopay}
            cod={cod}
            setCod={setCod}
            topayCod={topayCod}
            setTopayCod={setTopayCod}
            // insurance type
            ownerRisk={ownerRisk}
            setOwnerRisk={setOwnerRisk}
            carrierRisk={carrierRisk}
            setCarrierRisk={setCarrierRisk}
            // invoice detail 1
            ewayBill1={ewayBill1}
            setEwayBill1={setEwayBill1}
            amount1={amount1}
            setAmount1={setAmount1}
            invoiceNo1={invoiceNo1}
            setInvoiceNo1={setInvoiceNo1}
            // invoice detail 2
            ewayBill2={ewayBill2}
            setEwayBill2={setEwayBill2}
            amount2={amount2}
            setAmount2={setAmount2}
            invoiceNo2={invoiceNo2}
            setInvoiceNo2={setInvoiceNo2}
            // invoice detail 3
            ewayBill3={ewayBill3}
            setEwayBill3={setEwayBill3}
            amount3={amount3}
            setAmount3={setAmount3}
            invoiceNo3={invoiceNo3}
            setInvoiceNo3={setInvoiceNo3}
            // shipment details
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            referenceId={referenceId}
            setRefrenceId={setRefrenceId}
            mode={mode}
            setMode={setMode}
            itemType={itemType}
            setItemType={setItemType}
          />
        </>
      ) : null}

      {visibleBody == 3 ? (
        <>
          <BookingBody3
            setVisibleBody={setVisibleBody}
            pcs={pcs}
            setPcs={setPcs}
            totalWt={totalWt}
            setTotalWt={setTotalWt}
            // dimension 1
            unit1={unit1}
            setUnit1={setUnit1}
            length1={length1}
            setLength1={setLength1}
            height1={height1}
            setHeight1={setHeight1}
            qty1={qty1}
            setQty1={setQty1}
            width1={width1}
            setWidth1={setWidth1}
            // dimension 2
            unit2={unit2}
            setUnit2={setUnit2}
            length2={length2}
            setLength2={setLength2}
            height2={height2}
            setHeight2={setHeight2}
            qty2={qty2}
            setQty2={setQty2}
            width2={width2}
            setWidth2={setWidth2}
            // dimension 3
            unit3={unit3}
            setUnit3={setUnit3}
            length3={length3}
            setLength3={setLength3}
            height3={height3}
            setHeight3={setHeight3}
            qty3={qty3}
            setQty3={setQty3}
            width3={width3}
            setWidth3={setWidth3}
            // other charges 3
            otherCharges={otherCharges}
            setOtherCharges={setOtherCharges}
            adjustment={adjustment}
            setAdjustment={setAdjustment}
            shipmentCost={shipmentCost}
            setShipmentCost={setShipmentCost}
            // file upload
            file={file}
            setFile={setFile}
          />
        </>
      ) : null}
      {/* body */}
    </View>
  );
};

export default NewBooking;
