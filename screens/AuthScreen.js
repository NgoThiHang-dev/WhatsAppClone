import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import colors from '../constants/colors';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import logo from '../assets/images/logo.png';

const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <PageContainer style={{backgroundColor: colors.white}}>
                <ScrollView>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS ==='ios' ? 'height' : undefined} >

                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={logo} resizeMode='contain'/>
                        </View>

                        {isSignUp ? <SignUpForm /> : <SignInForm />}

                        <TouchableOpacity onPress={()=>setIsSignUp(prev => !prev)} style={styles.linkContainer}>
                            <Text style={styles.link}>{`Switch to ${isSignUp ? "sign in" : "sign up"}`}</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    linkContainer:{
        justifyContent:'center',
        alignItems: 'center',
        marginVertical: 15
    },
    link:{
        color: colors.blue,
        fontFamily: 'medium',
        letterSpacing: 0.3
    },
    imageContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    image: {
        width: 150,
        height: 150,
        marginVertical: 20
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center'
    }
    
  });

export default AuthScreen;