import './../../scripts/firebase.service.js';
import {
  createFooter,
  createHeader,
  createNavBar,
  runPageAnimations,
} from './../../scripts/page.service.js';

initializePage();

async function initializePage() {
  await createNavBar();
  createHeader();
  createFooter();
  runPageAnimations();
}
