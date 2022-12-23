//Mettre le code JavaScript lié à la page photographer.html
import { photographerFactory } from "/scripts/factories/photographer.js";
import { mediaFactory } from "/scripts/factories/media.js";
import { dataApi } from "/scripts/utils/dataApi.js";

const photographerHeader = document.querySelector(".photograph-header");
const main = document.querySelector("#main");

const { getPhotographer, getPhotographerMedias } = dataApi();


//////////////////////// Details of photographer ////////////////////////
async function displayPhotographerDetails(id) {
  // Recuperation du photographe
  let photographer = await getPhotographer(id);

  // Generation DOM
  let photographerCardDom = photographerFactory(photographer).getUserPageDOM();

  // Affichage
  photographerHeader.append(photographerCardDom);
}


//////////////////////// Medias ////////////////////////
async function displayPhotographerMedias(id) {
  // Recuperation des media du photographer
  let medias = await getPhotographerMedias(id);

  // Generation DOM
  let mediaContent = document.createElement("div");
  mediaContent.classList.add("media-content");

  medias.forEach((media) => {
    let mediaCardDom = mediaFactory(media).getMediaCardDOM();
    mediaContent.append(mediaCardDom);
  });

  main.append(mediaContent);
}

async function init() {
  // Recuperation de l'ID
  const id = parseInt(new URL(location.href).searchParams.get("id"));

  // Afficher les details du photographer
  await displayPhotographerDetails(id);

  // Afficher les medias
  await displayPhotographerMedias(id);
}

// Initialisation
init().then((r) => {});
