//cette factorie crée l'objet qui crée l'élément media qui sera affiché dans la modal lightbox
export default function lightboxFactory(photographer) {
    const id = photographer.id;
    let getImageDOM = (medias, index) => {
        const media =  medias[index]
        const image = `assets/images/${photographer.name}/${media.image}`
        let imageLightbox = document.createElement("img")
        imageLightbox.setAttribute("src", image)
        imageLightbox.setAttribute("alt", media.title)
        return imageLightbox
    }
    let getVideoDOM = (medias, index) => {
        const media =  medias[index]
        let videoLightbox = document.createElement("video")
        let sourceLightbox = document.createElement("source")
        const videos = `assets/images/${photographer.name}/${media.video}`;
        sourceLightbox.setAttribute("src", videos)
        sourceLightbox.setAttribute("type", "video/mp4")
        videoLightbox.appendChild(sourceLightbox)
        videoLightbox.setAttribute("controls", "")
        return videoLightbox
    }
    return { id , getImageDOM, getVideoDOM }
}
