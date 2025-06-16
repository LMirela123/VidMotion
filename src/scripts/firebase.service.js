// Import the functions we need from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import initFirebaseAuth from './firebase-auth.service';

const env =
  (typeof import.meta !== 'undefined' ? import.meta.env : {}) ||
  (typeof process !== 'undefined' ? process.env : {});

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app = null;
let db = null;

initializeFirebase();

function initializeFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    initFirebaseAuth(app);
  }
}

/**
 * Get all documents from a Firestore collection
 * 
 * @param {string} collectionName - The name of the Firestore collection
 * @returns {Promise<Array>} - A promise that resolves to an array of documents
 */
export async function getEntries(collectionName) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error getting documents: ', error);
    return [];
  }
}

/**
 * Add a new document to a Firestore collection
 * 
 * @param {string} collectionName - The name of the Firestore collection
 * @param {Object} entryData - The data to be added as a new document
 * @returns {Promise<DocumentReference>} - A promise that resolves to the document reference of the newly added document
 */
export async function addEntry(collectionName, entryData) {
  try {
    const docRef = await addDoc(collection(db, collectionName), entryData);
    return docRef;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

/**
 * Delete a document from a Firestore collection
 * 
 * @param {string} collectionName - The name of the Firestore collection
 * @param {string} entryId - The ID of the document to be deleted
 * @returns {Promise<string|boolean>} - A promise that resolves to the ID of the deleted document or false if an error occurred
 */
export async function deleteEntry(collectionName, entryId) {
  try {
    await deleteDoc(doc(db, collectionName, entryId));
    return entryId;
  } catch (error) {
    console.error('Error deleting document: ', error);
    return false;
  }
}

/**
 * Clear all documents from a Firestore collection
 * 
 * @param {string} collectionName - The name of the Firestore collection to be cleared
 * @returns {Promise<Array>} - A promise that resolves to an array of IDs of the deleted documents
 */
export async function clearCollection(collectionName) {
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

export default app;
