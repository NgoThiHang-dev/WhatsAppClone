import React, { useCallback, useReducer } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SubmitButton from './SubmitButton';

import { validateInput } from '../untils/actions/formActions';
import { reducer } from '../untils/reducers/formReducer';
import { signIn } from '../untils/actions/authAction';
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

const SignInForm = props => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    const inputChangedHandler = useCallback((inputID, inputValue) =>{
        const result = validateInput(inputID, inputValue);
        dispatchFormState({inputID: inputID, validationResult: result, inputValue});
    }, [dispatchFormState])



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
        <View>
            <Input label="Email" 
                id="email"
                autoCapitalize="none"
                keyboardType="email-address"
                icon="mail" 
                iconPack={Feather} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                value={formState.inputValues.email}
                errorText={formState.inputValidities['email']}
            />
            <Input label="Password"
                id="password"
                autoCapitalize="none"
                secureTextEntry
                icon="lock" 
                iconPack={FontAwesome} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                value={formState.inputValues.password}
                errorText={formState.inputValidities['password']}
            />
            {isLoading ? <ActivityIndicator size={'small'} color={colors.primary} style={{marginTop: 10}} /> :
                <SubmitButton title="Sign in" 
                    onPress={authHandler} 
                    style={styles.marginTop20}
                    disabled={!formState.formIsValid}
                />
            }
            
        </View>
  )
}
const styles = StyleSheet.create({
    marginTop20: {
        marginTop: 20
    }
});

export default SignInForm
