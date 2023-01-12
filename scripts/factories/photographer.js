function photographerFactory(data) {
    const { name, portrait, price, id, country, tagline, city } = data;
    //     console.log(data.portrait);
    const picture = `assets/photographers/${portrait}`;
    const article = document.createElement('article');
    function getUserCardDOM() {
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "description image")
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        const h3 = document.createElement('h3')
        h3.textContent = city.concat(", ", country)
        article.appendChild(h3)
        const h4 = document.createElement('h4')
        h4.textContent = tagline
        article.appendChild(h4)
        const pPrice = document.createElement('p')
        pPrice.textContent = price + "€/jour"
        article.appendChild(pPrice)
        return (article);

    }
    // article.addEventListener("click", () => {
    //     window.location = "photographer.html";

    // })
    return { name, portrait, getUserCardDOM }
}