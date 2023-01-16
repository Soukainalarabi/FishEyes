function photographerFactory(data) {
    const { name, portrait, price, id, country, tagline, city } = data;
    const picture = `assets/photographers/${portrait}`;
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3')
    const h4 = document.createElement('h4')
    const pPrice = document.createElement('p')
    function getUserCardDOM() {
        img.setAttribute("src", picture)
        img.setAttribute("alt", "description image")
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        h3.textContent = city.concat(", ", country)
        article.appendChild(h3)
        h4.textContent = tagline
        article.appendChild(h4)
        pPrice.textContent = price + "€/jour"
        article.appendChild(pPrice)
        return (article);

    }

    return { id, getUserCardDOM }
}