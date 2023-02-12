export default function mediaFactory(medias) {
    let showMedias = (photographer, sortedByDate, sortedByTitle, sortedByLike) => {
        let galeries = document.getElementById("galerie")
        galeries.innerHTML = ""
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
            medias.sort((m1, m2) => {
                return compare(new Date(m1.date), new Date(m2.date))
            })
        }
        if (sortedByTitle) {
            medias.sort((m1, m2) => {
                return compare(m1.title, m2.title)
            })

        }
        if (sortedByLike) {
            medias.sort((m1, m2) => {
                return compare(m1.likes, m2.likes)


            })

        }

        medias.forEach((mediaPhotographer, index,) => {
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
                        imageLightbox.src = `assets/images/${photographer.name}/${medias[medias.length - 1].image}`
                        pLightbox.textContent = `${medias[medias.length - 1].title}`
                        index = medias.length - 1
                        return
                    }

                    imageLightbox.src = `assets/images/${photographer.name}/${medias[index - 1].image}`
                    pLightbox.textContent = `${medias[index - 1].title}`
                    index -= index

                }
                function suivant() {
                    if (index == medias.length - 1) {
                        imageLightbox.src = `assets/images/${photographer.name}/${medias[0].image}`
                        pLightbox.textContent = `${medias[0].title}`
                        index = medias.length + 1

                        return
                    }
                    imageLightbox.src = `assets/images/${photographer.name}/${medias[index + 1].image}`
                    pLightbox.textContent = `${medias[index + 1].title}`
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
    return { showMedias }
}