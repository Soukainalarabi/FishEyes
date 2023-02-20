export default function lightboxFactory(medias, displayModal) {
    let linkCloseLightbox = document.querySelector(".close-modallightbox")
    let imageAffichage = (photographer, media, index) => {
        let linkImageSuivant = document.createElement("a")
        let imageDivLightbox = document.createElement("div")
        let linkImagePrecedent = document.createElement("a")
        const image = `assets/images/${photographer.name}/${media.image}`
        let iconPrecedent = document.createElement("img")
        let iconSuivant = document.createElement("img")
        let imageLightbox = document.createElement("img")
        let modalLightbox = document.querySelector(".modalLightboxBody")
        let modalForm = document.querySelector(".modal-form")
        let pLightbox = document.createElement("p")
        modalLightbox.innerHTML = ""
        modalLightbox.style.display = "block"
        modalForm.style.display = "none"
        let mediaAlt = media.title
        linkImagePrecedent.setAttribute("class", "previous-image")
        linkImagePrecedent.setAttribute("href", "#")
        imageDivLightbox.appendChild(linkImagePrecedent)
        linkImagePrecedent.appendChild(iconPrecedent)
        iconPrecedent.setAttribute("src", "assets/icons/precedent.png")
        iconPrecedent.setAttribute("alt", "icon précedent")
        imageDivLightbox.setAttribute("class", "imageLightbox")
        modalLightbox.appendChild(imageDivLightbox)
        imageLightbox.setAttribute("src", image)
        imageLightbox.setAttribute("alt", mediaAlt)
        pLightbox.setAttribute("class", "pLightbox")
        pLightbox.textContent = mediaAlt
        imageDivLightbox.appendChild(imageLightbox)
        imageDivLightbox.appendChild(linkImageSuivant)
        iconSuivant.setAttribute("src", "assets/icons/suivant.png")
        iconSuivant.setAttribute("alt", "icon suivant")
        linkImageSuivant.setAttribute("class", "next-image")
        linkImageSuivant.setAttribute("href", "#")
        linkImageSuivant.appendChild(iconSuivant)
        modalLightbox.appendChild(pLightbox)
        iconSuivant.addEventListener("click", () => {
            mediaSuivant(photographer, index)
        })
        iconPrecedent.addEventListener("click", () => {
            mediaPrecedent(photographer, index)


        })
        linkImagePrecedent.addEventListener("keyup", (e) => {

            if (e.key == 'Enter') {
                mediaPrecedent(photographer, index)

            }
        });
        linkImageSuivant.addEventListener("keyup", (e) => {

            if (e.key == 'Enter') {
                mediaSuivant(photographer, index)
            }
        });
        linkCloseLightbox.addEventListener("keyup", (e) => {

            if (e.key == 'Enter') {
                closeModal(true)
            }
        });
        displayModal(false)
    }

    let videoAffichage = (photographer, media, index) => {
        let linkImageSuivant = document.createElement("a")
        let imageDivLightbox = document.createElement("div")
        let linkImagePrecedent = document.createElement("a")
        let iconPrecedent = document.createElement("img")
        let iconSuivant = document.createElement("img")
        let modalLightbox = document.querySelector(".modalLightboxBody")
        let modalForm = document.querySelector(".modal-form")
        let pLightbox = document.createElement("p")
        let videoLightbox = document.createElement("video")
        let sourceLightbox = document.createElement("source")
        const videos = `assets/images/${photographer.name}/${media.video}`;
        modalLightbox.innerHTML = ""
        modalLightbox.style.display = "block"
        modalForm.style.display = "none"
        let mediaAlt = media.title
        linkImagePrecedent.setAttribute("class", "previous-image")
        linkImagePrecedent.setAttribute("href", "#")
        imageDivLightbox.appendChild(linkImagePrecedent)
        linkImagePrecedent.appendChild(iconPrecedent)
        iconPrecedent.setAttribute("src", "assets/icons/precedent.png")
        iconPrecedent.setAttribute("alt", "icon précedent")
        imageDivLightbox.setAttribute("class", "imageLightbox")
        modalLightbox.appendChild(imageDivLightbox)
        sourceLightbox.setAttribute("src", videos)
        sourceLightbox.setAttribute("type", "video/mp4")
        pLightbox.setAttribute("class", "pLightbox")
        pLightbox.textContent = mediaAlt
        imageDivLightbox.appendChild(videoLightbox)
        imageDivLightbox.appendChild(linkImageSuivant)
        videoLightbox.appendChild(sourceLightbox)
        videoLightbox.setAttribute("controls", "")
        iconSuivant.setAttribute("src", "assets/icons/suivant.png")
        iconSuivant.setAttribute("alt", "icon suivant")
        linkImageSuivant.setAttribute("class", "next-image")
        linkImageSuivant.setAttribute("href", "#")
        linkImageSuivant.appendChild(iconSuivant)
        modalLightbox.appendChild(pLightbox)
        iconSuivant.addEventListener("click", () => {
            mediaSuivant(photographer, index)

        })
        iconPrecedent.addEventListener("click", () => {
            mediaPrecedent(photographer, index)

        })
        linkImagePrecedent.addEventListener("keyup", (e) => {

            if (e.key == 'Enter') {
                mediaPrecedent(photographer, index)

            }
        });
        linkImageSuivant.addEventListener("keyup", (e) => {

            if (e.key == 'Enter') {
                mediaSuivant(photographer, index)
            }
        });
        linkCloseLightbox.addEventListener("keyup", (e) => {

            if (e.key == 'Enter') {
                closeModal(true)
            }
        });
        displayModal(false)
    }
    let mediaSuivant = (photographer, index) => {
        if (index == medias.length - 1) {
            index = 0
        } else {
            index += 1
        }
        if (medias[index].image) {
            imageAffichage(photographer, medias[index], index)
        }
        else {
            videoAffichage(photographer, medias[index], index)

        }
    }
    let mediaPrecedent = (photographer, index) => {
        if (index == 0) {
            index = medias.length - 1
        } else {
            index -= 1
        }
        if (medias[index].image) {
            imageAffichage(photographer, medias[index], index)
        }
        else {
            videoAffichage(photographer, medias[index], index)

        }
    }
    return { imageAffichage, videoAffichage }
}


