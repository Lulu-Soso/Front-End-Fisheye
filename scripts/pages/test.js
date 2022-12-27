import { dataApi } from "/scripts/utils/dataApi.js";

const { getPhotographer } = dataApi();

async function getMediaPathById(photographerId) {
  // Récupérer les informations sur le photographe à partir de son ID
  const photographer = await getPhotographer(photographerId);

  // Récupérer le nom du photographe
  const photographerName = photographer.name;
// console.log(photographerName);
  // Remplacer les espaces dans le nom du photographe par des tirets
  const normalizedName = photographerName.replace(/ /g, "-");
// console.log(normalizedName);
  // Construire le chemin vers le dossier de médias
  const mediaPath = `assets/medias/${normalizedName}`;
// console.log(mediaPath);

  return mediaPath;
}

export function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price, video } = data;
    // const imgMedia = `assets/medias/${image}`;
    // const vMedia = `assets/medias/${video}`;
  
    // Appeler la fonction getMediaPathById pour récupérer le chemin vers le dossier de médias
    // du photographe à partir de son ID
    const mediaPath = getMediaPathById(photographerId);
//   console.log(mediaPath);
  //   // Construire le chemin complet vers le média en ajoutant le nom de fichier à la fin
    const imgMedia = `${mediaPath}/${image}`;
    const vMedia = `${mediaPath}/${video}`;
console.log(imgMedia);
console.log(vMedia);

}