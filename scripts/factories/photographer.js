function photographerFactory(data) {
    const { name, portrait, price, id, country, tagline, city } = data;
    const picture = `assets/photographers/${portrait}`;
    const article = document.createElement('article');
    const divCard = document.createElement('div');
    const link = document.createElement('a')
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3')
    const h4 = document.createElement('h4')
    const pPrice = document.createElement('p')
    function getUserCardDOM() {
        article.setAttribute("aria-label", "carte photographer")
        divCard.setAttribute("class", "information-photographer")
        divCard.setAttribute("aria-label", "information sur le photographe")
        link.setAttribute("href", "#")
        img.setAttribute("src", picture)
        img.setAttribute("alt", "")
        // img.setAttribute("alt", `image du photographe ${name}`
        // )
        h2.textContent = name;
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(divCard)
        h3.textContent = city.concat(", ", country)
        divCard.appendChild(h3)
        h4.textContent = tagline
        divCard.appendChild(h4)
        pPrice.textContent = price + "€/jour"
        divCard.appendChild(pPrice)
        return (article);


    }

    return { id, getUserCardDOM }
}