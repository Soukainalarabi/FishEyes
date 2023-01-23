const modal = document.getElementById("contact_modal")
const namePhotographer = localStorage.getItem('name');

let name = document.querySelector(".name")
let displayModal = () => {
    modal.style.display = "block";
    name.textContent = namePhotographer

}
let closeModal = () => {
    modal.style.display = "none";
}

// lien vers la page d'accueil
let allPhotographers = document.querySelector(".logo")
allPhotographers.addEventListener("click", () => {
    window.location = "index.html"
})