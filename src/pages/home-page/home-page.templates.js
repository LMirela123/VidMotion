export const getVideoCardTemplate = (video) => `
  <article class="video-card">
    <video src="${video.url}" controls></video>
    <h3>${video.title}</h3>
  </article>
`;