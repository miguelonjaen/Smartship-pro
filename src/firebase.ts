import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, onSnapshot, query, orderBy, limit, getDocFromServer, Timestamp, addDoc, serverTimestamp } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Export Firestore functions
export { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc,
  serverTimestamp,
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  getDocFromServer,
  signInWithPopup,
  onAuthStateChanged,
  Timestamp
};
export type { User };

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}
testConnection();
