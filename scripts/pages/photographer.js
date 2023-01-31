import getPhotographers from "../utils/photographers-service.js"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let selectOption = document.getElementById("choice-select")
const identifiant = urlParams.get('id')// elle renvoie une chaine de caractere pas un number
const photographers = await getPhotographers();
const mediaFilter = photographers.media.filter(mediaPhotographer => mediaPhotographer.photographerId == identifiant);
const arrayLikes = mediaFilter.map(x => x.likes);
let somme = 0
for (let i = 0; i < arrayLikes.length; i++) {
    somme += arrayLikes[i];
}


let getPhotographer = () => {
    let photographer = photographers.photographers.find(photographer => photographer.id == identifiant)
    if (!photographer) {
        window.location.href = '/index.html'
    }

    let photographerDom = () => {
        const picture = `assets/photographers/${photographer.portrait}`;
        let photographerHeader = document.querySelector(".photograph-header")
        let photographerInfo = document.querySelector(".photograph-information")
        let h1 = document.createElement('h1');
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const img = document.createElement('img');
        photographerInfo.appendChild(h1);
        h1.textContent = photographer.name;
        localStorage.setItem('name', photographer.name);
        photographerInfo.appendChild(h2);
        h2.textContent = photographer.city.concat(", ", photographer.country)
        photographerInfo.appendChild(h3);
        h3.textContent = photographer.tagline.concat(" ", somme)

        photographerHeader.appendChild(img);
        img.setAttribute("src", picture)
        img.setAttribute("alt", `image du photographe ${photographer.name}`
        )
    }
    photographerDom()
    return photographer
}
let getMedia = (photographer, sortedByDate, sortedByTitle, sortedByLike) => {
    let modal = document.querySelector(".modal")
    let galeries = document.getElementById("galerie")
    galeries.innerHTML = ""


    if (sortedByDate) {
        mediaFilter.sort((m1, m2) => {
            let date1 = new Date(m1.date)
            let date2 = new Date(m2.date)
            if (date1 > date2) {
                return 1
            }
            if (date1 < date2) {
                return -1
            }
            return 0
        })

    }
    if (sortedByTitle) {
        mediaFilter.sort((m1, m2) => {
            let title1 = m1.title
            let title2 = m2.title
            if (title1 > title2) {
                return 1
            }
            if (title1 < title2) {
                return -1
            }
            return 0
        })

    }
    if (sortedByLike) {
        mediaFilter.sort((m1, m2) => {
            let like1 = m1.likes
            let like2 = m2.likes
            if (like1 > like2) {
                return

            }
            if (like1 < like2) {
                return -1
            }
            return 0

        })

    }
    mediaFilter.forEach((mediaPhotographer, index,) => {
        const image = `assets/images/${photographer.name}/${mediaPhotographer.image}`
        const videos = `assets/images/${photographer.name}/${mediaPhotographer.video}`;
        let galerieCase = document.createElement("div")
        let like = document.createElement("div")
        const img = document.createElement('img');
        const video = document.createElement('video');
        const source = document.createElement('source');
        const heart = document.createElement("div")
        let lightbox = document.createElement("a")
        heart.setAttribute("class", "heart")
        galerieCase.setAttribute("class", "galerie-case")
        lightbox.setAttribute("href", "#")
        like.setAttribute("class", "like")
        galeries.appendChild(galerieCase);
        galerieCase.appendChild(lightbox);
        let imageVideoDom = () => { //afficher tous les images videos dans le body
            if (mediaPhotographer.image) {
                img.setAttribute("src", image)
                img.setAttribute("alt", mediaPhotographer.title)
                lightbox.appendChild(img);
            } else {
                source.setAttribute("src", videos)
                source.setAttribute("type", "video/mp4")
                video.setAttribute("controls", "")
                video.appendChild(source);
                lightbox.appendChild(video);
            }
        }
        imageVideoDom()
        const pTitle = document.createElement('p');
        const numberLikes = document.createElement("div")
        const heart1 = document.createElement("div")

        galerieCase.appendChild(like);
        numberLikes.setAttribute("class", "numberLikes")
        heart1.setAttribute("class", "heart1")

        like.appendChild(pTitle);
        like.appendChild(heart);
        heart.appendChild(numberLikes);
        heart.appendChild(heart1);

        numberLikes.textContent = mediaPhotographer.likes
        pTitle.textContent = mediaPhotographer.title
        heart1.innerHTML = `<i class="fas fa-heart fa-2x"></i>
           `
        heart.addEventListener("click", () => {

            numberLikes.textContent = parseInt(mediaPhotographer.likes) + 1
            somme += 1
            let h3 = document.querySelector("h3")
            h3.textContent = photographer.tagline.concat(" ", somme)
            like.style.color = "#901C1C"


                ;


        })
        let lightboxAffichage = () => { //afficher les images et videos dans la modale
            let imageLightbox = document.createElement("img")
            let iconPrecedent = document.createElement("img")
            let iconSuivant = document.createElement("img")
            let pLightbox = document.createElement("p")
            let modal = document.getElementById("contact_modal")
            let imageDivLightbox = document.createElement("div")
            img.addEventListener("click", () => {
                let imageAffichage = () => {
                    let modalLightbox = document.querySelector(".modalLightboxBody")
                    let modalForm = document.querySelector(".modal-form")
                    modalLightbox.innerHTML = ""
                    modalLightbox.style.display = "block"
                    modalForm.style.display = "none"
                    let mediaAlt = mediaPhotographer.title
                    imageDivLightbox.appendChild(iconPrecedent)
                    iconPrecedent.setAttribute("src", "assets/icons/precedent.png")
                    iconPrecedent.setAttribute("alt", "icon precedent")
                    iconPrecedent.style.width = "42px"
                    iconPrecedent.style.height = "42px"
                    imageDivLightbox.setAttribute("class", "imageLightbox")
                    modalLightbox.appendChild(imageDivLightbox)
                    imageLightbox.setAttribute("src", img.src)
                    imageLightbox.setAttribute("alt", img.alt)
                    pLightbox.setAttribute("class", "pLightbox")
                    pLightbox.textContent = mediaAlt
                    imageDivLightbox.appendChild(imageLightbox)
                    imageDivLightbox.appendChild(iconSuivant)
                    iconSuivant.setAttribute("src", "assets/icons/suivant.png")
                    iconSuivant.setAttribute("alt", "icon suivant")
                    iconSuivant.style.width = "42px"
                    iconSuivant.style.height = "42px"
                    modalLightbox.appendChild(pLightbox)
                    displayModal(false)
                }
                imageAffichage()
            })
            function precedent() {
                if (index == 0) {
                    imageLightbox.src = `assets / images / ${photographer.name} /${mediaFilter[mediaFilter.length - 1].image}`
                    pLightbox.textContent = `${mediaFilter[mediaFilter.length - 1].title}`
                }

                imageLightbox.src = `assets/images/${photographer.name}/${mediaFilter[index - 1].image}`
                pLightbox.textContent = `${mediaFilter[index - 1].title}`
            }
            function suivant() {
                if (index == mediaFilter.length - 1) {
                    imageLightbox.src = `assets/images/${photographer.name}/${mediaFilter[0].image}`
                    pLightbox.textContent = `${mediaFilter[0].title}`
                }
                imageLightbox.src = `assets/images/${photographer.name}/${mediaFilter[index + 1].image}`
                pLightbox.textContent = `${mediaFilter[index + 1].title}`
            }
            iconPrecedent.addEventListener("click", () => {

                precedent()
            })
            iconSuivant.addEventListener("click", () => {


                suivant()
            })
        }
        lightboxAffichage()

    });

}
let photographer = getPhotographer()

selectOption.addEventListener("change", (e) => {
    if (e.target.value == "date") {
        getMedia(photographer, true)
    } else if (e.target.value == "popularite") {
        getMedia(photographer, false, false, true)

    } else if (e.target.value == "titre") {
        getMedia(photographer, false, true)

    }
    ;
})
getMedia(photographer)
