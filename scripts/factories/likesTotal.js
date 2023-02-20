// import getPhotographers from "../utils/photographers-service.js"
// const photographers = await getPhotographers();
// let totalLikeFactory = () => {
//     let infoRectangle = document.querySelector(".info-rectangle")
//     let pSomme = document.createElement('p');
//     let pPrice = document.createElement('p');
//     let heart2 = document.createElement('div')
//     let getIdFromParam = () => {
//         const queryString = window.location.search; // récuperer l'url depuis la page
//         const urlParams = new URLSearchParams(queryString); // construire
//         return urlParams.get("id");
//     }
//     const identifiant = getIdFromParam()// elle renvoie une chaine de caractere pas un number
//     const mediaFilter = photographers.media.filter(mediaPhotographer => mediaPhotographer.photographerId == identifiant);
//     let arrayLikes = mediaFilter.map(x => x.likes); //regrouper les likes du photographe dans un tableau
//     let somme = 0
//     for (let i = 0; i < arrayLikes.length; i++) {
//         somme += arrayLikes[i]
//     }
//     let totalLikeDom = () => {
//         pPrice.setAttribute("class", "price")
//         pSomme.setAttribute("class", "sommeLike")
//         heart2.setAttribute("class", "heart2")
//         infoRectangle.appendChild(pSomme);
//         infoRectangle.appendChild(heart2);
//         infoRectangle.appendChild(pPrice);
//         pSomme.textContent = somme
//         heart2.innerHTML = `<i class="fas fa-heart fa-2x"></i>`
//         pPrice.textContent = photographer.price + "€/jour"
//     }
//     return { totalLikeDom }

// }
// totalLikeFactory()