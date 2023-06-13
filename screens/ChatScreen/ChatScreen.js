import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import backgroundImage from '../../assets/images/background-whatapp.jpg'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { useSelector } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import Bubble from '../../components/Bubble';
import { createChat, sendTextMessage } from '../../untils/actions/chatAction';

const ChatScreen = props => {
    const [messageText, setMessageText] = useState("");
    const [chatUsers, setChatUsers]= useState([]);

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state=> state.users.storedUsers);
    const storedChats = useSelector(state=> state.chats.chatsData);

    const [errorBannerText, setErrorBannerText] = useState("");

    const [chatId, setChatId] = useState(props.route?.params?.chatId);
    const chatData = (chatId && storedChats[chatId]) || props.route?.params?.newChatData;

    const chatMessages = useSelector(state => {
        if(!chatId) return [];
        const chatMessagesData =  state.messages.messagesData[chatId];
        if(!chatMessagesData) return [];

        const messagesList = [];
        for(const key in chatMessagesData){
            const message = chatMessagesData[key];
            messagesList.push({
                key,
                ...message
            });
        }
        return messagesList;
    });

    console.log("chatMessages");
    console.log(chatMessages);


    const getChatTitleFromName = () =>{
        const otherUserId = chatUsers.find(uid => uid !== userData.userID); //tim ID khac voi ID da dang nhap
        const otherUserData = storedUsers[otherUserId];
        return otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`;
    }

    useEffect(()=>{
        props.navigation.setOptions({
           headerTitle: getChatTitleFromName(),
           headerTitleAlign: 'center'
        })

        setChatUsers(chatData.users)
    }, [chatUsers])


    const sendMessage = useCallback(async()=>{
        try {
            let id = chatId;

            if(!id){
                id = await createChat(userData.userID, props.route.params.newChatData);
                setChatId(id);
            }

            await sendTextMessage(chatId, userData.userID, messageText);
            setMessageText("");

        } catch (error) {
            console.log(error);
            setErrorBannerText("Message failed to send");
            setTimeout(() => {
                setErrorBannerText("");
            }, 5000);
        }

    },[messageText, chatId])

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
            <KeyboardAvoidingView 
                style={styles.screen} 
                behavior={Platform.OS === 'ios' ? 'padding': undefined} 
                keyboadVerticalOffset={100}
            >
                <ImageBackground source={backgroundImage} style={styles.bgImage}>
                    <PageContainer style={{backgroundColor: 'transparent'}}>

                        {!chatId && <Bubble text="This is new chat. Say hi!" type="system"/>}

                        {errorBannerText !== "" && 
                        <Bubble text={errorBannerText} type="error" />}

                        {chatId && <FlatList data={chatMessages}
                            renderItem={(itemData)=>{
                                const message = itemData.item;

                                const isOwnMessage = message.sendBy === userData.userID;
                                const messageType = isOwnMessage ? "myMessage" : 'theirMessage';


                                return <Bubble type={messageType} text={message.text}/>
                            }}
                        />} 


                    </PageContainer>
                </ImageBackground>
                <View style={styles.inputContainer}>
                    <TouchableOpacity 
                        style={styles.mediaButton}
                        onPress={()=> console.log('a')}>
                        <Feather name="plus" size={24} color={colors.blue} />
                    </TouchableOpacity>

                    <TextInput 
                        style={styles.textbox} 
                        value={messageText} 
                        onChangeText={(text)=>setMessageText(text)}
                    />

                    {messageText === "" ? (
                        <TouchableOpacity 
                            style={styles.mediaButton}
                            onPress={()=> console.log('b')}>
                            <Feather name="camera" size={24} color={colors.blue} />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity
                        style={{...styles.mediaButton, ...styles.sendButton}}
                        onPress={sendMessage}>
                        <Feather name="send" size={20} color={colors.white} />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
    },
    screen:{
        flex: 1,
    },
    bgImage:{
        flex: 1,
    },
    inputContainer:{
        flexDirection:'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
        height: 50,
    },
    mediaButton:{
        justifyContent: 'center',
        alignItems:'center',
        width: 35,
    },
    sendButton: {
        backgroundColor: colors.blue,
        borderRadius: 50,
        padding: 8
    },
    textbox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.lightGrey,
        marginHorizontal: 15,
        paddingHorizontal: 12,

    }
  });

export default ChatScreen;