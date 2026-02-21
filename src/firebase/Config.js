import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

//this is duplicate copy of my FirebaseConfig.js file because of security purpose 
const firebaseConfig = {
   apiKey: "your api key here",
  authDomain: "auth-domain",
  projectId: "project-id",
  storageBucket: "storage-bucket-id",
  messagingSenderId: "messagesenderId",
  appId: "your api id"

};


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});