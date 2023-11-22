package com.rightmovecli;
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import android.util.Log;
import java.util.Arrays;

public class WoosimBarcode {
    private static final String TAG = "WoosimService";
    private static final boolean D = false;
    private static final byte ESC = 27;
    private static final byte GS = 29;
    public static final int UPC_A = 65;
    public static final int UPC_E = 66;
    public static final int EAN13 = 67;
    public static final int EAN8 = 68;
    public static final int CODE39 = 69;
    public static final int ITF = 70;
    public static final int CODEBAR = 71;
    public static final int CODE93 = 72;
    public static final int CODE128 = 73;
    private static final int PDF417 = 0;
    private static final int DATAMATRIX = 1;
    private static final int QR_CODE = 2;
    private static final int MICRO_PDF417 = 3;
    private static final int TRUNC_PDF417 = 4;
    private static final int MAXICODE = 5;
    private static final int AZTEC = 6;

    public WoosimBarcode() {
    }

    public static byte[] createBarcode(int var0, int var1, int var2, byte var3, byte[] var4) {
        if (!validateBarcodeParameter(var1, var2, var0, var4)) {
            return null;
        } else {
            byte[] var5;
            byte[] var10000 = var5 = new byte[13];
            var5[0] = 29;
            var5[1] = 119;
            var5[2] = (byte)var1;
            var5[3] = 29;
            var5[4] = 104;
            var5[5] = (byte)var2;
            var5[6] = 29;
            var5[7] = 72;
            var5[8] = var3;
            var5[9] = 29;
            var5[10] = 107;
            var5[11] = (byte)var0;
            var10000[12] = (byte)var4.length;
            byte[] var6;
            var10000 = var6 = new byte[var10000.length + var4.length];
            var1 = var5.length;
            System.arraycopy(var5, 0, var6, 0, var1);
            var1 = var5.length;
            var2 = var4.length;
            System.arraycopy(var4, 0, var6, var1, var2);
            return var10000;
        }
    }

    private static boolean validateBarcodeParameter(int var0, int var1, int var2, byte[] var3) {
        boolean var10000 = true;
        String var10001;
        String var5;
        if (var1 >= 0 && var1 <= 255) {
            label237: {
                label236: {
                    byte var4;
                    switch (var2) {
                        case 65:
                        case 66:
                            if (var3.length >= 11 && var3.length <= 12) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) < 48 || var4 > 57) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        case 67:
                            if (var3.length >= 11 && var3.length <= 13) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) < 48 || var4 > 57) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        case 68:
                            if (var3.length >= 7 && var3.length <= 8) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) < 48 || var4 > 57) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        case 69:
                            if (var3.length >= 1 && var3.length <= 255) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) != 32 && var4 != 36 && var4 != 37 && var4 != 43 && var4 != 45 && var4 != 46 && var4 != 47 && (48 > var4 || var4 > 57) && (65 > var4 || var4 > 90)) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        case 70:
                            if (var3.length >= 1 && var3.length <= 255) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) < 48 || var4 > 57) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        case 71:
                            if (var3.length >= 1 && var3.length <= 255) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) != 36 && var4 != 43 && var4 != 45 && var4 != 46 && var4 != 47 && var4 != 58 && (48 > var4 || var4 > 57) && (65 > var4 || var4 > 68)) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        case 72:
                            if (var3.length >= 1 && var3.length <= 255) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) < 0 || var4 > 127) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        case 73:
                            if (var3.length >= 2 && var3.length <= 255) {
                                var0 = var3.length;

                                for(var1 = 0; var1 < var0; ++var1) {
                                    if ((var4 = var3[var1]) != 193 && var4 != 194 && var4 != 195 && var4 != 196 && (var4 < 0 || var4 > 127)) {
                                        break label236;
                                    }
                                }

                                return true;
                            }
                            break;
                        default:
                            var5 = "WoosimService";
                            var10001 = "Invalid barcode type";
                            break label237;
                    }

                    var5 = "WoosimService";
                    var10001 = "Invalid barcode length";
                    break label237;
                }

                var5 = "WoosimService";
                var10001 = "Invalid barcode value";
            }
        } else {
            var5 = "WoosimService";
            var10001 = "Invalid parameter at barcode height";
        }

        Log.e(var5, var10001);
        return false;
    }

    public static byte[] create2DBarcodePDF417(int var0, int var1, int var2, int var3, byte var4, byte[] var5) {
        if (checkInvalid2DBarcodeParameter(var0, var1, var2, var3, 0)) {
            return null;
        } else {
            byte[] var6;
            byte[] var10000 = var6 = new byte[6];
            var6[0] = 29;
            var6[1] = 119;
            var10000[2] = (byte)var0;
            var10000[3] = 29;
            var10000[4] = 72;
            var10000[5] = var4;
            byte[] var7 = make2DBarcode(0, var1, var2, var3, var5);
            byte[] var8;
            var10000 = var8 = new byte[var10000.length + var7.length];
            byte[] var10001 = var7;
            byte[] var10002 = var7;
            var0 = var6.length;
            System.arraycopy(var6, 0, var8, 0, var0);
            var0 = var6.length;
            var2 = var10002.length;
            System.arraycopy(var10001, 0, var8, var0, var2);
            return var10000;
        }
    }

    public static byte[] create2DBarcodeDataMatrix(int var0, int var1, int var2, byte[] var3) {
        return checkInvalid2DBarcodeParameter(2, var0, var1, var2, 1) ? null : make2DBarcode(1, var0, var1, var2, var3);
    }

    public static byte[] create2DBarcodeQRCode(int var0, byte var1, int var2, byte[] var3) {
        return checkInvalid2DBarcodeParameter(2, var0, var1, var2, 2) ? null : make2DBarcode(2, var0, var1, var2, var3);
    }

    public static byte[] create2DBarcodeMicroPDF417(int var0, int var1, int var2, int var3, byte[] var4) {
        if (checkInvalid2DBarcodeParameter(var0, var1, var2, var3, 3)) {
            return null;
        } else {
            byte[] var5;
            byte[] var10000 = var5 = new byte[3];
            var5[0] = 29;
            var5[1] = 119;
            var10000[2] = (byte)var0;
            byte[] var6 = make2DBarcode(3, var1, var2, var3, var4);
            byte[] var7;
            var10000 = var7 = new byte[var10000.length + var6.length];
            byte[] var10001 = var6;
            byte[] var10002 = var6;
            var0 = var5.length;
            System.arraycopy(var5, 0, var7, 0, var0);
            var0 = var5.length;
            var2 = var10002.length;
            System.arraycopy(var10001, 0, var7, var0, var2);
            return var10000;
        }
    }

    public static byte[] create2DBarcodeTruncPDF417(int var0, int var1, int var2, int var3, byte var4, byte[] var5) {
        if (checkInvalid2DBarcodeParameter(var0, var1, var2, var3, 4)) {
            return null;
        } else {
            byte[] var6;
            byte[] var10000 = var6 = new byte[6];
            var6[0] = 29;
            var6[1] = 119;
            var10000[2] = (byte)var0;
            var10000[3] = 29;
            var10000[4] = 72;
            var10000[5] = var4;
            byte[] var7 = make2DBarcode(4, var1, var2, var3, var5);
            byte[] var8;
            var10000 = var8 = new byte[var10000.length + var7.length];
            byte[] var10001 = var7;
            byte[] var10002 = var7;
            var0 = var6.length;
            System.arraycopy(var6, 0, var8, 0, var0);
            var0 = var6.length;
            var2 = var10002.length;
            System.arraycopy(var10001, 0, var8, var0, var2);
            return var10000;
        }
    }

    public static byte[] create2DBarcodeMaxicode(int var0, byte[] var1) {
        return checkInvalid2DBarcodeParameter(2, var0, 0, 0, 5) ? null : make2DBarcode(5, var0, 0, 0, var1);
    }

    public static byte[] create2DBarcodeAztec(int var0, int var1, int var2, byte[] var3) {
        return checkInvalid2DBarcodeParameter(2, var0, var1, var2, 6) ? null : make2DBarcode(6, var0, var1, var2, var3);
    }

    private static byte[] make2DBarcode(int var0, int var1, int var2, int var3, byte[] var4) {
        int var10000 = var4.length;
        byte var5 = (byte)(var4.length & 255);
        byte var6 = (byte)(var10000 >> 8 & 255);
        byte[] var7;
        byte[] var9 = var7 = new byte[10];
        var7[0] = 29;
        var7[1] = 90;
        var7[2] = (byte)var0;
        var7[3] = 27;
        var7[4] = 90;
        var7[5] = (byte)var1;
        var7[6] = (byte)var2;
        var9[7] = (byte)var3;
        var9[8] = var5;
        var9[9] = var6;
        byte[] var8;
        var9 = var8 = new byte[var9.length + var4.length];
        var1 = var7.length;
        System.arraycopy(var7, 0, var8, 0, var1);
        var1 = var7.length;
        var2 = var4.length;
        System.arraycopy(var4, 0, var8, var1, var2);
        return var9;
    }

    private static boolean checkInvalid2DBarcodeParameter(int var0, int var1, int var2, int var3, int var4) {
        boolean var10000 = true;
        String var10001;
        String var6;
        switch (var4) {
            case 0:
                if (var1 >= 1 && var1 <= 30) {
                    if (var2 >= 0 && var2 <= 8) {
                        if (var3 >= 2 && var3 <= 5) {
                            return false;
                        }

                        var6 = "WoosimService";
                        var10001 = "Invalid PDF417 horizontal and vertical ratio";
                        break;
                    }

                    var6 = "WoosimService";
                    var10001 = "Invalid PDF417 security level";
                    break;
                }

                var6 = "WoosimService";
                var10001 = "Invalid PDF417 column";
                break;
            case 1:
                if (var3 >= 1 && var3 <= 8) {
                    return false;
                }

                var6 = "WoosimService";
                var10001 = "Invalid DATAMATRIX module size";
                break;
            case 2:
                if (var1 >= 0 && var1 <= 40) {
                    byte var5;
                    if ((var5 = (byte)var2) != 76 && var5 != 77 && var5 != 81 && var5 != 72) {
                        var6 = "WoosimService";
                        var10001 = "Invalid QR-CODE EC level";
                        break;
                    }

                    if (var3 >= 1 && var3 <= 8) {
                        return false;
                    }

                    var6 = "WoosimService";
                    var10001 = "Invalid QR-CODE module size";
                    break;
                }

                var6 = "WoosimService";
                var10001 = "Invalid QR-CODE version";
                break;
            case 3:
                if (var1 >= 1 && var1 <= 4) {
                    if ((var2 < 4 || var2 > 44) && var2 != 0) {
                        var6 = "WoosimService";
                        var10001 = "Invalid Micro PDF417 row";
                    } else {
                        if (var3 >= 2 && var3 <= 5) {
                            return false;
                        }

                        var6 = "WoosimService";
                        var10001 = "Invalid Micro PDF417 horizontal and vertical ratio";
                    }
                } else {
                    var6 = "WoosimService";
                    var10001 = "Invalid Micro PDF417 column";
                }
                break;
            case 4:
                if (var1 >= 1 && var1 <= 4) {
                    if (var2 >= 0 && var2 <= 8) {
                        if (var3 >= 2 && var3 <= 5) {
                            return false;
                        }

                        var6 = "WoosimService";
                        var10001 = "Invalid Micro Truncated PDF417 horizontal and vertical ratio";
                        break;
                    }

                    var6 = "WoosimService";
                    var10001 = "Invalid Truncated PDF417 security level";
                    break;
                }

                var6 = "WoosimService";
                var10001 = "Invalid Truncated PDF417 column";
                break;
            case 5:
                if (var1 >= 2 && var1 <= 6) {
                    return false;
                }

                var6 = "WoosimService";
                var10001 = "Invalid Maxicode mode";
                break;
            case 6:
                if (var1 >= 0 && var1 <= 104 && (var1 <= 32 || var1 >= 101)) {
                    if (var2 >= 0 && var2 <= 3) {
                        if (var3 >= 1 && var3 <= 8) {
                            return false;
                        }

                        var6 = "WoosimService";
                        var10001 = "Invalid Aztec module size";
                        break;
                    }

                    var6 = "WoosimService";
                    var10001 = "Invalid Aztec error correction level";
                    break;
                }

                var6 = "WoosimService";
                var10001 = "Invalid Aztec layer";
                break;
            default:
                var6 = "WoosimService";
                var10001 = "Invalid 2D barcode type";
        }

        Log.e(var6, var10001);
        return true;
    }

    public static byte[] createGS1Databar(int var0, int var1, byte[] var2) {
        if (var2[var2.length - 1] == 0) {
            var2 = Arrays.copyOf(var2, var2.length - 1);
        }

        if (!validateGS1Parameter(var0, var1, var2)) {
            return null;
        } else {
            byte[] var3;
            byte[] var10000 = var3 = new byte[4];
            var3[0] = 29;
            var3[1] = 49;
            var3[2] = (byte)var0;
            var10000[3] = (byte)var1;
            byte[] var4;
            var10000 = var4 = new byte[var10000.length + var2.length + 1];
            byte[] var10002 = var3;
            var1 = var3.length;
            System.arraycopy(var3, 0, var4, 0, var1);
            var1 = var3.length;
            int var5 = var2.length;
            System.arraycopy(var2, 0, var4, var1, var5);
            var10000[var10002.length + var2.length] = 0;
            return var10000;
        }
    }

    private static boolean validateGS1Parameter(int var0, int var1, byte[] var2) {
        if (var0 >= 0 && var0 <= 6) {
            switch (var0) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    if (var2.length < 1 || var2.length > 13) {
                        Log.e("WoosimService", "Invalid data length:" + var2.length);
                        return false;
                    }

                    var0 = var2.length;

                    for(var1 = 0; var1 < var0; ++var1) {
                        byte var3;
                        if ((var3 = var2[var1]) < 48 || var3 > 57) {
                            Log.e("WoosimService", "Invalid data:" + var3);
                            return false;
                        }
                    }
                case 5:
                default:
                    break;
                case 6:
                    if (var1 < 2 || var1 > 20) {
                        Log.e("WoosimService", "Invalid parameter at GS1 databar segment per row");
                        return false;
                    }

                    if (var1 % 2 != 0) {
                        Log.e("WoosimService", "GS1 databar segment per row is not even number");
                        return false;
                    }
            }

            return true;
        } else {
            Log.e("WoosimService", "Invalid parameter at GS1 databar type");
            return false;
        }
    }
}
