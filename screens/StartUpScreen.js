import React from 'react'
import { StyleSheet, View, ActivityIndicator} from 'react-native'
import colors from '../constants/colors'
import commonStyles from '../constants/commonStyles'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { authenticate, setDidTryAutoLogin } from '../store/authSlice'
import { getUserData } from '../untils/actions/userActions'
const StartUpScreen = () => {
    const dispatch = useDispatch();


    useEffect(()=>{
        const tryLogin = async () =>{
            const storeAuthInfo = await AsyncStorage.getItem("userData");

            if(!storeAuthInfo){
                dispatch(setDidTryAutoLogin());
                return;
            }

            const parseData = JSON.parse(storeAuthInfo);
            const {token, userId, expiryDate: expiDateString} = parseData;

            const expiryDate = new Date(expiDateString);
            if(expiryDate <= new Date() || !token || !userId){
                dispatch(setDidTryAutoLogin());
                return;
            }
            
            const userData = await getUserData(userId);
            dispatch(authenticate({token: token, userData}));
        }

        tryLogin();
    }, [dispatch])


  return (
    <View style={commonStyles.center}>
      <ActivityIndicator size="large" color = {colors.primary}/>
    </View>
  )
}



export default StartUpScreen
