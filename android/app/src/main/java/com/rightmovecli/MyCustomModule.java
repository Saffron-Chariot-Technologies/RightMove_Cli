package com.rightmovecli;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyCustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactApplicationContext;
    MyCustomModule(ReactApplicationContext reactContext){
        super(reactContext);
        reactApplicationContext= reactContext;
    }
    @NonNull
    @Override
    public String getName() {
        return "XYZ";
    }
    @ReactMethod
    public void goToNextScreen(String data,boolean isLevel,String fPath){
        Intent intent= new Intent(reactApplicationContext, DemoActivity.class);
        Log.d("DataTransferModule", "Received data from React Native: " + data);
        Log.d("DataTransferModule", "Received data from React Native: " + isLevel);
        Log.d("DataTransferModule", "Received data from React Native: " + fPath);
        intent.putExtra("image_url", data); // Replace "key" with your desired key and data with the actual data to be passed
        intent.putExtra("isLevel", isLevel); // Replace "key" with your desired key and data with the actual data to be passed
        intent.putExtra("fPath", fPath); // Replace "key" with your desired key and data with the actual data to be passed
        getCurrentActivity().startActivity(intent);
    }
    @ReactMethod
    public void sendData(String data) {
        // Handle the received data from React Native
        // Perform any necessary operations with the data
        Log.d("DataTransferModule", "Received data from React Native: " + data);

        Context context = getReactApplicationContext();

        Toast.makeText(context, "Received data: " + data, Toast.LENGTH_SHORT).show();

    }

}
