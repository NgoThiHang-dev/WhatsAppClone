import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import colors from '../constants/colors';
import ProfileImage from './ProfileImage';

const DataItem = props => {
    const {title, subTitle, image} = props;

    console.log("props");
    console.log(props);

  return (
    <TouchableWithoutFeedback>
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
        backgroundColor: colors.extraLightGrey,
        height: 30,
        marginVertical: 8,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
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
