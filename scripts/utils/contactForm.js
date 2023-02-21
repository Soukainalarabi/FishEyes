const modal = document.getElementById("contact_modal")
let name = document.querySelector(".name")
let iconClose = document.querySelector(".close-modalContact")
///formulaire Contact
let form = document.querySelector("form")
let firstName = document.getElementById("first")
let lastName = document.getElementById("last")
let email = document.getElementById("email")
let message = document.getElementById("message")
////message d'erreurs
let erreurFirstName = document.getElementById("firstNameErrorMsg")
let erreurLastName = document.getElementById("lastNameErrorMsg")
let erreurEmail = document.getElementById("emailErrorMsg")
let erreurMessage = document.getElementById("messageErrorMsg")
//regex
let regexName = /^[a-z]/gi
let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexMessage = /^[a-z]{10}/gi
//afficher la modale contact ou lightbox
let displayModal = (modalContact) => {
    let modalLightbox = document.querySelector(".modal-lightbox")
    let modalForm = document.querySelector(".modal-form")
    if (modalContact) {
        const namePhotographer = localStorage.getItem('name');
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
//fermer la modale
let closeModal = () => {
    modal.style.display = "none";
}
iconClose.addEventListener("click", () => {
    closeModal(true)
})
iconClose.addEventListener("keyup", (e) => {

    if (e.key == 'Enter') {
        closeModal(true)
    }
});
// lien vers la page d'accueil
let allPhotographers = document.querySelector(".logo")
allPhotographers.addEventListener("click", () => {
    window.location = "index.html"
})

//fonctions verification contenu formulaire
let firstVerification = () => {
    if (!first.value) {
        erreurFirstName.textContent = "Veuillez saisir votre prénom "
        return false

    } if (first.value.match(regexName)) {
        erreurFirstName.textContent = ""
        return true
    } else {
        erreurFirstName.textContent = "Veuillez vérifier votre prénom "
        return false
    }
}
let lastVerification = () => {
    if (!last.value) {
        erreurLastName.textContent = "Veuillez saisir votre nom "
        return false

    } if (!last.value.match(regexName)) {
        erreurLastName.textContent = "Veuillez vérifier votre nom "
        return false

    } else {
        erreurLastName.textContent = ""
        return true
    }
}
let emailVerification = () => {
    if (!email.value) {
        erreurEmail.textContent = "Veuillez saisir votre email"
        return false

    } if (!email.value.match(regexEmail)) {
        erreurEmail.textContent = "Veuillez vérifier votre email"
        return false

    } else {
        erreurEmail.textContent = ""

        console.log(email.value);
        return true
    }
}
let messageVerification = () => {
    if (!message.value) {
        erreurMessage.textContent = "Veuillez saisir votre message "
        return false

    } if (!message.value.match(regexMessage)) {
        erreurMessage.textContent = "Veuillez saisir votre message "
        return false


    } else {
        erreurMessage.textContent = ""
        return true

    }
}


//envoie du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let isPrenomValid = firstVerification()
    let isNomValid = lastVerification()
    let isEmailValid = emailVerification()
    let isMsgValid = messageVerification()
    if (isPrenomValid && isNomValid && isEmailValid && isMsgValid) {
        closeModal()
        let infoFormulaire = {
            prenom: first.value,
            nom: last.value,
            email: email.value,
            message: message.value
        }
        console.log(infoFormulaire);
        document.forms['reserve'].reset(); //le contenue du formulaire sera initialisé

    }

})


