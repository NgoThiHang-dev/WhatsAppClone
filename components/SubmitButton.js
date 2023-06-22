import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const SubmitButton = props => {

    const enableBgColor = props.color || colors.primary;
    const disableBgColor = colors.lightGrey;
    const bgColor = props.disabled ? disableBgColor : enableBgColor;

  return (
    <TouchableOpacity
      onPress={props.disabled ? ()=> {} : props.onPress}
      style={{...styles.button, ...props.style, ...{backgroundColor: bgColor}}}
      >
      <Text style={{color: props.disabled ? colors.grey : colors.white}}>{ props.title }</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button:{
      backgroundColor: colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },

    welcomeLogin: {
      fontFamily: 'bold',
      fontSize: 20,
      // color: colors.white,
      letterSpacing: 0.3,
      textAlign: 'center',
      marginVertical: 20
    },


    subTitleLogin:{
      fontFamily: 'regular',
      fontSize: 16,
      // color: colors.white,
      letterSpacing: 0.3,
      textAlign: 'center',
      marginBottom: 20,
      color: '#ABACB0'
    },
});

export default SubmitButton
