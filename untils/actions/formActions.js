import { validateEmail, validateLength, validatePassword, validateString } from '../..//untils/validationContraint';

export const validateInput = (inputID, inputValue) =>{
    if(inputID === 'firstName' || inputID === 'lastName'){
        return validateString(inputID, inputValue);

     } else if(inputID === 'email'){

         return validateEmail(inputID, inputValue);

     } else if(inputID === 'password'){
         
        return validatePassword(inputID, inputValue);

     }  else if(inputID === 'about'){
        
        return validateLength(inputID, inputValue, 0, 10, true);
    }
}