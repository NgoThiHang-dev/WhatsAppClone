import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import { useState } from 'react';
// import { FontAwesome } from '@expo/vector-icons';

const Input = props => {
    const [value, setValue] = useState(props.initialValue);


    const onChangeText = text => {
        setValue(text);
        props.onInputChanged(props.id, text);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputContainer}>
                {/* <FontAwesome name="user-o" size={24} style={styles.icon}/> */}
                {props.icon && <props.iconPack name={props.icon} size={props.iconSize} style={styles.icon}/>}
                <TextInput {...props} 
                style={styles.input} 
                onChangeText={onChangeText} 
                value={value}/>
            </View>
            {props.errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText[0]}</Text>
                </View>
            )}
            
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        width: '100%',

    },
    label:{
        marginVertical: 8,
        fontFamily: 'bold',
        letterSpacing: 0.3,
        color: colors.textColor,
    },
    inputContainer:{
        width: '100%',
        backgroundColor: colors.nearlyWhite,
        border: 1,
        borderColor: colors.lightGrey,
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10,
        color: colors.grey,
    },
    input: {
        color: colors.textColor,
        flex: 1,
        fontFamily: 'regular',
        letterSpacing: 0.3,
        paddingTop: 0
    },
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        letterSpacing: 0.3,
        fontFamily: 'regular'
    }
  });

export default Input;