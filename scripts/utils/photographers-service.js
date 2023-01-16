export default async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    let response = await fetch('data/photographers.json')
    let photographers = await response.json()

    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: [...photographers.photographers]
    })
}