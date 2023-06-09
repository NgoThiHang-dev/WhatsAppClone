import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SubmitButton from './SubmitButton';
import { validateInput } from '../untils/actions/formActions';
import { reducer } from '../untils/reducers/formReducer';
import { signUp } from '../untils/actions/authAction';
import { getFirebaseApp } from '../untils/firebaseHelper';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';

console.log(getFirebaseApp());


const initialState = {
    inputValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    },
    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    },
    formIsValid: false
}

const SignUpForm = props => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

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

            const action = signUp(formState.inputValues.firstName, 
                formState.inputValues.lastName, 
                formState.inputValues.email, 
                formState.inputValues.password
            )

            setError(null);
            await dispatch(action);

        }catch (error){
            console.log(error);
            setIsLoading(false);
        }
    },[dispatch, formState])

    return (
        <View>
            <Input label="First name" icon="user-o"
                id="firstName" 
                autoCapitalize="none"
                iconPack={FontAwesome} 
                iconSize={15}
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['firstName']}
            />
            <Input label="Last name" icon="user-o" 
                id="lastName"
                autoCapitalize="none"
                iconPack={FontAwesome} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['lastName']}
            />
            <Input label="Email" icon="mail" 
                id="email"
                autoCapitalize="none"
                keyboardType="email-address"
                iconPack={Feather} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['email']}
            />
            <Input label="Password" icon="lock" 
                id="password"
                autoCapitalize="none"
                secureTextEntry
                iconPack={FontAwesome} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['password']}
            />
            { isLoading ? <ActivityIndicator size={'small'} color={colors.primary} style={{marginTop: 10}} /> :
                <SubmitButton title="Sign up" 
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

export default SignUpForm
