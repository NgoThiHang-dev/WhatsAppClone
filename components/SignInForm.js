import React, { useCallback, useReducer, useRef, forwardRef } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SubmitButton from './SubmitButton';

import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signIn } from '../utils/actions/authActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import colors from '../constants/colors';

const isTestMode = false;

const initialState = {
    inputValues: {
        email: isTestMode ? 'hana@gmail.com' : '',
        password: isTestMode ? '123456' : '',
    },
    inputValidities: {
        email: isTestMode,
        password: isTestMode,
    },
    formIsValid: isTestMode
}

const SignInForm = forwardRef((props, ref) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);


    const dispatch = useDispatch();

    const inputChangedHandler = useCallback((inputID, inputValue) =>{
        const result = validateInput(inputID, inputValue);
        dispatchFormState({inputID: inputID, validationResult: result, inputValue});
    }, [dispatchFormState])


    const handleUsernameEndEditing = () => {
        passwordInputRef.current.focus();
    };
    
    const handlePasswordEndEditing = () => {
        authHandler();
    };

    useEffect(() => {
        usernameInputRef.current.focus();
    }, []);

    useEffect(()=>{
        if(error){
            Alert.alert("An error occured", error, [{text: "Oki"}]);
        }
    }, [error])

    const authHandler = useCallback(async() =>{
        try{
            setIsLoading(true);

            const action = signIn( 
                formState.inputValues.email, 
                formState.inputValues.password
            )

            setError(null);
            await dispatch(action);

        }catch (error){
            console.log(error);
            setIsLoading(false);
        }
    }, [dispatch, formState])

    

    return (
        <View style={{width: '100%', flex: 1}}>
            <Text style={styles.welcomeLogin}>Welcome Back!</Text>
            <Text style={styles.subTitleLogin}>Please Log into your existing account</Text>


            <Input label="Email" 
                id="email"
                autoCapitalize="none"
                keyboardType="email-address"
                icon="mail" 
                iconPack={Feather} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                initialValue={formState.inputValues.email}
                errorText={formState.inputValidities['email']}
                ref={usernameInputRef}
                returnKeyType="next"
                onSubmitEditing={handleUsernameEndEditing}
            />
            <Input label="Password"
                id="password"
                autoCapitalize="none"
                secureTextEntry
                icon="lock" 
                iconPack={FontAwesome} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                initialValue={formState.inputValues.password}
                errorText={formState.inputValidities['password']}
                onEndEditing={handlePasswordEndEditing}
                ref={passwordInputRef}
                returnKeyType="done"
                onSubmitEditing={authHandler}
            />
            {isLoading ? <ActivityIndicator size={'small'} color={colors.primary} style={{marginTop: 10}} /> :
                <SubmitButton title="Sign in" 
                    onSubmitEditing={authHandler} 
                    style={styles.marginTop20}
                    disabled={!formState.formIsValid}
                />
            }
            
        </View>
  )
})
const styles = StyleSheet.create({

    welcomeLogin: {
        fontFamily: 'bold',
        fontSize: 20,
        letterSpacing: 0.3,
        textAlign: 'center',
        marginVertical: 20
    },


    subTitleLogin:{
        fontFamily: 'regular',
        fontSize: 16,
        letterSpacing: 0.3,
        textAlign: 'center',
        marginBottom: 20,
        color: '#ABACB0'
    },

    marginTop20: {
        marginTop: 20,
    }
});

export default SignInForm
