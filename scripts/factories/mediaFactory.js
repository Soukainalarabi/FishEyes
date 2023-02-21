import lightboxFactory from "../factories/lightbox.js"
export default function mediaFactory(medias) {
    let lightboxFactoryObject = lightboxFactory(medias, displayModal)
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
                heart.setAttribute("class", "heart")
                heart.setAttribute("aria-label", `Bouton pour liker la publication nommée ${mediaPhotographer.title}`
                )
                galerieCase.setAttribute("class", "galerie-case")
                lightbox.setAttribute("href", "#")
                lightbox.setAttribute("role", "link")
                lightbox.setAttribute("aria-label", `media ${photographer.name}`)
                like.setAttribute("class", "like")
                galeries.appendChild(galerieCase);
                galerieCase.appendChild(lightbox);
                let imageVideoDom = () => { //afficher tous les images videos dans le body
                    if (mediaPhotographer.image) {
                        img.setAttribute("src", mediaPhotographer.getImageUrl(photographer.name))
                        img.setAttribute("alt", ` media nommée ${mediaPhotographer.title}`
                        )
                        lightbox.appendChild(img);
                        img.addEventListener("click", () => {
                            lightboxFactoryObject.imageAffichage(photographer, mediaPhotographer, index)
                        })
                        //ici on doit faire un evenement keyup
                        galerieCase.addEventListener("keyup", (e) => {
                            if (e.key == 'Enter') {
                                lightboxFactoryObject.imageAffichage(photographer, mediaPhotographer, index)
                            }
                        });
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
                        galerieCase.addEventListener("keyup", (e) => {
                            if (e.key == 'Enter') {
                                lightboxFactoryObject.videoAffichage(photographer, mediaPhotographer, index)
                            }
                        });
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
                heart1.innerHTML = `<i class="fas fa-heart fa-2x"></i>`
                heart.addEventListener("click", () => {
                    if (numberLikes.textContent == parseInt(+mediaPhotographer.likes)) {
                        numberLikes.textContent = parseInt(++mediaPhotographer.likes) //incrémenter puis affecter la nv valeur du variable
                        let sommeLike = document.querySelector(".sommeLike")
                        let somme = parseInt(sommeLike.textContent)
                        sommeLike.textContent = somme + 1
                        like.style.color = "#901C1C"
                    } if (numberLikes.textContent == parseInt(++mediaPhotographer.likes)) {
                        return
                    }



                })

            });

    }
    return { showMedias }
}