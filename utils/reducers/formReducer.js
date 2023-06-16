export const reducer = (state, action) =>{
    const {validationResult, inputID, inputValue} = action;

    const updatedValues = {
        ...state.inputValues,
        [inputID]: inputValue
    }

    const updatedValidities = {
        ...state.inputValidities,
        [inputID]: validationResult
    }

    let updatedFormIsValid = true;

    for(const key in updatedValidities){
        if(updatedValidities[key] !== undefined){
            updatedFormIsValid = false;
            break;
        }
    }
    
    return {
        inputValues: updatedValues, 
        inputValidities: updatedValidities, 
        formIsValid: updatedFormIsValid
    };
}