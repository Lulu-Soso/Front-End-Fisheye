//Mettre le code JavaScript lié à la page photographer.html
import {photographerFactory} from "/scripts/factories/photographer.js";
import {mediaFactory} from "/scripts/factories/media.js";
import {dataApi} from "/scripts/utils/dataApi.js";
import {lightboxFactory} from "/scripts/factories/lightbox.js";

const photographerHeader = document.querySelector(".photograph-header");
const main = document.querySelector("#main");

// Recuperation de l'ID
const id = parseInt(new URL(location.href).searchParams.get("id"));

const {getPhotographer, getPhotographerMedias, getPhotographerMediaLikes} = dataApi();

//////////////////////// Details of photographer ////////////////////////
async function displayPhotographerDetails() {
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
async function displayPhotographerMedias() {
    // Recuperation des media du photographer
    let medias = await getPhotographerMedias(id);

    // Afficher les médias filtrés, refactorisés
    await displayFilteredMedias(medias)
}

function generateLightbox() {
    const {buildLightboxDOM} = lightboxFactory();

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

async function initFilter() {
    let medias = await getPhotographerMedias(id)
    let selectFilter = document.getElementById("media_filter")

    // On change
    selectFilter.addEventListener("change", async function () {
        let filter = selectFilter.value
        medias = await filterMedia(medias, filter)

        // Afficher les médias filtrés
        await displayFilteredMedias(medias)
    })
}
async function filterMedia(medias, filter) {

    switch (filter) {
        case 'date':
            medias.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date)
            })
            break
        case 'title':
            medias.sort(function (a, b) {
                if (a.title < b.title) {return -1}
                if (a.title > b.title) {return 1}
                return 0
            })
            break;
        default:
            medias.sort(function (a, b) {
                return b.likes - a.likes
            })
    }
    return medias;
}

async function displayFilteredMedias(medias) {
    // Afficher les médias filtrés et regénération du DOM
    let mediaContent = document.querySelector(".medias_section");
    mediaContent.innerHTML = "";

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

    let likesDiv = document.querySelector(".insert-likes")

    // Pour éviter une duplication du nombre de likes. Si la classe existe, on l'efface.
    if (likesDiv) {
        likesDiv.remove()
    }

    likesDiv = document.createElement("div");
    likesDiv.classList.add("insert-likes")
    likesDiv.innerHTML = "<i class='fa-solid fa-heart'></i>"

    let pLikes = document.createElement("p");
    pLikes.classList.add("numb-likes")
    pLikes.textContent = totalLikes;

    likesDiv.appendChild(pLikes);
    likesContent.appendChild(likesDiv);

    // Générer le lightbox des médias filtrés
    generateLightbox()
}

async function init() {

    // Afficher les details du photographer
    await displayPhotographerDetails();

    // Afficher les medias
    await displayPhotographerMedias();

    // Filtre
    await initFilter();
}

// Initialisation
init().then((r) => {
});
