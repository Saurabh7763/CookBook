import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'


const firebaseConfig = {
   apiKey: "AIzaSyBGEz1CbeNjxbhqUoYWGmxcFRQvivHpqDs",
  authDomain: "cookbook-6e559.firebaseapp.com",
  projectId: "cookbook-6e559",
  storageBucket: "cookbook-6e559.firebasestorage.app",
  messagingSenderId: "399630571246",
  appId: "1:399630571246:web:b617fdb0dd68262fc285ff"

};


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});