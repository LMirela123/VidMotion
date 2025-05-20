/**
 * PAGE ANIMATIONS
 */

export function runMainMenuAnimation() {
  document.querySelector('.main-nav').classList.add('transitioned');
}

export function runHeaderAnimation() {
  document.querySelector('.site-header h1').classList.add('transitioned');
  document.querySelector('.site-header h2').classList.add('transitioned');
}

export function runPageAnimations() {
  if (!localStorage.getItem('animationsRan')) {
    /* We need to assure that the browser percieves that the 'transitioned class
     is added later, with a very short delay after DOM elements have rendered */
    setTimeout(() => {
      runMainMenuAnimation();
      runHeaderAnimation();
      localStorage.setItem('animationsRan', 'true');
    }, 100);
  } else {
    document.querySelector('.site-header h1').classList.add('visible');
    document.querySelector('.site-header h2').classList.add('visible');
    document.querySelector('.main-nav').classList.add('visible');
  }
}

/**
 * PAGE DOM ELEMENTS RENDERING
 */

export function createHeader() {
  const headerHtml = `
    <header class="site-header">
      <h1>FirstWeb</h1>
      <h2>Your favourite video platform</h2>
    </header>
  `;

  document.body.innerHTML = headerHtml + document.body.innerHTML;
}

export function createNavBar() {
  const navbarHtml = `
    <nav class="main-nav">
      <a href="/index.html">The newest videos</a>
      <a href="/src/pages/video-upload/video-upload.html">Upload video</a>
      <a href="/src/pages/login/login.html">Login</a>
      <a href="/src/pages/register/register.html">Register</a>
    </nav>
  `;

  document.body.innerHTML = navbarHtml + document.body.innerHTML;
}

export function createFooter() {
  const footerHtml = `
    <footer class="site-footer">
      Copyright &copy; Mirela Lupoaica
    </footer>
  `;

  document.body.innerHTML += footerHtml;
}

export function addTopPageElements() {
  createNavBar();
  createHeader();
}
