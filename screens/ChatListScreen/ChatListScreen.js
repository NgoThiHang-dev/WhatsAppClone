import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const ChatListScreen = props => {
    
    return (
        <View style={styles.text}>
            <Text>Chat list screen</Text>
            <Button title='Go to setting' onPress={()=>props.navigation.navigate("ChatSettings")}/>
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