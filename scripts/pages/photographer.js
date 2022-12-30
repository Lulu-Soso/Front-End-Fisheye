//Mettre le code JavaScript lié à la page photographer.html
import {photographerFactory} from "/scripts/factories/photographer.js";
import {mediaFactory} from "/scripts/factories/media.js";
import {dataApi} from "/scripts/utils/dataApi.js";
import {lightboxFactory} from "/scripts/factories/lightbox.js";

const photographerHeader = document.querySelector(".photograph-header");
const main = document.querySelector("#main");

const {getPhotographer, getPhotographerMedias, getPhotographerMediaLikes} = dataApi();

//////////////////////// Details of photographer ////////////////////////
async function displayPhotographerDetails(id) {
    // Recuperation du photographe
    let photographer = await getPhotographer(id);

    // Generation DOM
    let photographerCardDom = photographerFactory(photographer).getUserPageDOM();
    let insertDom = photographerFactory(photographer).getInsertDOM();

    // Affichage
    photographerHeader.append(photographerCardDom);
    main.append(insertDom);
}

//////////////////////// Medias ////////////////////////
async function displayPhotographerMedias(id) {
    // Recuperation des media du photographer
    let medias = await getPhotographerMedias(id);

    // Generation DOM
    let mediaContent = document.querySelector(".medias_section");

    for (const media of medias) {
        const mediaFact = await mediaFactory(media)

        let mediaCardDom = mediaFact.getMediaCardDOM();
        mediaContent.append(mediaCardDom);
    }

    main.append(mediaContent);

    // Calcul du total des likes
    let totalLikes = await getPhotographerMediaLikes(id);

    // Affichage du total des likes dans la page web
    let likesContent = document.querySelector(".insert");
    let likesDiv = document.createElement("div");
    likesDiv.classList.add("insert-likes")
    likesDiv.innerHTML = "<i class='fa-solid fa-heart'></i>"
    let pLikes = document.createElement("p");
    pLikes.classList.add("numb-likes")

    pLikes.textContent = totalLikes;

    likesDiv.appendChild(pLikes);
    likesContent.appendChild(likesDiv);
}

function generateLightbox() {
    const { buildLightboxDOM } = lightboxFactory();

    // Liste des liens
    const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]'));

    // Listes des medias
    const gallery = links.map(link => {
        return {
            title: link.getAttribute('data-title'),
            link: link.getAttribute('href')
        }
    })

    // Assignation du click pour chaque lien
    links.forEach(link => link.addEventListener('click', e => {
        e.preventDefault()

        let media = {
            title: e.currentTarget.getAttribute('data-title'),
            link: e.currentTarget.getAttribute('href')
        }

        let lightboxDOM = buildLightboxDOM(media, gallery)
        document.body.appendChild(lightboxDOM)
    }))
}

async function init() {
    // Recuperation de l'ID
    const id = parseInt(new URL(location.href).searchParams.get("id"));

    // Afficher les details du photographer
    await displayPhotographerDetails(id);

    // Afficher les medias
    await displayPhotographerMedias(id);

    // Générer le lightbox
    generateLightbox()
}

// Initialisation
init().then((r) => {
});
