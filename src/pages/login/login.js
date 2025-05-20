import {
  validatePassword,
  validateUsername,
} from './../../scripts/field-validation.service.js';
import { addFormSubmitEventListener } from './../../scripts/form-events.service.js';
import {
  createFooter,
  createHeader,
  createNavBar,
  runPageAnimations,
} from './../../scripts/page.service.js';

const loginForm = document.getElementById('login-form');

initializePage();

function initializePage() {
  createNavBar();
  createHeader();
  createFooter();
  runPageAnimations();
  addLoginFormSubmitEventListener();
  addFormSubmitEventListener(loginForm, validateLoginForm);
}

function validateLoginForm() {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
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

  return valid;
}
