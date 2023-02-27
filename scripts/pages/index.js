import getPhotographers from "../utils/photographers-service.js"
import photographerFactory from "../factories/photographer.js"
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

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
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

