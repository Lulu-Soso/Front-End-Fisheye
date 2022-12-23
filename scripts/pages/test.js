//Mettre le code JavaScript lié à la page photographer.html

// import {photographerFactory} from "/scripts/factories/photographer.js"
import { getPhotographers, dataPhotographers } from "./index.js";
// import { dataPhotographers } from "./index.js";
// setTimeout(() => {
//   console.log(dataPhotographers);  //photographers list
// }, 200);
// console.log('In usingAwait module');

// console.log(getPhotographers);

const displayPhotographer = async (data) => {
  await getPhotographers();

  // console.log(data);

  // const dataPhotographers = data.photographers;
  // const dataPhotographers = data.photographers;
  function photographerFactory(data) {
    // const { id, name, city, tagline, price } = data;
    // console.log(data);
    const id = new URL(location.href).searchParams.get("id");
    const photographers = !id
      ? dataPhotographers
      : dataPhotographers.filter((photographer) => photographer.id == id);
    console.log(photographers);
    const picture = `assets/photographers/${photographers[0].portrait}`;


    function getUserCardDOM() {
      const article = document.createElement("article");
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      const h2 = document.createElement("h2");
      h2.textContent = photographers[0].name;
      const dataCity = document.createElement("h4");
      dataCity.textContent = photographers[0].city;
      const dataTagline = document.createElement("p");
      dataTagline.textContent = photographers[0].tagline;
      const dataPrice = document.createElement("span");
      dataPrice.textContent = photographers[0].price + "€/jour";

      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(dataCity);
      article.appendChild(dataTagline);
      article.appendChild(dataPrice);

      console.log(photographers[0].id);
      console.log(picture);
      console.log(photographers[0].name);
      console.log(photographers[0].city);
      console.log(photographers[0].tagline);
      console.log(photographers[0].price);
      return article;
    }
    getUserCardDOM();
    return { id, name, picture, city, tagline, price };
  }
  photographerFactory();
  // return {data}
  // console.log(photographerFactory());

  console.log(displayPhotographer());
};
displayPhotographer();

// async function displayD(photographers) {
//   const photographerHeader = document.querySelector(".photograph-header");

//   photographers.forEach((photographer) => {
//   const photographerMod = photographerFactory(photographers);
//   const userCardDOM = photographerMod.getUserCardDOM();
//   photographerHeader.appendChild(userCardDOM);
//   displayPhotographer(data)
//   });
// }

// async function init() {
//   // Récupère les datas des photographes
//   const { photographers } = await getPhotographers();
//   displayD(photographers);

//   // console.log(photographers);
// }

init();

/////////////
