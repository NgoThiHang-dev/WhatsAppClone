import { getFirebaseApp } from "../firebaseHelper";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {child, getDatabase, ref, set, update} from 'firebase/database'
import { authenticate, logout } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "./userAction";

export const signUp = (firstName, lastName, email, password) =>{
    // console.log(firstName, lastName, email, password);

    return async dispatch =>{
        const app = getFirebaseApp();
        const auth = getAuth(app);

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const {uid, stsTokenManager} = result.user;
            const {accessToken, expirationTime} = stsTokenManager;

            const expiryDate = new Date(expirationTime);
            const timeNow = new Date();
            const milisecondsUntilExpiry = expiryDate - timeNow;

            const userData = await createUser(firstName, lastName, email, uid);
            dispatch(authenticate({token: accessToken, userData}));

            saveDataToStorage(accessToken, uid, expiryDate);

            timer = setTimeout(()=>{
                dispatch(userLogout());
            }, milisecondsUntilExpiry)

        } catch (error){
            console.log(error);

        const errorCode =  error.code;
            // TH: Loi do firebase, key: firebase web auth error web

            let message = "Somthing went wrong.";
            
            if(errorCode === "auth/email-already-in-use"){
                message = "This email is already in use";
            }

            throw new Error(message);       
        }
    }
    
}

export const signIn = (email, password) =>{
    return async dispatch =>{
        const app = getFirebaseApp();
        const auth = getAuth(app);

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const {uid, stsTokenManager} = result.user;
            const {accessToken, expirationTime} = stsTokenManager;

            const expiryDate = new Date(expirationTime);
            const timeNow = new Date();
            const milisecondsUntilExpiry = expiryDate - timeNow;

            const userData = await getUserData(uid);

            dispatch(authenticate({token: accessToken, userData}));

            saveDataToStorage(accessToken, uid, expiryDate);

            timer = setTimeout(()=>{
                dispatch(userLogout());
            }, milisecondsUntilExpiry)

        } catch (error){
            console.log(error);

        const errorCode =  error.code;
            // TH: Loi do firebase, key: firebase web auth error web

            let message = "Somthing went wrong.";
            
            if(errorCode === "auth/wrong-password" || errorCode === "auth/user-notfound" ){
                message = "The username or password was incorrect";
            }

            console.log(message);
            throw new Error(message);       
        }
    }
    
}

export const userLogout = () =>{
    return async dispatch =>{
        AsyncStorage.clear();
        clearTimeout(timer);
        dispatch(logout());
    }
}

export const updateSignedInUserData = async(userId, newData) =>{
    if(newData.firstName && newData.lastName){
        const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase();
        newData.firstLast= firstLast;
    }

    
    const dbRef = ref(getDatabase());

    const childRef = child(dbRef, `users/${userId}`);
    await update(childRef, newData);
    // return newData; 
}

const createUser = async (firstName, lastName, email, userID) =>{
    const firstLast = `${firstName} ${lastName}`.toLowerCase();

    const userData = {
        firstName,
        lastName,
        firstLast,
        email,
        userID,
        signUpDate: new Date().toISOString()
    }

    const dbRef = ref(getDatabase());

    const childRef = child(dbRef, `users/${userID}`);
    await set(childRef, userData);
    return userData;

}

const saveDataToStorage = (token, userID, expiryDate) =>{
    AsyncStorage.setItem("userData", JSON.stringify({
        token, userID, expiryDate: expiryDate.toISOString()
    }));
}