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
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SubmitButton
