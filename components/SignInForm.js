import React, { useCallback, useReducer } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SubmitButton from './SubmitButton';

import { validateInput } from '../untils/actions/formActions';
import { reducer } from '../untils/reducers/formReducer';

const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false
}

const SignInForm = props => {

    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputID, inputValue) =>{
        const result = validateInput(inputID, inputValue);
        dispatchFormState({inputID: inputID, validationResult: result});
    }, [dispatchFormState])


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
            errorText={formState.inputValidities['password']}
        />
        <SubmitButton title="Sign in" 
            onPress={()=>console.log("a")} 
            style={styles.marginTop20}
            disabled={!formState.formIsValid}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    marginTop20: {
        marginTop: 20
    }
});

export default SignInForm
