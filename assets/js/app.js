const productContainer = document.querySelector(".product")
let limit = 100;
const BASE_URL = `https://dummyjson.com/products?limit=${limit}`

const productFetch = async () => {
    const productBk = await fetch(`${BASE_URL}`);
    const prdjson = productBk.json()
    return prdjson;
}

const prdfr = async() => {
    const productitems = await productFetch()
    const products = productitems.products
    productContainer.innerHTML = ``
    for(const productitems of products){
       const productBox = document.createElement('div')
       productBox.classList.add("product-box")
       productBox.innerHTML += `
            <img src="${productitems.thumbnail}" class="img-homeimages">
            <h3 class="product-title">${productitems.title}</h3>
            <p class="product-desc">${productitems.description}</p>
            <p class="product-price">$${productitems.price}</p>
        `
        productContainer.appendChild(productBox);
        productBox.addEventListener("click",function(){
            console.log(productitems.id);
        })
    }
}




const init = () => {
    prdfr()
}

init();