import lightboxFactory from "../factories/lightbox.js"
import { closeModal, displayModal } from "../pages/modal.js"
import Media from "../models/media.js"
export default function mediaFactory(medias) {
    let lightboxFactoryObject = lightboxFactory(medias, displayModal, closeModal)
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
        medias.map(data => new Media(data))
            .forEach((mediaPhotographer, index) => {
                let galerieCase = document.createElement("div")
                let like = document.createElement("div")
                const img = document.createElement('img');
                const video = document.createElement('video');
                const source = document.createElement('source');
                const heart = document.createElement("div")
                let lightbox = document.createElement("a")
                const pTitle = document.createElement('p');
                const numberLikes = document.createElement("div")
                const heart1 = document.createElement("div")
                heart.setAttribute("class", "heart")
                heart.setAttribute("aria-label", `Bouton pour liker la publication nommée ${mediaPhotographer.title}`)
                galerieCase.setAttribute("class", "galerie-case")
                lightbox.setAttribute("href", "#")
                lightbox.setAttribute("role", "lien")
                lightbox.setAttribute("aria-label", `media ${photographer.name}`)
                like.setAttribute("class", "like")
                galeries.appendChild(galerieCase);
                galerieCase.appendChild(lightbox);
                numberLikes.setAttribute("class", "numberLikes")
                heart1.setAttribute("class", "heart1")
                galerieCase.appendChild(like);
                like.appendChild(pTitle);
                like.appendChild(heart);
                heart.appendChild(numberLikes);
                heart.appendChild(heart1);
                let imageVideoDom = () => {
                    if (mediaPhotographer.image) {
                        img.setAttribute("src", mediaPhotographer.getImageUrl(photographer.name))
                        img.setAttribute("alt", ` media nommée ${mediaPhotographer.title}`
                        )
                        lightbox.appendChild(img);
                        img.addEventListener("click", () => {
                            lightboxFactoryObject.imageAffichage(photographer, mediaPhotographer, index)
                        })
                    } else {
                        source.setAttribute("src", mediaPhotographer.getVideoUrl(photographer.name))
                        source.setAttribute("type", "video/mp4")
                        video.setAttribute("controls", "true")
                        video.setAttribute("alt", `media nommée ${mediaPhotographer.title}`)
                        video.appendChild(source);
                        lightbox.appendChild(video);
                        video.addEventListener("play", () => {
                            lightboxFactoryObject.videoAffichage(photographer, mediaPhotographer, index)
                        })
                    }
                    galerieCase.addEventListener("keyup", (e) => {
                        if (e.key == 'Enter') {
                            lightboxFactoryObject.videoAffichage(photographer, mediaPhotographer, index)
                        }
                    });
                }
                imageVideoDom()
                numberLikes.textContent = mediaPhotographer.likes
                pTitle.textContent = mediaPhotographer.title
                heart1.innerHTML = `<i class="fas fa-heart fa-2x"></i>`
                heart.addEventListener("click", () => {
                    let sommeLike = document.querySelector(".sommeLike")
                    let somme = parseInt(sommeLike.textContent)
                    if (parseInt(numberLikes.textContent) == parseInt(mediaPhotographer.likes)) { //si numberLike=la valeur initiale de nombre de like du media
                        numberLikes.textContent = parseInt(mediaPhotographer.likes) + 1 
                        sommeLike.textContent = somme + 1
                        like.style.color = "#901C1C"
                    } else if (parseInt(numberLikes.textContent) > parseInt(mediaPhotographer.likes)) { 
                        numberLikes.textContent = parseInt(mediaPhotographer.likes) 
                        let somme = parseInt(sommeLike.textContent)
                        sommeLike.textContent = somme - 1
                        like.style.color = "black"

                    }
                })
            });
    }
    return { showMedias }
}
