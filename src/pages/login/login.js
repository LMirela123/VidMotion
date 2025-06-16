import {
  validatePassword,
  validateEmail,
} from './../../scripts/field-validation.service.js';
import {
  createFooter,
  createHeader,
  createNavBar,
  runPageAnimations,
} from './../../scripts/page.service.js';
import './../../scripts/firebase.service.js';
import { loginWithEmailAndPassword } from './../../scripts/firebase-auth.service.js';

initializePage();

function initializePage() {
  createNavBar();
  createHeader();
  createFooter();
  runPageAnimations();
  addFormEvents();
}

function addFormEvents() {
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', loginUser);
}

function validateLoginForm(email, password) {
  
  let valid = true;

  if (!validateEmail(email)) {
    alert('Invalid format for the email address.');
    valid = false;
  }

  if (!validatePassword(password)) {
    alert(
      'Password must be between 8 and 25 characters and contain a letter, a number, and a special character.'
    );
    valid = false;
  }

  return valid;
}

async function loginUser() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if (validateLoginForm(email.value, password.value)) {
    const response = await loginWithEmailAndPassword(email.value, password.value);
    console.log('Login response:', response);
  }
}