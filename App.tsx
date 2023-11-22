import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import SplashScreen from './src/navigation/SplashScreen';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/redux/store';
import {RootNav} from './src/navigation/router';

const App = () => {
  const SplashScreenCall = (status: boolean) => {
    if (status) {
      return <SplashScreen />;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      SplashScreenCall(false);
    }, 2000);
    SplashScreenCall(true);
  }, []);

  return (
    <StoreProvider store={store}>
      <NativeBaseProvider>
        <PaperProvider>
          <RootNav />
        </PaperProvider>
      </NativeBaseProvider>
    </StoreProvider>
  );
};

export default App;
