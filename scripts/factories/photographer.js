function photographerFactory(data) {
    const { name, portrait, city, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const dataCity = document.createElement( 'p' );
        dataCity.textContent = city;
        const dataTagline = document.createElement( 'p' );
        dataTagline.textContent = tagline;
        const dataPrice = document.createElement( 'p' );
        dataPrice.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(dataCity);
        article.appendChild(dataTagline);
        article.appendChild(dataPrice);

        return (article);
    }
    return { name, picture, city, tagline, price, getUserCardDOM }
}