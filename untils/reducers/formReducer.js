export const reducer = (state, action) =>{
    const {validationResult, inputID} = action;

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
        inputValidities: updatedValidities, formIsValid: updatedFormIsValid
    };
}