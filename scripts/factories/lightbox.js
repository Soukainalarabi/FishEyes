export default async function lightboxDom() {
    let imageLightbox = document.createElement("img")
    let iconPrecedent = document.createElement("img")
    let iconSuivant = document.createElement("img")
    let pLightbox = document.createElement("p")
    let linkImageSuivant = document.createElement("a")
    let linkImagePrecedent = document.createElement("a")
    let modal = document.getElementById("contact_modal")
    let imageDivLightbox = document.createElement("div")
    let mediaLightbox = () => {
        let modalLightbox = document.querySelector(".modalLightboxBody")
        let modalForm = document.querySelector(".modal-form")
        modalLightbox.innerHTML = ""
        let mediaAlt = mediaPhotographer.title
        modalLightbox.style.display = "block"
        modalForm.style.display = "none"
        let mediaLightboxDom = () => {
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
        return { mediaLightboxDom }
    }
    let mediaPrecedent = () => {
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
    let mediaSuivant = () => {
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
    return { mediaLightbox, mediaSuivant, mediaPrecedent }
}
