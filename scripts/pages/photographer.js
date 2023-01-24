import getPhotographers from "/scripts/utils/photographers-service.js"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let selectOption = document.getElementById("choice-select")
const identifiant = urlParams.get('id')// elle renvoie une chaine de caractere pas un number
const photographers = await getPhotographers();
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
        h3.textContent = photographer.tagline;
        photographerHeader.appendChild(img);
        img.setAttribute("src", picture)
        img.setAttribute("alt", "description image")
    }
    photographerDom()
    return photographer
}
const mediaFilter = photographers.media.filter(mediaPhotographer => mediaPhotographer.photographerId == identifiant);
let getMedia = (photographer, sortedByDate, sortedByTitle) => {
    let modal = document.querySelector(".modal")
    let galeries = document.getElementById("galerie")
    galeries.innerHTML = ""

    let dateMedia = () => {

    }
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
    mediaFilter.forEach((mediaPhotographer, index) => {
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
        const p = document.createElement('p');
        galerieCase.appendChild(like);
        like.appendChild(p);
        like.appendChild(heart);
        p.textContent = mediaPhotographer.title
        heart.innerHTML = `<p>${mediaPhotographer.likes}</p> <div class="heart1"><i class="fas fa-heart fa-2x"></i></div>
           `
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
            iconPrecedent.addEventListener("click", () => {
                if (index == 0) {
                    let totalIndex = mediaFilter.length
                    console.log(mediaFilter[totalIndex - 1]);
                    return
                }
                console.log(mediaFilter[index - 1]);


            })
            iconSuivant.addEventListener("click", () => {
                if (index + 1 == mediaFilter.length) {
                    let firstIndex = 0;
                    console.log(mediaFilter[firstIndex]);
                }
                if (index + 1 < mediaFilter.length) {

                    console.log(mediaFilter[index + 1]);
                }

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
        getMedia(photographer, false)

    } else if (e.target.value == "titre") {
        getMedia(photographer, false, true)

    }
    ;
})
getMedia(photographer)
