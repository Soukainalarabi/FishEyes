import Media from "../models/media.js"
//cette factorie crée l'objet qui crée l'élément media qui sera affiché dans le tableau des medias photographer
export default function mediaFactory(photographer) {
    const id = photographer.id
    let getMediaDOM = (medias,index,showLightBox) => {
        let media =  new Media(medias[index])
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
        heart.setAttribute("aria-label", `Bouton pour liker la publication nommée ${media.title}`)
        galerieCase.setAttribute("class", "galerie-case")
        lightbox.setAttribute("href", "#")
        lightbox.setAttribute("role", "lien")
        lightbox.setAttribute("aria-label", `media ${photographer.name}`)
        like.setAttribute("class", "like")
        galerieCase.appendChild(lightbox);
        numberLikes.setAttribute("class", "numberLikes")
        heart1.setAttribute("class", "heart1")
        galerieCase.appendChild(like);
        like.appendChild(pTitle);
        like.appendChild(heart);
        heart.appendChild(numberLikes);
        heart.appendChild(heart1);
        //elle crée l'image ou la video selon le type du media
        let imageVideoDom = () => {
            if (media.image) {
                img.setAttribute("src", media.getImageUrl(photographer.name))
                img.setAttribute("alt", ` media nommée ${media.title}`
                )
                lightbox.appendChild(img);
                img.addEventListener("click", () => {
                    //on appel la fonction showLightBox qui va affiché l'image cliquer dans la modal lightbox
                    showLightBox(medias, index)
                })
            } else {
                source.setAttribute("src", media.getVideoUrl(photographer.name))
                source.setAttribute("type", "video/mp4")
                video.setAttribute("controls", "true")
                video.setAttribute("alt", `media nommée ${media.title}`)
                video.appendChild(source);
                lightbox.appendChild(video);
                video.addEventListener("play", () => {
                    //on appel la fonction showLightBox qui va affiché la video cliquer dans la modal lightbox
                    showLightBox(medias, index)
                })
            }
            galerieCase.addEventListener("keyup", (e) => {
                if (e.key == 'Enter') {
                    showLightBox(medias, index)
                }
            });
        }
        imageVideoDom()
        numberLikes.textContent = media.likes
        pTitle.textContent = media.title
        heart1.innerHTML = `<i class="fas fa-heart fa-2x"></i>`
        heart.addEventListener("click", () => {
            let sommeLike = document.querySelector(".sommeLike")
            let somme = parseInt(sommeLike.textContent)
            if (parseInt(numberLikes.textContent) == parseInt(media.likes)) { //si numberLike=la valeur initiale de nombre de like du media on incrémente
                numberLikes.textContent = parseInt(media.likes) + 1 
                sommeLike.textContent = somme + 1
                like.style.color = "#901C1C"
            } else if (parseInt(numberLikes.textContent) > parseInt(media.likes)) { //sinon on décremente
                numberLikes.textContent = parseInt(media.likes) 
                let somme = parseInt(sommeLike.textContent)
                sommeLike.textContent = somme - 1
                like.style.color = "black"
    
            }
        })

        return galerieCase
    }
    return {id,getMediaDOM }
}
