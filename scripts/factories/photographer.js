export {photographerFactory}

function photographerFactory(data) {
  // console.log(data);
  const { id, name, portrait, city, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;
  const photographerId = `photographer.html?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    (a.href = photographerId), (a.title = name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const dataCity = document.createElement("h4");
    dataCity.textContent = city;
    const dataTagline = document.createElement("p");
    dataTagline.textContent = tagline;
    const dataPrice = document.createElement("span");
    dataPrice.textContent = price + "€/jour";

    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(dataCity);
    article.appendChild(dataTagline);
    article.appendChild(dataPrice);

    return article;
  }

  function getUserPageDOM() {
    const photographerHeader = document.querySelector(".photograph-header");
    const contactHeader = document.querySelector(".modal")
    const h3 = document.createElement("h3");
    h3.textContent = name;
    const div = document.createElement("div")
    div.classList.add("infos-photographer")
    const divInfosPhotographer = div
    const a = document.createElement("a");
    (a.href = photographerId), (a.title = name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const dataCity = document.createElement("h4");
    dataCity.textContent = city;
    const dataTagline = document.createElement("p");
    dataTagline.textContent = tagline;
    // const dataPrice = document.createElement("span");
    // dataPrice.textContent = price + "€/jour";

    photographerHeader.appendChild(a);
    contactHeader.appendChild(h3)
    a.appendChild(img);
    photographerHeader.appendChild(divInfosPhotographer);
    divInfosPhotographer.appendChild(h2);
    divInfosPhotographer.appendChild(dataCity);
    divInfosPhotographer.appendChild(dataTagline);
    // divInfosPhotographer.appendChild(dataPrice);

    return divInfosPhotographer;
  }
  return { id, name, picture, city, tagline, price, getUserCardDOM, getUserPageDOM };
}


