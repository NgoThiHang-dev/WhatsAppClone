
import 'react-native-gesture-handler';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, Button, LogBox } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './constants/colors';

LogBox.ignoreLogs(['AsyncStorage has been extracted']);
// AsyncStorage.clear();

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsLoader, setAppIsLoader] = useState(false);
  useEffect(()=>{
    const prepare = async() => {
      try{
        await Font.loadAsync({
          "bold": require("./assets/fonts/OpenSans-Bold.ttf"),
          "boldItalic": require("./assets/fonts/OpenSans-BoldItalic.ttf"),
          "extraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
          "extraBoldItalic": require("./assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
          "italic": require("./assets/fonts/OpenSans-Italic.ttf"),
          "light": require("./assets/fonts/OpenSans-Light.ttf"),
          "lightItalic": require("./assets/fonts/OpenSans-LightItalic.ttf"),
          "medium": require("./assets/fonts/OpenSans-Medium.ttf"),
          "mediumItalic": require("./assets/fonts/OpenSans-MediumItalic.ttf"),
          "regular": require("./assets/fonts/OpenSans-Regular.ttf"),
          "semiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
          "semiBoldItalic": require("./assets/fonts/OpenSans-SemiBoldItalic.ttf"),
        });
      }catch(error){
        console.log(error);
      }finally{
        setAppIsLoader(true);
      }
      
    }
    prepare();
  }, []);

  const onLayoutView = useCallback(async() => {
    if(appIsLoader){
      await SplashScreen.hideAsync();
    }
  }, [appIsLoader])

  if(!appIsLoader){
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayoutView}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text1:{
    color: '#c1c1c1',
    fontSize: 18,
    // marginTop: 10, 
    // marginBottom: 10,
    color: 'black',
  }
});
