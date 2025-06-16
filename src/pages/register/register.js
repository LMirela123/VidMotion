import {
  validateBirthDate,
  validatePassword,
  validatePhoneNumber,
  validateEmail,
} from './../../scripts/field-validation.service.js';
import {
  createFooter,
  createHeader,
  createNavBar,
  runPageAnimations,
} from './../../scripts/page.service.js';
import './../../scripts/firebase.service.js';
import { registerWithEmailAndPassword } from './../../scripts/firebase-auth.service.js';

initializePage();

function initializePage() {
  createNavBar();
  createHeader();
  createFooter();
  runPageAnimations();
  addFormEvents();
}

function addFormEvents() {
  const registerButton = document.getElementById('register-button');
  registerButton.addEventListener('click', registerUser);
}

function validateRegisterForm(email, password, phone, birthday) {

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

  // if (phone && !validatePhoneNumber(phone)) {
  //   alert(
  //     'Phone number must be between 10 and 15 digits and can optionally start with "+"'
  //   );
  //   valid = false;
  // }

  // if (birthday && !validateBirthDate(birthday)) {
  //   alert('Birth date must be between 01.01.1920 and the current date.');
  //   valid = false;
  // }

  return valid;
}

async function registerUser() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const phone = document.getElementById('phone');
  const birthday = document.getElementById('birthday');

  if (validateRegisterForm(email.value, password.value, phone.value, birthday.value)) {
    const response = await registerWithEmailAndPassword(email.value, password.value);
    console.log('Register response:', response);
  }
}
