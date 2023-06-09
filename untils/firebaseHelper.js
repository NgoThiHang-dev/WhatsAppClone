// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () =>{
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBS94VlWyGk1av6bzA0CP2vdjSflvbE8jU",
        authDomain: "whatsappclone-web.firebaseapp.com",
        projectId: "whatsappclone-web",
        storageBucket: "whatsappclone-web.appspot.com",
        messagingSenderId: "969805407884",
        appId: "1:969805407884:web:cb6183fcb860ab1a14bda9",
        measurementId: "G-Y2VWFBKB6M"
      };
      

    // Initialize Firebase
    return initializeApp(firebaseConfig);
}