const modal = document.getElementById("contact_modal")
const namePhotographer = localStorage.getItem('name');
let name = document.querySelector(".name")

let displayModal = (modalContact) => {
    let modalLightbox = document.querySelector(".modal-lightbox")
    let modalForm = document.querySelector(".modal-form")
    if (modalContact) {
        name.innerHtml = ""
        name.textContent = namePhotographer
        modalLightbox.style.display = "none";
        modalForm.style.display = "block";
        modal.style.backgroundColor = "rgba(196, 196, 196, 0.4)";


    } else {
        modalLightbox.style.display = "block";
        modalForm.style.display = "none";
        modal.style.backgroundColor = "white";



    }
    modal.style.display = "block";

}
let closeModal = () => {
    modal.style.display = "none";

}

// lien vers la page d'accueil
let allPhotographers = document.querySelector(".logo")
allPhotographers.addEventListener("click", () => {
    window.location = "index.html"
})