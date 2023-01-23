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


let getMedia = (photographer, sortedByDate, sortedByTitle) => {
    let modal = document.querySelector(".modal")
    let galeries = document.getElementById("galerie")
    galeries.innerHTML = ""
    let mediaPhotographers = photographers.media;

    let dateMedia = () => {

    }
    if (sortedByDate) {
        mediaPhotographers.sort((m1, m2) => {
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
        mediaPhotographers.sort((m1, m2) => {
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

    mediaPhotographers.forEach(mediaPhotographer => {
        const image = `assets/images/${photographer.name}/${mediaPhotographer.image}`
        const videos = `assets/images/${photographer.name}/${mediaPhotographer.video}`;
        if (mediaPhotographer.photographerId == identifiant) {
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


            let imageLightboxAffichage = () => { //afficher les images et videos dans la modale
                let imageLightbox = document.createElement("img")
                img.addEventListener("click", () => {
                    // imageLightbox.textContent = ""
                    const contactModal = document.getElementById("contact_modal")
                    let imageDivLightbox = document.createElement("div")
                    let h1 = document.querySelector(".contactez-moi")
                    let form = document.querySelector("form")
                    let header = document.querySelector(".header-modal")
                    let name = document.querySelector(".name")
                    name.style.display = "none";
                    form.style.display = "none";
                    h1.style.display = "none";
                    header.style.flexDirection = "column"
                    header.style.alignItems = "flex-end"
                    contactModal.style.display = "block";
                    // let mediaVideo = mediaPhotographer.video
                    let mediaAlt = mediaPhotographer.title
                    if (mediaAlt === img.alt) {
                        imageDivLightbox.setAttribute("class", "imageLightbox")
                        modal.style.backgroundColor = "black"
                        modal.appendChild(header)
                        header.appendChild(imageDivLightbox)
                        imageLightbox.setAttribute("src", img.src)
                        imageLightbox.setAttribute("alt", img.alt)
                        imageDivLightbox.appendChild(imageLightbox)
                    }

                })

            }
            imageLightboxAffichage()
        }
    });

}

let photographer = getPhotographer()
selectOption.addEventListener("change", (e) => {
    selectOption.style.background = "blue"
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