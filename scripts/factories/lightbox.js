export function lightboxFactory() {
  // Crée un élément div avec la classe lightbox
  const lightboxDom = document.createElement("div");
  lightboxDom.classList.add("lightbox");

  
  // Fonction qui supprime l'élément lightboxDom du DOM lorsqu'elle est appelée
  function close(e) {
    // Empêche l'événement par défaut (par exemple, l'ouverture d'un lien)
    e.preventDefault();
    // Supprime l'élément lightboxDom du DOM en utilisant la méthode removeChild de l'élément parent
    lightboxDom.parentElement.removeChild(lightboxDom);
  }

  // Fonction qui affiche le média précédent d'une liste de médias donnée en utilisant la fonction buildLightboxDOM
  function prev(e, currentMedia, medias) {
    // Empêche l'événement par défaut (par exemple, l'ouverture d'un lien)
    e.preventDefault();
    // Récupère l'index du média courant dans la liste de médias
    const i = medias.findIndex((media) => media.link === currentMedia.link);
    // Affiche le média précédent en utilisant la fonction buildLightboxDOM. Si le média courant est le premier de la liste, affiche le dernier média de la liste.
    buildLightboxDOM(medias[i === 0 ? medias.length - 1 : i - 1], medias);
  }

  // Fonction qui affiche le média suivant d'une liste de médias donnée en utilisant la fonction buildLightboxDOM
  function next(e, currentMedia, medias) {
    // Empêche l'événement par défaut (par exemple, l'ouverture d'un lien)
    e.preventDefault();
    // Récupère l'index du média courant dans la liste de médias
    const i = medias.findIndex((media) => media.link === currentMedia.link);
    // Affiche le média suivant en utilisant la fonction buildLightboxDOM. Si le média courant est le dernier de la liste, affiche le premier média de la liste.
    buildLightboxDOM(medias[i === medias.length - 1 ? 0 : i + 1], medias);
  }

  // Fonction qui construit le contenu HTML de l'élément lightboxDom en fonction du média courant et de la liste de médias donnés
  function buildLightboxDOM(currentMedia, medias) {
    // Récupère l'extension du fichier du média courant
    const fileExtension = currentMedia.link.split(".").pop();
    let html = `
            <button class="lightbox-close"><i class="fa-solid fa-close"></i></button>
            <button class="lightbox-prev"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fa-solid fa-chevron-right"></i></button>
            <div class="lightbox-container">
          `;

    // Si le média courant est une vidéo au format MP4, ajoute une balise video au contenu HTML ; sinon, ajoute une image
    if (fileExtension === "mp4") {
      html += `<figure><video><source src="${currentMedia.link}" type="video/mp4"></video><figcaption><span>${currentMedia.title}</span></figcaption></figure>`;
    } else {
      html += `<figure><img src="${currentMedia.link}" type="image"alt=""><figcaption><span>${currentMedia.title}</span></figcaption></figure>`;
    }

    // Remplace le contenu HTML de l'élément lightboxDom par le nouveau contenu HTML
    lightboxDom.innerHTML = html;

    // Ajoute des événements qui appellent les fonctions close, prev et next lorsque l'utilisateur clique sur les boutons correspondants
    lightboxDom
      .querySelector(".lightbox-close")
      .addEventListener("click", (e) => close(e));
    lightboxDom
      .querySelector(".lightbox-prev")
      .addEventListener("click", (e) => prev(e, currentMedia, medias));
    lightboxDom
      .querySelector(".lightbox-next")
      .addEventListener("click", (e) => next(e, currentMedia, medias));

    // Retourne l'élément lightboxDom avec son nouveau contenu HTML et ses événements
    return lightboxDom;
  }

  // Retourne un objet avec une seule méthode, buildLightboxDOM, qui peut être utilisée pour construire le contenu HTML de l'élément lightboxDom et ajouter les événements correspondants
  return { buildLightboxDOM };
}
