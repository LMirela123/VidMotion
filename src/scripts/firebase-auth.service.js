import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

let auth = null;
let currentUser = null;

const authErrorCodes = {
  'auth/invalid-email': 'The email address is not valid.',
  'auth/invalid-credential': 'The email address or password is incorrect.',
}

const defaultAuthError = 'Authentication failed. Please try again.';

export default function initFirebaseAuth(app) {
  if (!auth) {
    auth = getAuth(app);

    currentUser = new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Unsubscribe to avoid memory leaks
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
      });
    });
  }
}

export async function loginWithEmailAndPassword(email, password) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    console.error(error);
    alert(authErrorCodes[error.code] || defaultAuthError);
    return null;
  }
}

export async function registerWithEmailAndPassword(email, password) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User registered successfully:', response);
    return response;
  } catch (error) {
    console.error(error);
    alert(authErrorCodes[error.code] || defaultAuthError);
  }
}

export async function isUserLoggedIn() {
  return await currentUser ? true : false;
}

export async function getCurrentUser() {
  const user = await currentUser;

  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }

  return null;
}