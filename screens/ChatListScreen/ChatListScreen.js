import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const ChatListScreen = props => {
     
    useEffect(()=>{
        props.navigation.setOptions({
            headerRight: ()=>{
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="New chat" iconName="create-outline" onPress={()=>props.navigation.navigate("NewChat")} />
                </HeaderButtons>
            }
        })
    })

    return (
        <View style={styles.text}>
            <Text>Chat list screen</Text>
            <Button title='Go to chat screen' onPress={()=>props.navigation.navigate("ChatScreen")}/>
        </View>
    )
};

const styles = StyleSheet.create({
    text:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

export default ChatListScreen;