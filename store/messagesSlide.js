import { createSlice } from "@reduxjs/toolkit";

const messagesSlide = createSlice({
    name: 'messages',
    initialState: {
        messagesData: {}
    },
    reducers: {   
        setChatMessages: (state, action)=>{
            const existingMessages = state.messagesData;
            const {chatId, messagesData} = action.payload;

            existingMessages[chatId]= messagesData;

            state.messagesData = existingMessages;
        },
    }
})

export const setChatMessages = messagesSlide.actions.setChatMessages;
export default messagesSlide.reducer;