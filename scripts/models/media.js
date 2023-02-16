class Media {
    constructor(mediaJson) {
        this._id = mediaJson.id
        this._photographerId = mediaJson.photographerId
        this._title = mediaJson.title
        this._image = mediaJson.image
        this._video = mediaJson.video
        this._likes = mediaJson.likes
        this._date = mediaJson.date
        this._price = mediaJson.price
    }
    get id() {
        return this._id
    }
    get photographerId() {
        return this._photographerId
    }
    get title() {
        return this._title
    }
    get image() {
        return this._image
    }
    getImageUrl(photographerName) {
        return `assets/images/${photographerName}/${this._image}`
    }
    get video() {
        return this._video
    }
    getVideoUrl(photographerName) {
        return `assets/images/${photographerName}/${this._video}`
    }
    get likes() {
        return this._likes
    }
    get date() {
        return this._date
    }
    get price() {
        return this._price
    }
}