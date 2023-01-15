import {dataApi} from "/scripts/utils/dataApi.js";

export async function mediaFactory(index, data) {
    const {getPhotographer} = dataApi()
    let {id, photographerId, title, image, likes, date, price, video} = data;

    const photographer = await getPhotographer(photographerId)
    const directoryName = photographer.name.replace(/ /g, '-')

    const imgMedia = `assets/medias/${directoryName}/${image}`;
    const vMedia = `assets/medias/${directoryName}/${video}`;

    function getMediaElement(type) {
        if (type === "image") {
            return document.createElement("img");
        } else if (type === "video") {
            return document.createElement("video");
        } else {
            return null;
        }
    }

    function getMediaCardDOM() {
        // Content
        const contentElement = document.createElement("article");

        const a = document.createElement("a");
        a.setAttribute("data-title", title)
        a.setAttribute("data-index", index)

        const divInfosMedia = document.createElement("div");
        divInfosMedia.classList.add("infos-media");

        // Title
        const titleElement = document.createElement("h2");
        titleElement.textContent = title;

        // Likes
        const likeHeartContent = document.createElement("div");
        likeHeartContent.classList.add("like-heart")
        const pHeart = document.createElement("button");
        pHeart.innerHTML = "<i class='fa-regular fa-heart'></i>"

        const spanElement = document.createElement("span");
        spanElement.textContent = likes;

        pHeart.addEventListener('click', () => {
            let numberLikes = document.querySelector('.numb-likes')
            let totalLikes = parseInt(numberLikes.innerText)

            if (data.likes === likes){
                likes = data.likes + 1

                spanElement.textContent = likes;
                pHeart.innerHTML = "<i class='fa-solid fa-heart'></i>"

                totalLikes += 1;
            }else{
                likes = data.likes

                spanElement.textContent = likes;
                pHeart.innerHTML = "<i class='fa-regular fa-heart'></i>"

                totalLikes -= 1;
            }

            numberLikes.innerText = totalLikes;
        })

        let mediaElement;
        if (image) {
            mediaElement = getMediaElement("image");
            mediaElement.setAttribute("src", imgMedia);

            a.setAttribute("href", imgMedia)
        } else if (video) {
            mediaElement = getMediaElement("video");
            mediaElement.setAttribute("src", vMedia);
            mediaElement.setAttribute("controls", null);

            a.setAttribute("href", vMedia)
        } else {
            // Return null if no image or video is provided
            return null;
        }

        contentElement.appendChild(a);
        a.appendChild(mediaElement);
        contentElement.appendChild(divInfosMedia);
        divInfosMedia.appendChild(titleElement);
        divInfosMedia.appendChild(likeHeartContent);
        likeHeartContent.appendChild(spanElement);
        likeHeartContent.appendChild(pHeart);

        return contentElement;
    }

    return {
        id,
        photographerId,
        title,
        image,
        likes,
        date,
        price,
        video,
        getMediaCardDOM
    };
}
