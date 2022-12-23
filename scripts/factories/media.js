export function mediaFactory(data) {
  const { id, photographerId, title, image, likes, date, price, video } = data;
  const pictureMedia = `assets/medias/${image}`;
  const vMedia = `assets/medias/${video}`;

  
  function getMediaCardDOM() {
    // Content
    const contentElement = document.createElement("article");

    const a = document.createElement("a");

    const imgMedia = document.createElement("img");
    imgMedia.setAttribute("src", pictureMedia);

    const videoMedia = document.createElement("video");
    videoMedia.setAttribute("src", vMedia);

    const div = document.createElement("div")
    div.classList.add("infos-media")
    const divInfosMedia = div

    // Title
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    // Likes
    const spanElement = document.createElement("span");
    spanElement.textContent = likes;

    contentElement.appendChild(a);
    a.appendChild(imgMedia);
    // a.appendChild(videoMedia);
    contentElement.appendChild(divInfosMedia);
    divInfosMedia.appendChild(titleElement);
    divInfosMedia.appendChild(spanElement);
    
    // function isVideo() {
    //     if (videoMedia) {
    //         a.appendChild(imgMedia);
    //         return imgMedia
    //     } else {
    //         a.removeChild(imgMedia)
    //         a.appendChild(videoMedia);
    //           return videoMedia
    //         }   
    //   }
    //   isVideo()

    // function isVideo() {
    // if (data.media === 'image') {
    //     a.appendChild(imgMedia);
    //     return imgMedia
    // } else if (data.media === 'video') {
    //     a.appendChild(videoMedia);
    //     return videoMedia
    // } else {
    //     throw "Unknown type"
    // }
    // }isVideo()

    return contentElement;
  }

  return {
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
    video,
    getMediaCardDOM
  };
}
