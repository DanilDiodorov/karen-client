import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'karen-76b9c.firebaseapp.com',
    projectId: 'karen-76b9c',
    storageBucket: 'karen-76b9c.appspot.com',
    messagingSenderId: '793410427970',
    appId: '1:793410427970:web:51f45e239f1243859a21db',
    measurementId: 'G-QV2SNXN0E7',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
