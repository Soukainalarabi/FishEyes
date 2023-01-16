import getPhotographers from "/scripts/utils/photographers-service.js"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const identifiant = urlParams.get('id')// elle renvoie une chaine de caractere pas un number
const photographers = await getPhotographers();
let getPhotographer = () => {
    let photographer = photographers.photographers.find(photographer => photographer.id == identifiant)
    if (!photographer) {
        window.location.href = '/index.html'
    }
    const picture = `assets/photographers/` + photographer.portrait;
    let photographerHeader = document.querySelector(".photograph-header")
    let photographerInfo = document.querySelector(".photograph-information")
    let h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');
    let photographerDom = () => {

        photographerInfo.appendChild(h1);
        h1.textContent = photographer.name;
        photographerInfo.appendChild(h2);
        h2.textContent = photographer.city.concat(", ", photographer.country)
        photographerInfo.appendChild(h3);
        h3.textContent = photographer.tagline;
        photographerHeader.appendChild(img);
        img.setAttribute("src", picture)
        img.setAttribute("alt", "description image")
    }
    photographerDom()
}
getPhotographer()