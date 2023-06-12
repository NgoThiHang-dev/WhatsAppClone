import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ChatListScreen from '../screens/ChatListScreen/ChatListScreen';
import ChatSettingScreen from '../screens/ChatSettingScreen/ChatSettingScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () =>{
    return (
      <Tab.Navigator 
      screenOptions={{headerTitle: '', elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0, headerShadowVisible: false  }}
      
      >
        <Tab.Screen name="ChatList" component={ChatListScreen} 
          options={{
            tabBarLabel: 'Chats', 
            tabBarIcon: ({size, color})=>{ // cach 1: {size, color}
              return <Ionicons name="chatbubble-outline" size={size} color={color} />
            }
          }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} 
          options={{
            tabBarLabel: 'Settings', 
            tabBarIcon: (props)=>{ // cach 2: props
              // console.log(props);
              return <Ionicons name="ios-settings-outline" size={props.size} color={props.color} />
            }
          }}/>
      </Tab.Navigator>
    )
  }

const MainNavigator = props => {
  return (
    <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Home" component={TabNavigator} options={{headerShown:false}}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} 
              options={{gestureEnabled: false, headerTitle: 'ChatScreen', animationEnabled: false, headerBackTitle: 'Back'}}
          />
          <Stack.Screen name="ChatSettings" component={ChatSettingScreen} 
              options={{gestureEnabled: false, headerTitle: 'Settings', animationEnabled: false, headerBackTitle: 'Back'}}
          />
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'containedModal'}}>
          <Stack.Screen name="NewChat" component={NewChatScreen} 
          />
        </Stack.Group>
        
        
    </Stack.Navigator>
  )
}

export default MainNavigator
