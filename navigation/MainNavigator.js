import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ChatListScreen from '../screens/ChatListScreen/ChatListScreen';
import ChatSettingScreen from '../screens/ChatSettingScreen/ChatSettingScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { child, get, getDatabase, off, onValue, ref } from 'firebase/database';
import { getFirebaseApp } from '../untils/firebaseHelper';
import { setChatsData } from '../store/chatSlice';
import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import { setStoredUsers } from '../store/userSlide';
import { setChatMessages } from '../store/messagesSlide';


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

const StackNavigator = props => {
  return (
    <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Home" component={TabNavigator} options={{headerShown:false}}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} 
              options={{gestureEnabled: false, headerTitle: '', animationEnabled: false, headerBackTitle: 'Back'}}
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

const MainNavigator = props => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.users.storedUsers);

  useEffect(()=>{
    console.log("Subscribing to firebase listeners");
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    const userChatRef = child(dbRef, `userChats/${userData.userID}`);
    const refs = [userChatRef];

    onValue(userChatRef, (querySnapshot)=>{
      // console.log(querySnapshot.val()) 
      const chatIdsData = querySnapshot.val() || {};
      const chatIds = Object.values(chatIdsData);

      const chatsData = {};
      let chatsFoundCount = 0;

      for(let i=0; i< chatIds.length; i++){
        const chatId = chatIds[i];
        const chatRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatRef);

        onValue(chatRef, (chatSnapshot)=>{
          chatsFoundCount++;

          const data = chatSnapshot.val();

          if(data){
            data.key= chatSnapshot.key;

            data.users.forEach(userId =>{
              if(storedUsers[userId]) return;

              const userRef = child(dbRef, `users/${userId}`);

              console.log("userId ddddddddddddddddd", userId);

              get(userRef).then(userSnapshot =>{
                console.log("userSnapshot", userSnapshot);


                const userSnapshotData = userSnapshot.val();
                dispatch(setStoredUsers({newUsers: {userSnapshotData}}))
              })

              refs.push(userRef);

            })

            chatsData[chatSnapshot.key] = data;

          }

          if(chatsFoundCount >=chatIds.length){
            dispatch(setChatsData({chatsData}));
            setIsLoading(false);
          }
        })

        const messagesRef = child(dbRef, `messages/${chatId}`);
        refs.push(messagesRef);

        onValue(messagesRef, messagesSnapshot =>{
          const messagesData = messagesSnapshot.val();

          dispatch(setChatMessages({chatId, messagesData}));
        })

        if(chatsFoundCount == 0){
          setIsLoading(false);
        }

      }



    })
    return ()=>{
      console.log('Unsubscribing to firebase listeners');
      refs.forEach(ref =>off(ref));
    }

  },[])

  if(isLoading){
    <View style={commonStyles.center}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
  }

  return (
    <StackNavigator/>
  );
}

export default MainNavigator
