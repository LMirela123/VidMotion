import {
  createFooter,
  createHeader,
  createNavBar,
  runPageAnimations,
} from './../../scripts/page.service.js';

initializePage();

function initializePage() {
  createNavBar();
  createHeader();
  createFooter();
  runPageAnimations();
}
