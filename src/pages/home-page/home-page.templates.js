export const getVideoCardTemplate = (video) => `
  <article class="video-card">
    <video 
    poster="${video.posterImageUrl || '/assets/images/video-poster.webp'}" 
    preload="none" 
    src="${video.url}" 
    controls></video>
    <div class="video-card-details">
      <h3>${video.title}</h3>
      <p class="video-description">${video.description}</p>
      <p class="video-duration"><b>Duration:</b>${video.duration}</p>
    </div>
     </article>
`;