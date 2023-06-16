import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import colors from '../constants/colors';
import ProfileImage from './ProfileImage';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const imageSize = 40;

const DataItem = props => {
    const {title, subTitle, image, type, isChecked, icon} = props;

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.container}>

            {!icon && <ProfileImage uri={image} size={imageSize}/>}
            {icon && 
                <View style={styles.leftIconContainer}>
                    <AntDesign name={icon} size={20} color={colors.blue} />
                </View>
            }

            

            <View style={styles.textContainer}>

                <Text 
                    numberOfLines={1} 
                    style={{...styles.title, ...{color: type === "button" ? colors.blue : colors.textColor}}}
                    // color={type === "button" ? colors.blue : colors.textColor}
                    >{title}
                </Text>

               {subTitle &&  <Text numberOfLines={1} style={styles.subTitle}>{subTitle}</Text>}
            </View>

            {type === "checkbox" && 
                <View style={{...styles.iconContainer, ...isChecked && styles.checkedStyle }}>
                    <Ionicons name="checkmark" size={18} color="white" />
                </View>
            }

        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
        borderBottomColor: colors.extraLightGrey,
        borderBottomWidth: 1,
        paddingVertical: 7,
        minHeight: 50
    },
    textContainer: {
        marginLeft: 14,
        flex: 1
    },
    title: {
        fontFamily: 'medium',
        fontSize: 16,
        letterSpacing: 0.3,
    },
    subTitle: {
        fontFamily: 'regular',
        color: colors.grey,
        letterSpacing: 0.3
    },
    iconContainer:{
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.lightGrey,
        backgroundColor: "white",

    },
    checkedStyle:{
        backgroundColor: colors.primary,
        borderColor: 'transparent'
    },
    leftIconContainer:{
        backgroundColor: colors.extraLightGrey,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: imageSize,
        height: imageSize
    }
  });

export default DataItem
