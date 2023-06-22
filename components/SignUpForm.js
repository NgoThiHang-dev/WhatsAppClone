import React, { useCallback, useEffect, useReducer, useState, useRef, forwardRef } from 'react'
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SubmitButton from './SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signUp } from '../utils/actions/authActions';
import { getFirebaseApp } from '../utils/firebaseHelper';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';

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

const SignUpForm = forwardRef((props, ref) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const firstnameInputRef = useRef(null);
    const lastnameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const dispatch = useDispatch();

    const inputChangedHandler = useCallback((inputID, inputValue) =>{
        const result = validateInput(inputID, inputValue);
        dispatchFormState({inputID: inputID, validationResult: result, inputValue});
    }, [dispatchFormState])

    const handleFirstNameEndEditing = () => {
        lastnameInputRef.current.focus();
    };
    const handleLastNameEndEditing = () => {
        emailInputRef.current.focus();
    };
    const handleEmailEndEditing = () => {
        passwordInputRef.current.focus();
    };
    const handlePasswordEndEditing = () => {
        authHandler();
    };

    useEffect(() => {
        firstnameInputRef.current.focus();
    }, []);

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
        <View style={{width: '100%', flex: 1}}>
            <Text style={styles.welcomeLogin}>Sign up</Text>
            <Text style={styles.subTitleLogin}>Let us know about your seft</Text>
            
            <Input label="First name" icon="user-o"
                id="firstName" 
                autoCapitalize="none"
                iconPack={FontAwesome} 
                iconSize={15}
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['firstName']}
                ref={firstnameInputRef}
                returnKeyType="next"
                onSubmitEditing={handleFirstNameEndEditing}
            />
            <Input label="Last name" icon="user-o" 
                id="lastName"
                autoCapitalize="none"
                iconPack={FontAwesome} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['lastName']}
                ref={lastnameInputRef}
                returnKeyType="next"
                onSubmitEditing={handleLastNameEndEditing}
            />
            <Input label="Email" icon="mail" 
                id="email"
                autoCapitalize="none"
                keyboardType="email-address"
                iconPack={Feather} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['email']}
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={handleEmailEndEditing}
            />
            <Input label="Password" icon="lock" 
                id="password"
                autoCapitalize="none"
                secureTextEntry
                iconPack={FontAwesome} 
                iconSize={15} 
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['password']}
                onEndEditing={handlePasswordEndEditing}
                ref={passwordInputRef}
                returnKeyType="done"
                onSubmitEditing={authHandler}
            />
            { isLoading ? <ActivityIndicator size={'small'} color={colors.primary} style={{marginTop: 10}} /> :
                <SubmitButton title="Sign up" 
                    onSubmitEditing={authHandler} 
                    style={styles.marginTop20}
                    disabled={!formState.formIsValid}
                />
            }
        </View>
    )
});


const styles = StyleSheet.create({
    marginTop20: {
        marginTop: 20
    },
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
});

export default SignUpForm
