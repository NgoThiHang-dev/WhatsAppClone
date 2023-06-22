import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import PageContainer from '../components/PageContainer';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import colors from '../constants/colors';

import logo from '../assets/images/logo.png';
import { useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;

const AuthScreen = props => {

    const [isSignUp, setIsSignUp] = useState(false);

    const [containerWidth, setContainerWidth] = useState(null);

    useEffect(() => {

        const windowWidth = Dimensions.get('window').width;
        let widthContainer;
        

        if (windowWidth < 576) {
            widthContainer = '100%';
        } else if (windowWidth >= 576 && windowWidth < 992) {
            widthContainer = '80%';
        } else if (windowWidth >= 992 && windowWidth < 1200) {
            widthContainer = '60%';
        } else if (windowWidth >= 1200) {
            widthContainer = '40%';
        }

        setContainerWidth(widthContainer);

        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            let widthContainer;

            if (window.width < 576) {
                widthContainer = '100%';
            } else if (window.width >= 576 && window.width < 992) {
                widthContainer = '80%';
            } else if (window.width >= 992 && window.width < 1200) {
                widthContainer = '60%';
            } else if (window.width >= 1200) {
                widthContainer = '40%';
            }

            setContainerWidth(widthContainer);
        });

        return () => subscription?.remove();
        
    }, []);

    const widthImage = 200;
    const heightImage = 200;
    const widthContainerStyle = containerWidth ? containerWidth : null;

    
    
    return <SafeAreaView style={styles.safeAreaView}>
        <PageContainer style={{flex: 1, width: widthContainerStyle, backgroundColor: '#0f0'}}> 
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                    <KeyboardAvoidingView
                        style={styles.keyboardAvoidingView}
                        behavior={Platform.OS === "ios" ? "height" : undefined}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                        >
                            <View style={styles.container}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={logo}
                                        resizeMode='contain' />
                                </View>
                                
                                {
                                    isSignUp ?
                                    <SignUpForm /> :
                                    <SignInForm />
                                }

                                <TouchableOpacity
                                    onPress={() => setIsSignUp(prevState => !prevState)}
                                    style={styles.linkContainer}>
                                    {isSignUp ? 
                                        <Text>Already have an account? <Text style={styles.link}>SIGN IN</Text></Text> : 
                                        <Text>Don't have an account <Text style={styles.link}>SIGN UP</Text></Text>
                                    }
                                </TouchableOpacity>
                            </View>
                    </KeyboardAvoidingView>
                            
                </ScrollView> 
        </PageContainer>
    </SafeAreaView>
};


const styles = StyleSheet.create({

    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
        imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5,
        // aspectRatio: 1, // Giữ tỷ lệ khung hình gốc
        // resizeMode: 'contain',
    },
    image: {
        width: 150,
        height: 150,
    },
    linkContainer: {
        marginVertical: 15,
    },
    link: {
        color: colors.blue,
        fontFamily: 'medium',
        letterSpacing: 0.3,
    },


})

export default AuthScreen;