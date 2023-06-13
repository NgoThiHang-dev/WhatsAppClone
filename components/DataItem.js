import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import colors from '../constants/colors';
import ProfileImage from './ProfileImage';

const DataItem = props => {
    const {title, subTitle, image} = props;

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.container}>

            <ProfileImage uri={image} size={40}/>

            <View style={styles.textContainer}>

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
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
        paddingVertical: 8,
        minHeight: 50
    },
    textContainer: {
        marginLeft: 14,
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
    }
  });

export default DataItem
