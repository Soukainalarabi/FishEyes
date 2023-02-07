import getPhotographers from "../utils/photographers-service.js"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const identifiant = urlParams.get('id')// elle renvoie une chaine de caractere pas un number
const photographers = await getPhotographers();
let selectOption = document.getElementById("choice-select")
// let iconHaut = document.querySelector(".icon-haut")
let dateButton = document.querySelector(".date")
let populariteButton = document.querySelector(".popularite")
let titreButton = document.querySelector(".titre")
let ligneHr1 = document.querySelector(".ligne1")
let ligneHr2 = document.querySelector(".ligne2")

const mediaFilter = photographers.media.filter(mediaPhotographer => mediaPhotographer.photographerId == identifiant);
const arrayLikes = mediaFilter.map(x => x.likes); //regrouper les likes du photographe dans un tableau
let infoRectangle = document.querySelector(".info-rectangle")
let iconBas = document.createElement("img")
let iconHaut = document.createElement("img")
let affichageMenuSelect = () => {
    iconBas.setAttribute("class", "icon-bas")
    iconBas.setAttribute("src", "assets/icons/enBas.png")
    iconBas.setAttribute("alt", "vers le bas")
    dateButton.style.display = "none"
    titreButton.style.display = "none"
    ligneHr1.style.display = "none"
    ligneHr2.style.display = "none"

    populariteButton.appendChild(iconBas)
}
affichageMenuSelect()
let somme = 0
for (let i = 0; i < arrayLikes.length; i++) {
    somme += arrayLikes[i]
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

        heart2.innerHTML = `<i class="fas fa-heart fa-2x"></i>
        `
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
    photographerDom()
    return photographer
}
let getMedia = (photographer, sortedByDate, sortedByTitle, sortedByLike) => {
    let modal = document.querySelector(".modal")
    let galeries = document.getElementById("galerie")
    galeries.innerHTML = ""
    iconHaut.setAttribute("class", "icon-haut")
    iconHaut.setAttribute("src", "assets/icons/enhaut.png")
    iconHaut.setAttribute("alt", "vers le haut")
    iconBas.addEventListener("click", () => {
        populariteButton.style.display = "block"
        iconBas.replaceWith(iconHaut)
        dateButton.style.display = "block"
        titreButton.style.display = "block"
        ligneHr1.style.display = "block"
        ligneHr2.style.display = "block"
        dateButton.style.paddingRight = "none"



    })
    iconHaut.addEventListener("click", () => {
        iconHaut.replaceWith(iconBas)
        dateButton.style.display = "none"
        titreButton.style.display = "none"
        ligneHr1.style.display = "none"
        ligneHr2.style.display = "none"

    })

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

            numberLikes.textContent = parseInt(++mediaPhotographer.likes) //incrémenter puis affecter la nv valeur du variable
            somme += 1
            let sommeLike = document.querySelector(".sommeLike")
            sommeLike.textContent = somme
            like.style.color = "#901C1C"
        })

        let lightboxAffichage = () => { //afficher les images et videos dans la modale
            let imageLightbox = document.createElement("img")
            let iconPrecedent = document.createElement("img")
            let iconSuivant = document.createElement("img")
            let pLightbox = document.createElement("p")
            let linkImageSuivant = document.createElement("a")
            let linkImagePrecedent = document.createElement("a")
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
                    linkImagePrecedent.setAttribute("class", "previous-image")
                    linkImagePrecedent.setAttribute("href", "#")

                    imageDivLightbox.appendChild(linkImagePrecedent)
                    linkImagePrecedent.appendChild(iconPrecedent)
                    iconPrecedent.setAttribute("src", "assets/icons/precedent.png")
                    iconPrecedent.setAttribute("alt", "icon précedent")
                    iconPrecedent.style.width = "42px"
                    iconPrecedent.style.height = "42px"
                    imageDivLightbox.setAttribute("class", "imageLightbox")
                    modalLightbox.appendChild(imageDivLightbox)
                    imageLightbox.setAttribute("src", img.src)
                    imageLightbox.setAttribute("alt", img.alt)
                    pLightbox.setAttribute("class", "pLightbox")
                    pLightbox.textContent = mediaAlt
                    imageDivLightbox.appendChild(imageLightbox)
                    imageDivLightbox.appendChild(linkImageSuivant)
                    iconSuivant.setAttribute("src", "assets/icons/suivant.png")
                    iconSuivant.setAttribute("alt", "icon suivant")

                    linkImageSuivant.setAttribute("class", "next-image")

                    linkImageSuivant.setAttribute("href", "#")

                    linkImageSuivant.appendChild(iconSuivant)
                    iconSuivant.style.width = "42px"
                    iconSuivant.style.height = "42px"
                    modalLightbox.appendChild(pLightbox)
                    displayModal(false)
                }
                imageAffichage()
            })
            function precedent() {
                if (index == 0) {
                    imageLightbox.src = `assets/images/${photographer.name}/${mediaFilter[mediaFilter.length - 1].image}`
                    pLightbox.textContent = `${mediaFilter[mediaFilter.length - 1].title}`
                    index = mediaFilter.length - 1
                    return
                }

                imageLightbox.src = `assets/images/${photographer.name}/${mediaFilter[index - 1].image}`
                pLightbox.textContent = `${mediaFilter[index - 1].title}`
                index -= index

            }
            function suivant() {
                if (index == mediaFilter.length - 1) {
                    imageLightbox.src = `assets/images/${photographer.name}/${mediaFilter[0].image}`
                    pLightbox.textContent = `${mediaFilter[0].title}`
                    index = mediaFilter.length + 1

                    return
                }
                imageLightbox.src = `assets/images/${photographer.name}/${mediaFilter[index + 1].image}`
                pLightbox.textContent = `${mediaFilter[index + 1].title}`
                index += index

            }
            iconPrecedent.addEventListener("click", () => {

                precedent()
            })
            linkImagePrecedent.addEventListener("keypress", (e) => {

                if (e.key == 'Enter') {
                    console.log("cc")
                }
            });
            iconSuivant.addEventListener("keypress", (e) => {

                if (e.key == 'Enter') {
                    console.log("Salut")
                }
            });
            iconSuivant.addEventListener("click", () => {


                suivant()
            })
        }
        lightboxAffichage()

    });

}
let photographer = getPhotographer()

selectOption.addEventListener("click", (e) => {
    if (e.target.value == "date") {
        dateButton.appendChild(iconBas)
        dateButton.style.display = "block"
        dateButton.style.paddingRight = "32px"
        populariteButton.style.paddingRight = "24px"
        populariteButton.style.display = "none"
        titreButton.style.display = "none"
        ligneHr1.style.display = "none"
        ligneHr2.style.display = "none"

        getMedia(photographer, true)

    } else if (e.target.value == "popularite") {
        populariteButton.appendChild(iconBas)
        dateButton.style.display = "none"
        populariteButton.style.display = "block"
        titreButton.style.display = "none"
        ligneHr1.style.display = "none"
        ligneHr2.style.display = "none"
        getMedia(photographer, false, false, true)


    } else if (e.target.value == "titre") {
        titreButton.appendChild(iconBas)
        titreButton.style.paddingRight = "4px"
        dateButton.style.display = "none"
        dateButton.style.paddingRight = "32px"
        populariteButton.style.paddingRight = "24px"
        populariteButton.style.display = "none"
        ligneHr1.style.display = "none"
        ligneHr2.style.display = "none"
        titreButton.style.display = "block"
        getMedia(photographer, false, true)


    }
    ;
})
getMedia(photographer)
