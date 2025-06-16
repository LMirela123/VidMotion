import './../../scripts/firebase.service.js'
import { getEntries } from './../../scripts/firebase.service.js';
import { debounce } from './../../scripts/debounce.service.js';
import { createDomElementsFromHtmlString } from './../../scripts/dom.service.js';
import {
  createFooter,
  createHeader,
  createNavBar,
  runPageAnimations,
} from './../../scripts/page.service.js';
import { getVideoCardTemplate } from './home-page.templates.js';

let videos = [];

initializePage();

async function initializePage() {
  createNavBar();
  createHeader();
  createFooter();
  runPageAnimations();

  videos = await getVideos();
  renderVideos(videos);
}

async function getVideos() {
  try {
    const videos = await getEntries('videos');
    return videos;
  } catch (error) {
    console.error(error);
  }
}

function renderVideos(videos) {
  if (videos && videos.length > 0) {
    const main = document.querySelector('main.home-page');
    videos.forEach((video) => {
      const videoHtmlTemplate = getVideoCardTemplate(video);
      const videoCardElement =
        createDomElementsFromHtmlString(videoHtmlTemplate);
      main.appendChild(videoCardElement);
    });
  }
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', debounce((e) => {
  const searchTerm = e.target.value;

  if (searchTerm.length > 2) {
    const filteredVideos = videos.filter((v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const main = document.querySelector('main.home-page');
    main.innerHTML = '';
    renderVideos(filteredVideos);
  } else {
    renderVideos(videos);
  }
}));
