function displayModal() {
    const namePhotographer = localStorage.getItem('name');
    const modal = document.getElementById("contact_modal")
    let name = document.querySelector(".name")
    modal.style.display = "block";
    name.textContent = namePhotographer

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

}
// lien vers la page d'accueil
let allPhotographers = document.querySelector(".logo")
allPhotographers.addEventListener("click", () => {
    window.location = "index.html"
})