// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAlQsj33__GAmfugOPj6AA1-Quuddvyl7M',
  authDomain: 'todo-app-charlie.firebaseapp.com',
  projectId: 'todo-app-charlie',
  storageBucket: 'todo-app-charlie.appspot.com',
  messagingSenderId: '70170537626',
  appId: '1:70170537626:web:7268165fde1108d85c7923',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
