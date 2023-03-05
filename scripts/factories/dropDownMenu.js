//cette fonction crée le menu déroulant qui effectue le trie des medias
export default function dropDownMenuFactory( showMedias) {
    let linkIconBas = document.createElement("a")
    let iconBas = document.createElement("img")
    let selectOption = document.getElementById("choice-select")
    let dateButton = document.querySelector(".date")
    let populariteButton = document.querySelector(".popularite")
    let titreButton = document.querySelector(".titre")
    let ligneHr1 = document.querySelector(".ligne1")
    let ligneHr2 = document.querySelector(".ligne2")
    linkIconBas.setAttribute("class", "icon-dropDown")
    linkIconBas.setAttribute("href", "#")
    iconBas.setAttribute("class", "icon-bas")
    iconBas.setAttribute("src", "assets/icons/icons8-chevron-droit-16.png")
    iconBas.setAttribute("aria-label", "icon pour ouvrir le menu déroulant")
    iconBas.setAttribute("alt", "icon vers le bas")
    let affichageMenuSelectAll = () => {
        populariteButton.style.display = "block"
        iconBas.style.transform = "rotate(3.142rad)"
        dateButton.style.display = "block"
        titreButton.style.display = "block"
        ligneHr1.style.display = "block"
        ligneHr2.style.display = "block"
    }
    iconBas.addEventListener("click", () => {
        affichageMenuSelectAll()
    })
    linkIconBas.addEventListener("keyup", (e) => {
        if (e.key == 'Enter') {
            affichageMenuSelectAll()
        }
    })
    selectOption.addEventListener("click", (e) => {
        if (e.target.value == "date") {
            dateButton.appendChild(linkIconBas)
            dateButton.style.display = "block"
            iconBas.style.transform = "none"
            populariteButton.style.display = "none"
            titreButton.style.display = "none"
            ligneHr1.style.display = "none"
            ligneHr2.style.display = "none"
            //on appel la fonction showMedias()du fichier pages/photographer.js pour retrier les medias par date
            showMedias( true)
        } else if (e.target.value == "popularite") {
            populariteButton.appendChild(linkIconBas)
            dateButton.style.display = "none"
            populariteButton.style.display = "block"
            iconBas.style.transform = "none"
            titreButton.style.display = "none"
            ligneHr1.style.display = "none"
            ligneHr2.style.display = "none"
             //on appel la fonction showMedias()du fichier pages/photographer.js pour retrier les medias par nombre des likes
            showMedias( false, false, true)
        } else if (e.target.value == "titre") {
            titreButton.appendChild(linkIconBas)
            iconBas.style.transform = "none"
            dateButton.style.display = "none"
            populariteButton.style.display = "none"
            ligneHr1.style.display = "none"
            ligneHr2.style.display = "none"
            titreButton.style.display = "block"
             //on appel la fonction showMedias()du fichier pages/photographer.js pour retrier les medias par titre
            showMedias( false, true)
        }
    })
    /*afficher le menu déroulant par défaut */
    let affichageMenuSelect = () => {
        populariteButton.appendChild(linkIconBas)
        linkIconBas.appendChild(iconBas)
    }
    return { affichageMenuSelect }
}