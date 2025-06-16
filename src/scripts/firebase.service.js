// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs } from "firebase/firestore";

const env = import.meta?.env || process?.env;
 

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app = null;
let db = null;

initializeFirebase();

function initializeFirebase() {
    if (!app) {
        app = initializeApp(firebaseConfig);
        db= getFirestore(app);
    }
}

export async function getEntries(collectionName) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error getting documents: ", error);
  } 
}

export async function addEntry(collectionName, entryData) {
  try {
    const docRef = await addDoc(collection(db, collectionName), entryData);
    return docRef;

  } catch(error) {
     console.error('Error adding document: ', error); 
  }
}

 export async function deleteEntry(collectionName,entryId) {
  try {
     await deleteDoc(doc(db, collectionName, entryId));
     return entryId;
  } catch (error) {
    console.error('Error deleting document: ', error);
    return false;
  }
 }

export async function clearCollection (collectionName) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const deletePromises = snapshot.docs.map((doc) => 
      deleteEntry(collectionName, doc.id)
  );
    return await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error clearing collection: ', error);
    return false;
  }
} 


export default  app;