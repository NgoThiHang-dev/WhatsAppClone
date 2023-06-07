import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatSettingScreen = props => {
    
    return (
        <View style={styles.text}>
            <Text>Chat setting screen</Text>
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

export default ChatSettingScreen;