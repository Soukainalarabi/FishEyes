import getPhotographers from "../utils/photographers-service.js"
import photographerFactory from "../factories/photographer.js"
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    //on va afficher les elements de chaque photographer en utilisant photographerFactory
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        userCardDOM.addEventListener("click", () => {
            let identifiant = photographer.id
            window.location.href = `photographer.html?id=${identifiant}`
        })
    });
}
function init() {
    // Récupère les datas des photographes
    getPhotographers().then(photographer => displayData(photographer.photographers)
    );
}

init();
