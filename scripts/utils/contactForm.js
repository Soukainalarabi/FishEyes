function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
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