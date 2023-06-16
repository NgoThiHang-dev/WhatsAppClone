import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ViewBase } from 'react-native';
import { useSelector } from 'react-redux';
import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileImage from '../components/ProfileImage';
import Input from '../components/Input';
import { useReducer } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { validateLength } from '../utils/validationContraint'
import { updateChatData } from '../utils/actions/chatActions';
import colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { reducer } from '../utils/reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';
import DataItem from '../components/DataItem';

const ChatSettingScreen = props => {
   


    const chatId = props.route.params.chatId;
    const chatData = useSelector(state => state.chats.chatsData[chatId]);
    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);


    const initialState = {
        inputValues: {chatName: chatData.chatName},
        inputValidities: { chatName: undefined},
        formIsValid: false
    }

    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    

    const inputChangedHandler = useCallback((inputID, inputValue) =>{
        const result = validateInput(inputID, inputValue);
        dispatchFormState({inputID: inputID, validationResult: result, inputValue});
    }, [dispatchFormState])

    const saveHandler = useCallback(async()=>{
        const updatedValues = formState.inputValues;
        
        try{
            setIsLoading(true);
            await updateChatData(chatId, userData.userId, updatedValues);

            setShowSuccessMessage(true);

            setTimeout(()=>{
                setShowSuccessMessage(false);
            }, 1500)
        }catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }, [formState])

    const hasChanges = () =>{
        const currentValues = formState.inputValues;
        return currentValues.chatName != chatData.chatName;
    }

    const leaveChat = useCallback(async()=>{
        try{
            setIsLoading(true);

            // remove user
            await removeUserFromChat(userData, userData, chatData);

            props.navigation.popToPop();


        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }, [props.navigation, isLoading])
    
    return (
        <PageContainer>
            <PageTitle text="Chat Settings" /> 

            <ScrollView contentContainerStyle={styles.scrollView}>
                <ProfileImage 
                    showEditButton={true} 
                    size={80}
                    chatId={chatId}
                    userId={userData.userId}
                    uri={chatData.chatImage}
                />
                <Text>{chatData.chatName}</Text>
                
                <Input id="chatName" 
                    label="Chat name"
                    autoCapitalize="none"
                    initialValue={chatData.chatName}
                    allowEmpty={false}
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities["chatName"]}
                />

                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>{chatData.users.length} Participants</Text>
                    <DataItem
                        title="Add users"
                        icon="plus"
                        type="button"
                     />

                    {chatData.users.map(uid =>{
                        const currentUser = storedUsers[uid];
                        return <DataItem 
                            key={uid}
                            image={currentUser.profilePicture}
                            title={`${currentUser.firstName} ${currentUser.lastName}`}
                            subTitle={currentUser.about}
                            type={uid !== userData.userId && "link"}
                            onPress={()=>{uid !== userData.userId && props.navigation.navigate("Contact", {uid, chatId})}}
                        />
                    })}

                </View>

                {showSuccessMessage && <Text>Save!</Text>}

                {isLoading ? 
                    <ActivityIndicator size={'small'} color={colors.primary} /> :
                    hasChanges() && <SubmitButton title="Save changes"
                        color={colors.primary}
                        onPress={saveHandler}
                        disabled={!formState.formIsValid}
                    />
                
                }
                
            </ScrollView>

            {<SubmitButton
                title="Leave chat"
                color={colors.red}
                onPress={() => leaveChat()}
                style={{marginBottom: 20}}
            
             />}

        </PageContainer>
    )
};

const styles = StyleSheet.create({
    text:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionContainer: {
        width: '100%',
        marginTop: 10
    },
    heading:{
        marginVertical: 8,
        color: colors.textColor,
        fontFamily: 'bold',
        letterSpacing: 0.3
    }
  });

export default ChatSettingScreen;