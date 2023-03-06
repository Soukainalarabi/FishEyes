export default async function getPhotographers() {
    let response = await fetch('data/photographers.json')
    let photographers = await response.json()
    // retourner la liste des photographers et  media
    return Promise.resolve({
        photographers: [...photographers.photographers],
        media: [...photographers.media]
    })
}
