import getPhotographers from "../utils/photographers-service.js"
import mediaFactory from "../factories/mediaFactory.js"
import lightboxFactory from "../factories/lightbox.js"
import dropDownMenuFactory from "../factories/dropDownMenu.js"
import { displayModal, closeModal } from "../pages/modal.js"
// récuperer l'id du photographe depuis les parametres de l'url 
let getIdFromParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}
const identifiant = getIdFromParam()
let photographers = await getPhotographers();
let somme = 0
//chercher le photographer selon l'id passer en parametre de l'url
let photographer = photographers.photographers.find(photographer => photographer.id == identifiant)
//filtrer que les medias du photographer qui correspond a l'id trouver
const mediaFilter = photographers.media.filter(mediaPhotographer => mediaPhotographer.photographerId == identifiant);
let mediaModel = mediaFactory(photographer)
let lightboxFactoryObject = lightboxFactory(photographer)
const arrayLikes = mediaFilter.map(x => x.likes); //récuperer les likes du photographer dans un tableau
//calculer la somme des nombres des like de tous les medias du photographe
for (let i = 0; i < arrayLikes.length; i++) {
    somme += arrayLikes[i]
}
let infoRectangle = document.querySelector(".info-rectangle")
let logo = document.querySelector("header img")
logo.addEventListener("click", () => {
    window.location.href = '/index.html'
})
let showPhotographerDom = (photographer) => {
    //si on arrive pas a trouver le photographer dans l'id récupérer depuis l'url on retourne vers la page index
    if (!photographer) {
        window.location.href = '/index.html'
    }
    // afficher les informations du photographe
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
//afficher les medias de la lightbox
let showLightBox = (medias, index) => {
    let media = medias[index];
    let mediaDom;
    if (media.image) {
        mediaDom = lightboxFactoryObject.getImageDOM(medias, index);
    } else {
        mediaDom = lightboxFactoryObject.getVideoDOM(medias, index);
    }
    let mediaSuivant = (medias, index) => {
        if (index == medias.length - 1) {
            index = 0
        } else {
            index += 1
        }
        showLightBox(medias, index)
    }
    let mediaPrecedent = (medias, index) => {
        if (index == 0) {
            index = medias.length - 1
        } else {
            index -= 1
        }
        showLightBox(medias, index)
    }
    let linkCloseLightbox = document.querySelector(".close-modallightbox")
    let linkMediaSuivant = document.createElement("a")
    let mediaDivLightbox = document.createElement("div")
    let linkMediaPrecedent = document.createElement("a")
    let iconPrecedent = document.createElement("img")
    let iconSuivant = document.createElement("img")
    let modalLightbox = document.querySelector(".modalLightboxBody")
    let modalForm = document.querySelector(".modal-form")
    let pLightbox = document.createElement("p")
    modalLightbox.innerHTML = ""
    modalLightbox.style.display = "block"
    modalForm.style.display = "none"
    let mediaAlt = media.title
    linkMediaPrecedent.setAttribute("class", "previous-image")
    linkMediaPrecedent.setAttribute("href", "#")
    mediaDivLightbox.appendChild(linkMediaPrecedent)
    linkMediaPrecedent.appendChild(iconPrecedent)
    iconPrecedent.setAttribute("src", "assets/icons/precedent.png")
    iconPrecedent.setAttribute("alt", "icon précedent")
    iconPrecedent.setAttribute("aria-label", "passer à la publication précédente")
    mediaDivLightbox.setAttribute("class", "imageLightbox")
    modalLightbox.appendChild(mediaDivLightbox)
    pLightbox.setAttribute("class", "pLightbox")
    pLightbox.textContent = mediaAlt
    mediaDivLightbox.appendChild(mediaDom)
    mediaDivLightbox.appendChild(linkMediaSuivant)
    iconSuivant.setAttribute("src", "assets/icons/suivant.png")
    iconSuivant.setAttribute("alt", "icon suivant")
    iconSuivant.setAttribute("aria-label", "passer à la publication suivante")
    linkMediaSuivant.setAttribute("class", "next-image")
    linkMediaSuivant.setAttribute("href", "#")
    linkMediaSuivant.appendChild(iconSuivant)
    modalLightbox.appendChild(pLightbox)
    iconSuivant.addEventListener("click", () => {
        mediaSuivant(medias, index)
    })
    iconPrecedent.addEventListener("click", () => {
        mediaPrecedent(medias, index)
    })
    linkCloseLightbox.addEventListener("click", () => {
        closeModal(true)
    })
    linkMediaPrecedent.addEventListener("keyup", (e) => {
        if (e.key == "ArrowLeft" || e.key == "Enter") {
            mediaPrecedent(medias, index)
        }
    });
    linkMediaSuivant.addEventListener("keyup", (e) => {
        console.log(e.key);
        if (e.key == "ArrowRight" || e.key == "Enter") {
            mediaSuivant(medias, index)
        }
    });
    linkCloseLightbox.addEventListener("keyup", (e) => {
        if (e.key == 'Enter') {
            closeModal(true)
        }
    });
    displayModal(false)
}
//afficher les medias selon le trie
function showMedias(sortedByDate, sortedByTitle, sortedByLike) {
    let compare = (p1, p2) => {
        if (p1 > p2) {
            return 1
        }
        if (p1 < p2) {
            return -1
        }
        return 0
    }
    if (sortedByDate) {
        mediaFilter.sort((m1, m2) => {
            return compare(new Date(m1.date), new Date(m2.date))
        })
    }
    if (sortedByTitle) {
        mediaFilter.sort((m1, m2) => {
            return compare(m1.title, m2.title)
        })
    }
    if (sortedByLike) {
        mediaFilter.sort((m1, m2) => {
            return compare(m1.likes, m2.likes)
        })
    }
    let galeries = document.getElementById("galerie")
    galeries.innerHTML = ""
    //afficher les informations de chaque media en utilisant mediaModel
    mediaFilter.forEach((mediaPhotographer, index) => {
        let mediaDom = mediaModel.getMediaDOM(mediaFilter, index, showLightBox)
        galeries.appendChild(mediaDom)
    });

}
dropDownMenuFactory(showMedias).affichageMenuSelect()
showPhotographerDom(photographer)
showMedias();

