import { child, get, getDatabase, push, ref, remove, set, update } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";


export const createChat = async(loggedInUserId, chatData) =>{
    const newChatData = {
        ...chatData,
        createdBy: loggedInUserId,
        updatedBy: loggedInUserId,
        createAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const newChat = await push(child(dbRef, 'chats'), newChatData);

    const chatUsers = newChatData.users;

    for(let i=0; i < chatUsers.length; i++){
        const userId = chatUsers[i];
        await push(child(dbRef, `userChats/${userId}`), newChat.key);
    }

    return newChat.key;
}

export const sendTextMessage = async(chatId, senderId, messageText) =>{
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const messageRef = child(dbRef, `messages/${chatId}`);

    
    const messageData = {
        sendBy: senderId,
        sendAt: new Date().toISOString(),
        text:messageText
    }

    await push(messageRef, messageData);

    const chatRef = child(dbRef, `chats/${chatId}`);

    await update(chatRef, {
        updatedBy: senderId,
        updatedAt: new Date().toISOString(),
        latestMessageText: messageText
    })

}
export const starMessage = async(messageId, chatId, userId) =>{
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const childRef = child(dbRef, `userStarredMessages/${userId}/${chatId}/${messageId}`);

        const snapshot = await get(childRef);

        if(snapshot.exists()){
            // console.log("unstarring");
            await remove(childRef);
        }else{
            // console.log("starring");
            const starredMessageData = {
                messageId, chatId, starredAt: new Date().toISOString()
            }
            await set(childRef, starredMessageData);
        }

    } catch (error) {
        console.log(error);
    }

}