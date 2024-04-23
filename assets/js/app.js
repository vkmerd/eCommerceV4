const productContainer = document.querySelector(".product")
let limit = 100;
const BASE_URL = `https://dummyjson.com/products?limit=${limit}`
const itemcontainer = document.querySelector(".product-itemscontainer")
const subcontainer = document.querySelector(".prod-subcontainer")

const productFetch = async () => {
    const productBk = await fetch(`${BASE_URL}`);
    const prdjson = productBk.json()
    return prdjson;
}

const prdfr = async() => {
    const productitems = await productFetch()
    const products = productitems.products
    productContainer.innerHTML = ``
    for(const producting of products){
       const productBox = document.createElement('div')
       productBox.classList.add("product-box")
       productBox.innerHTML += `
            <img src="${producting.thumbnail}" class="img-homeimages">
            <h3 class="product-title">${producting.title}</h3>
            <p class="product-desc">${producting.description}</p>
            <p class="product-price">$${producting.price}</p>
        `
        productContainer.appendChild(productBox);
        productBox.addEventListener("click",function(){
            localStorage.setItem(`${producting.id}`, JSON.stringify(producting))
            itemcontainer.classList.add("gorunur")
            const storedProducting = localStorage.getItem(`${producting.id}`);
            if(storedProducting){
                const parseProducting = JSON.parse(storedProducting)
                subcontainer.innerHTML += `
                    <img src="${parseProducting.thumbnail}">
                `
            }
            else{
                console.log("ürün bulunamadı");
            }
        })
    }
}




const init = () => {
    prdfr()
}

init();