import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {createPdf} from 'react-native-images-to-pdf';
import RNFS from 'react-native-fs';

const Test = () => {
  const viewShotRef = useRef<any>();
  const [screenshotUri, setScreenshotUri] = useState(null);

  const captureScreenshot = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      setScreenshotUri(uri);
      console.log('Screenshot captured:', uri);

      const options = {
        pages: [`${uri}`],
        outputDirectory: `${RNFS.DownloadDirectoryPath}`,
        outputFilename: 'output.pdf',
      };

      createPdf(options)
        .then(path => console.log(`PDF created successfully: ${path}`))
        .catch(error => console.log(`Failed to create PDF: ${error}`));
      // You can save the screenshot or perform further actions with the URI
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  };
  return (
    <View>
      <ScrollView>
        <ViewShot ref={viewShotRef}>
          <Text className="text-black">
            ...The Scroll View Content Goes Here...
          </Text>
          <Text className="text-black">
            ...The Scroll View Content Goes Here...
          </Text>
          <Text className="text-black">
            ...The Scroll View Content Goes Here...
          </Text>

          <Text className="text-black">
            ...The Scroll View Content Goes Here...
          </Text>
          <Text className="text-black">
            ...The Scroll View Content Goes Here...
          </Text>
        </ViewShot>
      </ScrollView>

      <TouchableOpacity onPress={captureScreenshot}>
        <Text className="text-black">Capture Screenshot</Text>
      </TouchableOpacity>
      {screenshotUri && (
        <View>
          <Text>Image Preview:</Text>
          <Image
            resizeMode="contain"
            source={{uri: screenshotUri}}
            style={{width: 200, height: 200}}
          />
        </View>
      )}
    </View>
  );
};
export default Test;
