export default function lightboxFactory(medias, displayModal, closeModal) {
    let linkCloseLightbox = document.querySelector(".close-modallightbox")
    let afficherMediaLightbox = (mediaElt, photographer, media, index) => {
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
        mediaDivLightbox.appendChild(mediaElt)
        mediaDivLightbox.appendChild(linkMediaSuivant)
        iconSuivant.setAttribute("src", "assets/icons/suivant.png")
        iconSuivant.setAttribute("alt", "icon suivant")
        iconSuivant.setAttribute("aria-label", "passer à la publication suivante")
        linkMediaSuivant.setAttribute("class", "next-image")
        linkMediaSuivant.setAttribute("href", "#")
        linkMediaSuivant.appendChild(iconSuivant)
        modalLightbox.appendChild(pLightbox)
        iconSuivant.addEventListener("click", () => {
            mediaSuivant(photographer, index)
        })
        iconPrecedent.addEventListener("click", () => {
            mediaPrecedent(photographer, index)


        })
        linkCloseLightbox.addEventListener("click", () => {
            closeModal(true)
        })
        linkMediaPrecedent.addEventListener("keyup", (e) => {

            if (e.key == "ArrowLeft" || e.key == "Enter") {

                mediaPrecedent(photographer, index)

            }
        });
        linkMediaSuivant.addEventListener("keyup", (e) => {
            console.log(e.key);
            if (e.key == "ArrowRight" || e.key == "Enter") {
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
    let imageAffichage = (photographer, media, index) => {
        const image = `assets/images/${photographer.name}/${media.image}`
        let imageLightbox = document.createElement("img")
        imageLightbox.setAttribute("src", image)
        imageLightbox.setAttribute("alt", media.title)
        afficherMediaLightbox(imageLightbox, photographer, media, index)
    }
    let videoAffichage = (photographer, media, index) => {
        let videoLightbox = document.createElement("video")
        let sourceLightbox = document.createElement("source")
        const videos = `assets/images/${photographer.name}/${media.video}`;
        sourceLightbox.setAttribute("src", videos)
        sourceLightbox.setAttribute("type", "video/mp4")
        videoLightbox.appendChild(sourceLightbox)
        videoLightbox.setAttribute("controls", "")
        afficherMediaLightbox(videoLightbox, photographer, media, index)
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







