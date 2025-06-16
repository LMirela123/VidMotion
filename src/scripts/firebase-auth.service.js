import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

let auth = null;

const authErrorCodes = {
  'auth/invalid-email': 'The email address is not valid.',
  'auth/invalid-credential': 'The email address or password is incorrect.',
}

const defaultAuthError = 'Authentication failed. Please try again.';

export default function initFirebaseAuth(app) {
  if (!auth) {
    auth = getAuth(app);
  }
}

export async function loginWithEmailAndPassword(email, password) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully:', response);
    return response;
  } catch (error) {
    console.error(error);
    alert(authErrorCodes[error.code] || defaultAuthError);
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
