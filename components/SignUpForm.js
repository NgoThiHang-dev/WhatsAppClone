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
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    },
    formIsValid: false
}

const SignUpForm = props => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);


    const inputChangedHandler = useCallback((inputID, inputValue) =>{
        const result = validateInput(inputID, inputValue);
        dispatchFormState({inputID: inputID, validationResult: result});
    }, [dispatchFormState])

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
        <SubmitButton title="Sign up" 
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

export default SignUpForm
