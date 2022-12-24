export function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price, video } = data;
    const imgMedia = `assets/medias/${image}`;
    const vMedia = `assets/medias/${video}`;
  
    function getMediaElement(type) {
      if (type === "image") {
        return document.createElement("img");
      } else if (type === "video") {
        return document.createElement("video");
      } else {
        return null;
      }
    }
  
    function getMediaCardDOM() {
      // Content
      const contentElement = document.createElement("article");
  
      const a = document.createElement("a");
  
      const div = document.createElement("div");
      div.classList.add("infos-media");
      const divInfosMedia = div;
  
      // Title
      const titleElement = document.createElement("h2");
      titleElement.textContent = title;
  
      // Likes
      const spanElement = document.createElement("span");
      spanElement.textContent = likes;
  
      let mediaElement;
      if (image) {
        mediaElement = getMediaElement("image");
        mediaElement.setAttribute("src", imgMedia);
      } else if (video) {
        mediaElement = getMediaElement("video");
        mediaElement.setAttribute("src", vMedia);
      } else {
        // Return null if no image or video is provided
        return null;
      }
  
      contentElement.appendChild(a);
      a.appendChild(mediaElement);
      contentElement.appendChild(divInfosMedia);
      divInfosMedia.appendChild(titleElement);
      divInfosMedia.appendChild(spanElement);
  
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
      getMediaCardDOM,
    };
  }
  
