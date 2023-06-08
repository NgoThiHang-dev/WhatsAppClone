import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import backgroundImage from '../../assets/images/background-whatapp.jpg'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';

const ChatScreen = props => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = useCallback(()=>{
        setMessageText("");
        console.log("aaaaaaaa");
    },[messageText])

    console.log(messageText);

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
            <KeyboardAvoidingView 
                style={styles.screen} 
                behavior={Platform.OS === 'ios' ? 'padding': undefined} 
                keyboadVerticalOffset={100}
            >
                <ImageBackground source={backgroundImage} style={styles.bgImage}>
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