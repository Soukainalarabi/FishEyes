const modal = document.getElementById("contact_modal")
let name = document.querySelector(".name")
let iconClose = document.querySelector(".close-modalContact")
let modalContact = document.querySelector(".modal-contact")
let modalLightbox = document.querySelector(".modal-lightbox")
let modalForm = document.querySelector(".modal-form")
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
let regexEmail = /^[A-Za-z][\w$.]+@[\w]+\.\w+$/;
let regexMessage = /^[a-z]{10}/gi
//afficher la modale contact ou lightbox
export function displayModal(modalContact) {
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
export function closeModal() {
    modal.style.display = "none";
}
iconClose.addEventListener("click", () => {
    closeModal(true)
})
modalContact.addEventListener("click", () => {
    displayModal(true)
})
iconClose.addEventListener("keyup", (e) => {
    if (e.key == 'Enter') {
        closeModal(true)
    }
});
//la verification du contenu du formulaire
let firstVerification = () => {
    if (!firstName.value) {
        erreurFirstName.textContent = "Veuillez saisir votre pr??nom "
        return false

    } if (firstName.value.match(regexName)) {
        erreurFirstName.textContent = ""
        return true
    } else {
        erreurFirstName.textContent = "Veuillez v??rifier votre pr??nom "
        return false
    }
}
let lastVerification = () => {
    if (!lastName.value) {
        erreurLastName.textContent = "Veuillez saisir votre nom "
        return false

    } if (!lastName.value.match(regexName)) {
        erreurLastName.textContent = "Veuillez v??rifier votre nom "
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
        erreurEmail.textContent = "Veuillez v??rifier votre email"
        return false

    } else {
        erreurEmail.textContent = ""

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
            prenom: firstName.value,
            nom: lastName.value,
            email: email.value,
            message: message.value
        }
        console.log(infoFormulaire);
        document.forms['reserve'].reset(); //le contenu du formulaire sera initialis??

    }

})


export default { closeModal, displayModal }