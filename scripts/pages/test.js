export function lightboxFactory() {
  function addClickEventToMediaLinks() {
    // Sélection des éléments de lien qui sont des images ou des vidéos
    const mediaLinks = document.querySelectorAll(
      'a[type="image"], a[type="video"]'
    );

    mediaLinks.forEach((btn) => btn.addEventListener("click", displayLightboxModal));

    // Ajout d'un événement de clic sur chaque élément de lien
    for (let i = 0; i < mediaLinks.length; i++) {
      const link = mediaLinks[i];
      link.addEventListener("click", (event) => {
        // Affichage de l'objet d'événement dans la console
        console.log("rien ne va plus !");
        console.log(event);

        // Annulation de l'action par défaut du lien (suivre le lien)
        event.preventDefault();
        link.displayLightboxModal()
        console.log(link);
      });
    }
  }

  function getLightboxDOM() {
    const lightbox = document.querySelector("#lightbox_modal")
    const lightboxModal = document.querySelector(".lightbox-modal")
    const lightboxContent = document.querySelector(".lightbox-content")
    const leftColumnLightbox = document.querySelector(".left-column-lightbox")
    const rightColumnLightbox = document.querySelector(".right-column-lightbox")
    const mediaLightbox = document.querySelector(".media-lightbox")

    lightbox.appendChild(lightboxModal)
    lightbox.appendChild(lightboxModal)
    lightbox.appendChild(lightboxContent)
    lightbox.appendChild(leftColumnLightbox)
    lightbox.appendChild(rightColumnLightbox)
    lightbox.appendChild(mediaLightbox)

    return lightbox
  }

  function displayLightboxModal() {
    const lightboxModal = document.getElementById("lightbox_modal");
	lightboxModal.style.display = "block";
}

function closeLightboxModal() {
    const lightboxModal = document.getElementById("lightbox_modal");
    lightboxModal.style.display = "none";
}

  return {
    addClickEventToMediaLinks,
    getLightboxDOM,
    displayLightboxModal,
    closeLightboxModal
  };
}


// <!-- added gallery -->
//   <div id="lightbox_modal">
//     <div class="lightbox-modal">

//       <div class="lightbox-content">
//         <div class="left-column-lightbox">
//           <i class="fa-solid fa-chevron-left"></i>
//         </div>
//         <div class="media-lightbox">
//           <div class="media-content"></div>
//           <div class="description-media"></div>
//         </div>
//         <div class="right-column-lightbox">
//           <img src="assets/icons/close-color.svg" onclick="closeLightboxModal()" />
//           <i class="fa-solid fa-chevron-right"></i>
//         </div>
//       </div>
//     </div>
//   </div>