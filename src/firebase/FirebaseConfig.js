import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'


const firebaseConfig = {
  apiKey: "AIzaSyDcV02HGGeob5b1clEoip4k_h9Fy9C6vtI",
  authDomain: "cookbook-d6955.firebaseapp.com",
  projectId: "cookbook-d6955",
  storageBucket: "cookbook-d6955.firebasestorage.app",
  messagingSenderId: "84524833029",
  appId: "1:84524833029:web:d60412a514db0b6637bf6c"
};


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});