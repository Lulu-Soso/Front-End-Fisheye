let dataPhotographers = [];

async function getPhotographers() {
  await fetch("data/photographers.json")
    .then((res) => res.json())
    .then((data) => (dataPhotographers = data.photographers)),
    console.log(dataPhotographers);

  return {
    photographers: dataPhotographers,
  };
}
// getPhotographers();

// async function getPhotographers() {
//   // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
//   // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
//   let photographers = [
//     {
//       name: "Ma data test",
//       id: 1,
//       city: "Paris",
//       country: "France",
//       tagline: "Ceci est ma data test",
//       price: 400,
//       portrait: "account.png",
//     },
//     {
//       name: "Autre data test",
//       id: 2,
//       city: "Londres",
//       country: "UK",
//       tagline: "Ceci est ma data test 2",
//       price: 500,
//       portrait: "account.png",
//     },
//   ];
//   // et bien retourner le tableau photographers seulement une fois récupéré
//   return {
//     photographers: [...photographers, ...photographers, ...photographers],
//   };
// }

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

// let dataPhotographers = [];
// let dataMedias = [];

// async function getPhotographers() {
//   await fetch("data/photographers.json")
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .then((data) => {
//       dataPhotographers = [...data.photographers];
//       dataMedias = [...data.media];
//       console.log(dataPhotographers)
//       console.log(dataMedias)
//     });
//   return {
//     photographers: dataPhotographers,
//     media: dataMedias,
//   };
// }
// getPhotographers();
