import getPhotographers from "../utils/photographers-service.js"
import mediaFactory from "../factories/mediaFactory.js"
import trieMediaFactory from "../factories/trieMedia.js"

let getIdFromParam = () => {
    const queryString = window.location.search; // récuperer l'url depuis la page
    const urlParams = new URLSearchParams(queryString); // construire
    return urlParams.get("id");
}
const identifiant = getIdFromParam()// elle renvoie une chaine de caractere pas un number
let photographers = await getPhotographers();

// await (async () => {
//     photographers = await getPhotographers();

//     // all of the script.... 

// })();
let somme = 0
let photographer = photographers.photographers.find(photographer => photographer.id == identifiant)
const mediaFilter = photographers.media.filter(mediaPhotographer => mediaPhotographer.photographerId == identifiant);
let mediaFactoryObject = mediaFactory(mediaFilter)
const arrayLikes = mediaFilter.map(x => x.likes); //regrouper les likes du photographe dans un tableau
for (let i = 0; i < arrayLikes.length; i++) {
    somme += arrayLikes[i]
}
let infoRectangle = document.querySelector(".info-rectangle")
let showPhotographerDom = (photographer) => {
    if (!photographer) {
        window.location.href = '/index.html'
    }
    const picture = `assets/photographers/${photographer.portrait}`;
    let photographerHeader = document.querySelector(".photograph-header")
    let photographerInfo = document.querySelector(".photograph-information")
    let pSomme = document.createElement('p');
    let pPrice = document.createElement('p');
    pPrice.setAttribute("class", "price")
    pSomme.setAttribute("class", "sommeLike")
    let heart2 = document.createElement('div')
    heart2.setAttribute("class", "heart2")
    let h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');
    infoRectangle.appendChild(pSomme);
    infoRectangle.appendChild(heart2);
    infoRectangle.appendChild(pPrice);
    pSomme.textContent = somme
    heart2.innerHTML = `<i class="fas fa-heart fa-2x"></i>`
    pPrice.textContent = photographer.price + "€/jour"
    photographerInfo.appendChild(h1);
    h1.textContent = photographer.name;
    localStorage.setItem('name', photographer.name);
    photographerInfo.appendChild(h2);
    h2.textContent = photographer.city.concat(", ", photographer.country)
    photographerInfo.appendChild(h3);
    h3.textContent = photographer.tagline
    photographerHeader.appendChild(img);
    img.setAttribute("src", picture)
    img.setAttribute("alt", `image du photographe ${photographer.name}`)
}
trieMediaFactory(photographer, mediaFactory, mediaFilter).affichageMenuSelect()
showPhotographerDom(photographer)


mediaFactoryObject.showMedias(photographer)





