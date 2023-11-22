package com.rightmovecli;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.pdf.PdfRenderer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.os.ParcelFileDescriptor;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.ref.WeakReference;


public class DemoActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private static final boolean D = true;

    // Message types sent from the BluetoothPrintService Handler
    public static final int MESSAGE_DEVICE_NAME = 1;
    public static final int MESSAGE_TOAST = 2;
    public static final int MESSAGE_READ = 3;

    // Key names received from the BluetoothPrintService Handler
    public static final String DEVICE_NAME = "device_name";
    public static final String TOAST = "toast";

    // Intent request codes
    private static final int REQUEST_CONNECT_DEVICE_SECURE = 1;
    private static final int REQUEST_CONNECT_DEVICE_INSECURE = 2;
    private static final int REQUEST_ENABLE_BT = 3;

    private static final int PERMISSION_DEVICE_SCAN_SECURE = 11;
    private static final int PERMISSION_DEVICE_SCAN_INSECURE = 12;

    // Layout Views
    private boolean mEmphasis = false;
    private boolean mUnderline = false;
    private int mCharsize = 1;
    private int mJustification = WoosimCmd.ALIGN_LEFT;
    private TextView mTrack1View;
    private TextView mTrack2View;
    private TextView mTrack3View;
    private Menu mMenu = null;

    // Local Bluetooth adapter
    private BluetoothAdapter mBluetoothAdapter = null;
    // Member object for the print services
    private BluetoothPrintService mPrintService = null;
    private WoosimService mWoosim = null;
    Button btn;
    private Uri selectedImageUri;
    private Uri selectedPdfUri;
    private String Token;
    public boolean isLevel = false;

    private  final int GALLERY_REQ_CODE = 1000;
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ImageView imageView = findViewById(R.id.image_id);


        if(D) Log.i(TAG, "+++ ON CREATE +++");
        // Get local Bluetooth adapter
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        // If the adapter is null, then Bluetooth is not supported
        if (mBluetoothAdapter == null) {
            Toast.makeText(this, R.string.toast_bt_na, Toast.LENGTH_LONG).show();
            finish();
        }
        /////////get url/////////
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            String data = extras.getString("image_url"); // Replace "key" with the same key used in the source screen
            // Use the received data as needed
            Log.i(TAG, "+++ ON DATA RECEIVE +++" + data);
            Uri imageUri = Uri.parse(data);
            imageView.setImageURI(imageUri);
            if (data != null){
                selectedImageUri = Uri.parse(data.toString());
            }
            isLevel = extras.getBoolean("isLevel"); // Replace "key" with the same key used in the source screen
            Log.i(TAG, "+++ ON isLevel RECEIVE +++" + isLevel);
            String fPath = extras.getString("fPath"); // Replace "key" with the same key used in the source screen
            File file = new File(fPath);
            Uri fileUri = Uri.fromFile(file);

            String contentUri = "file://" + fileUri.getPath();
            selectedPdfUri= Uri.parse(contentUri);
            Log.i(TAG, "+++ ON PDF contentUri PATH +++" + selectedPdfUri);
            File pdfFile = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), fPath);



        }
        ////////////////////

    }




    @SuppressLint("MissingPermission")
    @Override
    public void onStart() {
        super.onStart();
        if(D) Log.i(TAG, "++ ON START ++");
        setupPrint();
        // If BT is not on, request that it be enabled.
        // setupPrint() will then be called during onActivityResult
//        if (!mBluetoothAdapter.isEnabled()) {
//            Log.i(TAG, "++  DISABLED ++");
//            Intent enableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
//            startActivityForResult(enableIntent, REQUEST_ENABLE_BT);
//
//
//            // Otherwise, setup the chat session
//        } else {
//            Log.i(TAG, "++ ENABLED ++");
//
//            if (mPrintService == null)  setupPrint();
//        }
    }


    @Override
    public synchronized void onResume() {
        super.onResume();
        if(D) Log.i(TAG, "+ ON RESUME +");

        // Performing this check in onResume() covers the case in which BT was
        // not enabled during onStart(), so we were paused to enable it...
        // onResume() will be called when ACTION_REQUEST_ENABLE activity returns.
        if (mPrintService != null) {
            // Only if the state is STATE_NONE, do we know that we haven't started already
            if (mPrintService.getState() == BluetoothPrintService.STATE_NONE) {
                // Start the Bluetooth print services
                mPrintService.start();
            }
        }
    }

    private void setupPrint() {
        Spinner spinner = findViewById(R.id.spn_charsize);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                this, R.array.char_size_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        if (spinner != null) {
            spinner.setAdapter(adapter);
            spinner.setOnItemSelectedListener(
                    new OnItemSelectedListener() {
                        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                            if (position == 1) mCharsize = 2;
                            else if (position == 2) mCharsize = 3;
                            else if (position == 3) mCharsize = 4;
                            else if (position == 4) mCharsize = 5;
                            else if (position == 5) mCharsize = 6;
                            else if (position == 6) mCharsize = 7;
                            else if (position == 7) mCharsize = 8;
                            else mCharsize = 1;
                        }
                        public void onNothingSelected(AdapterView<?> parent) { }
                    }
            );
        }



        // Initialize the BluetoothPrintService to perform bluetooth connections
        mPrintService = new BluetoothPrintService(mHandler);
//        mWoosim = new WoosimService(mHandler);
    }

    // The Handler that gets information back from the BluetoothPrintService
    private final MyHandler mHandler = new MyHandler(this);

    private static class MyHandler extends Handler {
        private final WeakReference<DemoActivity> mActivity;

        MyHandler(DemoActivity activity) {
            mActivity = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            DemoActivity activity = mActivity.get();
            if (activity != null) {
                activity.handleMessage(msg);
            }
        }
    }


    private void handleMessage(Message msg) {
        switch (msg.what) {
            case MESSAGE_DEVICE_NAME:
                // save the connected device's name
                String mConnectedDeviceName = msg.getData().getString(DEVICE_NAME);
                Toast.makeText(getApplicationContext(), "Connected to " + mConnectedDeviceName, Toast.LENGTH_SHORT).show();
                redrawMenu();
                break;
            case MESSAGE_TOAST:
                Toast.makeText(getApplicationContext(), msg.getData().getInt(TOAST), Toast.LENGTH_SHORT).show();
                break;
            case MESSAGE_READ:
                mWoosim.processRcvData((byte[])msg.obj, msg.arg1);
                break;
            case WoosimService.MESSAGE_PRINTER:
                if (msg.arg1 == WoosimService.MSR) {
                    if (msg.arg2 == 0) {
                        Toast.makeText(getApplicationContext(), "MSR reading failure", Toast.LENGTH_SHORT).show();
                    } else {
                        byte[][] track = (byte[][]) msg.obj;
                        if (track[0] != null) {
                            String str = new String(track[0]);
                            mTrack1View.setText(str);
                        }
                        if (track[1] != null) {
                            String str = new String(track[1]);
                            mTrack2View.setText(str);
                        }
                        if (track[2] != null) {
                            String str = new String(track[2]);
                            mTrack3View.setText(str);
                        }
                    }
                }
                break;
        }
    }


    @Override
    public synchronized void onPause() {
        super.onPause();
        if(D) Log.i(TAG, "- ON PAUSE -");
    }


    @Override
    public void onStop() {
        super.onStop();
        if(D) Log.i(TAG, "-- ON STOP --");
    }

    @Override
    public void onDestroy() {
        if(D) Log.i(TAG, "--- ON DESTROY ---");
        // Stop the Bluetooth print services
        if (mPrintService != null) mPrintService.stop();
        super.onDestroy();
    }

     @Override
     public boolean onCreateOptionsMenu(Menu menu) {
         getMenuInflater().inflate(R.menu.menu_main, menu);
         menu.findItem(R.id.disconnect).setVisible(false);
         mMenu = menu;
         return true;
     }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Intent serverIntent;
        int permissionCheck;
        int id = item.getItemId();
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();



        if (id == R.id.back) {
            // Handle the back button click event here
            onBackPressed();

            return true; // Return true to indicate that the event has been handled.
        }
        switch (item.getItemId()) {

            case R.id.insecure_connect_scan:
                permissionCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION);
                if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
                    // Launch the DeviceListActivity to see devices and do scan
                    serverIntent = new Intent(this, DeviceListActivity.class);
                    startActivityForResult(serverIntent, REQUEST_CONNECT_DEVICE_INSECURE);
                } else {
                    ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, PERMISSION_DEVICE_SCAN_INSECURE);
                }
                return true;
            case R.id.disconnect:
                // Close Bluetooth connection
                if (mPrintService != null)
                    mPrintService.start();
                redrawMenu();
                return true;
        }
        return false;
    }

    private void redrawMenu() {
//        MenuItem itemSecureConnect = mMenu.findItem(R.id.secure_connect_scan);
        MenuItem itemInsecureConnect = mMenu.findItem(R.id.insecure_connect_scan);
        MenuItem itemDisconnect = mMenu.findItem(R.id.disconnect);

        // Context sensitive option menu
        if (mPrintService.getState() != BluetoothPrintService.STATE_CONNECTED) {
//            if (!itemSecureConnect.isVisible()) itemSecureConnect.setVisible(true);
            if (!itemInsecureConnect.isVisible()) itemInsecureConnect.setVisible(true);
            if (itemDisconnect.isVisible()) itemDisconnect.setVisible(false);
        } else {
//            if (itemSecureConnect.isVisible()) itemSecureConnect.setVisible(false);
            if (itemInsecureConnect.isVisible()) itemInsecureConnect.setVisible(false);
            if (!itemDisconnect.isVisible()) itemDisconnect.setVisible(true);
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case PERMISSION_DEVICE_SCAN_SECURE:
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Intent intent = new Intent(this, DeviceListActivity.class);
                    startActivityForResult(intent, REQUEST_CONNECT_DEVICE_SECURE);
                }
                break;
            case PERMISSION_DEVICE_SCAN_INSECURE:
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Intent intent = new Intent(this, DeviceListActivity.class);
                    startActivityForResult(intent, REQUEST_CONNECT_DEVICE_INSECURE);
                }


                break;
        }
    }


    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        switch (requestCode) {
            case REQUEST_CONNECT_DEVICE_SECURE:
                // When DeviceListActivity returns with a device to connect
                if (resultCode == Activity.RESULT_OK) {
                    connectDevice(data, true);
                }
                break;
            case REQUEST_CONNECT_DEVICE_INSECURE:
                // When DeviceListActivity returns with a device to connect
                if (resultCode == Activity.RESULT_OK) {
                    connectDevice(data, false);
                }
                break;

            case REQUEST_ENABLE_BT:
                // When the request to enable Bluetooth returns
                if (resultCode == Activity.RESULT_OK) {
                    // Bluetooth is now enabled, so set up a print
                    setupPrint();
                } else {
                    // User did not enable Bluetooth or an error occurred
                    if (D) Log.d(TAG, "BT not enabled");
                    Toast.makeText(this, R.string.bt_not_enabled_leaving, Toast.LENGTH_SHORT).show();
                    finish();
                }
        }
    }



    private void connectDevice(Intent data, boolean secure) {
        String address = null;
        // Get the device MAC address
        if (data.getExtras() != null)
            address = data.getExtras().getString(DeviceListActivity.EXTRA_DEVICE_ADDRESS);
        // Get the BLuetoothDevice object
        BluetoothDevice device = mBluetoothAdapter.getRemoteDevice(address);
        // Attempt to connect to the device
        mPrintService.connect(device, secure);
    }


    private void sendData(byte[] data) {
        // Check that we're actually connected before trying printing
        if (mPrintService.getState() != BluetoothPrintService.STATE_CONNECTED) {
            Toast.makeText(this, R.string.not_connected, Toast.LENGTH_SHORT).show();
            return;
        }
        // Check that there's actually something to send
        if (data.length > 0)
            mPrintService.write(data);
    }


    /**
     * print PDF file.
     * @param file PDF file to be printed.
     */


    /**
     * On click function for sample print button.
     */
    public void printReceipt(View v) {
        InputStream inStream = getResources().openRawResource(R.raw.receipt2);
        sendData(WoosimCmd.initPrinter());
        try {
            byte[] data = new byte[0];
            try {
                data = new byte[inStream.available()];
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            while (inStream.read(data) != -1)
            {
                sendData(data);
            }
        } catch (IOException e) {
            Log.e(TAG, "sample 2inch receipt print fail.", e);
        } finally {
            try {
                inStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    ///Print Image
    public void printImage(View v) throws IOException {
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inScaled = false;
//        Bitmap bmp = BitmapFactory.decodeResource(getResources(), R.drawable.jaga, options);


        InputStream inputStream = getContentResolver().openInputStream(selectedImageUri);

        // Decode the input stream into a bitmap
        Bitmap bitmap = BitmapFactory.decodeStream(inputStream);

        // Close the input stream
        inputStream.close();
        if (bitmap == null) {
            Log.e(TAG, "resource decoding is failed");
            return;
        }
        int imageHeight = bitmap.getHeight();
        int imageWidth = bitmap.getWidth();
        Log.e(TAG, "resource height " + imageHeight);
        Log.e(TAG, "resource width " + imageWidth);

// Define the desired width and height
        int desiredWidth = 500;
        int desiredHeight = 300;

// Resize the image
// Define the desired maximum width and height
        int maxWidth = 800;
        int maxHeight = 600;

// Get the original dimensions of the image
        int originalWidth = bitmap.getWidth();
        int originalHeight = bitmap.getHeight();

// Calculate the new dimensions while maintaining the aspect ratio
        int newWidth, newHeight;
        if (originalWidth > originalHeight) {
            // Landscape image
            newWidth = maxWidth;
            newHeight = (int) (((float) originalHeight / originalWidth) * maxWidth);
        } else {
            // Portrait or square image
            newHeight = maxHeight;
            newWidth = (int) (((float) originalWidth / originalHeight) * maxHeight);
        }

        // Resize the image
        Bitmap resizedBitmap = Bitmap.createScaledBitmap(bitmap, 800, originalHeight, true);

        byte[] data = WoosimImage.printBitmap(0, 0, 800, imageHeight, resizedBitmap);
        bitmap.recycle();
        sendData(WoosimCmd.setPageMode());
        sendData(data);
        sendData(WoosimCmd.PM_setStdMode());
    }


    public void printBase64Pdf(View v) throws IOException {

                sendData(WoosimCmd.setPageMode());
                try {

                    File cacheFile = new File(getCacheDir(), "cached_pdf.pdf");


                    try (InputStream inputStream = getContentResolver().openInputStream(selectedPdfUri);
                         OutputStream outputStream = new FileOutputStream(cacheFile)) {
                        byte[] buffer = new byte[1024];
                        int read;
                        while ((read = inputStream.read(buffer)) != -1) {
                            outputStream.write(buffer, 0, read);
                        }

                    } catch (IOException e) {
                        e.printStackTrace();
                    }


                    ParcelFileDescriptor pfd = ParcelFileDescriptor.open(cacheFile, ParcelFileDescriptor.MODE_READ_ONLY);
                    PdfRenderer renderer = new PdfRenderer(pfd);


                    int paperWidth = 850; // Adjust paper width according to your requirement

                    for (int i = 0; i < renderer.getPageCount(); i++) {
                        PdfRenderer.Page page = renderer.openPage(i);
                        Bitmap bmp;
//                            Bitmap bmp = Bitmap.createBitmap(
//                                    (int) (paperWidth*1.6),
//                                    paperWidth,
//                                    Bitmap.Config.ARGB_8888);
                        if(isLevel){
                            bmp = Bitmap.createBitmap(
                                    (int) (paperWidth*1.6),
                                    paperWidth,
                                    Bitmap.Config.ARGB_8888);
                        }else {
                            bmp = Bitmap.createBitmap(
                                    paperWidth,
                                    (int) (paperWidth*1.6),
                                    Bitmap.Config.ARGB_8888);
                        }

                            Log.i(TAG,"-----BMP TRUE--------" + bmp);
                        Log.i(TAG,"-----BMP isLevel--------" + isLevel);

                            page.render(bmp, null, null, PdfRenderer.Page.RENDER_MODE_FOR_PRINT);
                            if(isLevel){
                                sendData(WoosimImage.printBitmapLandscape(0, 0, bmp.getHeight(), bmp.getWidth(), bmp));

                            }else{
                                sendData(WoosimImage.printCompressedBitmap(0, 0, bmp.getHeight(), bmp.getWidth(), bmp));

                            }
                            bmp.recycle();
                            page.close();
                        }




                    sendData(WoosimCmd.PM_setStdMode());
                    renderer.close();
                    File fileToDelete = new File(selectedPdfUri.getPath());
                    fileToDelete.delete();
                    cacheFile.delete();

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }




}



//else{
//
//        Bitmap bmp = Bitmap.createBitmap(
//        paperWidth, page.getHeight()*paperWidth/page.getWidth(), Bitmap.Config.ARGB_8888);
//        Log.i(TAG,"-----BMP FALSE--------" + bmp);
//
//        page.render(bmp, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY);
//        sendData(WoosimImage.bmp2PrintableImage(0, 0, bmp.getWidth(), bmp.getHeight(), bmp));
//        bmp.recycle();
//        page.close();
//        }