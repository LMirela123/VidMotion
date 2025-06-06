import {
  validateBirthDate,
  validatePassword,
  validatePhoneNumber,
  validateUsername,
} from './../../scripts/field-validation.service.js';
import { addFormSubmitEventListener } from './../../scripts/form-events.service.js';
import {
  createFooter,
  createHeader,
  createNavBar,
  runPageAnimations,
} from './../../scripts/page.service.js';

const registerForm = document.getElementById('register-form');

initializePage();

function initializePage() {
  createFooter();
  createNavBar();
  createHeader(); 
  runPageAnimations();
  addFormSubmitEventListener(registerForm, validateRegisterForm);
}

function validateRegisterForm() {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const phone = document.getElementById('phone');
  const birthday = document.getElementById('birthday');
  let valid = true;

  if (!validateUsername(username.value)) {
    alert('Username must be between 3 and 20 characters.');
    valid = false;
  }

  if (!validatePassword(password.value)) {
    alert(
      'Password must be between 8 and 25 characters and contain a letter, a number, and a special character.'
    );
    valid = false;
  }

  if (phone && !validatePhoneNumber(phone.value)) {
    alert(
      'Phone number must be between 10 and 15 digits and can optionally start with "+"'
    );
    valid = false;
  }

  if (birthday && !validateBirthDate(birthday.value)) {
    alert('Birth date must be between 01.01.1920 and the current date.');
    valid = false;
  }

  return valid;
}
