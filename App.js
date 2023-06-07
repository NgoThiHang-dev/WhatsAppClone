
import 'react-native-gesture-handler';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from './screens/ChatListScreen/ChatListScreen';
import ChatSettingScreen from './screens/ChatSettingScreen/ChatSettingScreen';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();


export default function App() {

  const [appIsLoader, setAppIsLoader] = useState(false);
  useEffect(()=>{
    const prepare = async() => {
      try{
        await Font.loadAsync({
          "black": require("./assets/fonts/OpenSans_Condensed-Bold.ttf")
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
    <SafeAreaProvider style={styles.container} onLayout={onLayoutView}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={ChatListScreen} />
            <Stack.Screen name="ChatSettings" component={ChatSettingScreen} 
              options={{gestureEnabled: false, headerTitle: 'Settings', animationEnabled: false, headerBackTitle: 'Back'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1:{
    color: '#c1c1c1',
    fontSize: 20,
    marginTop: 10, 
    marginBottom: 10,
    color: 'black',
  }
});
