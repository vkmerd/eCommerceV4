const productContainer = document.querySelector(".product")
let limit = 100;
const BASE_URL = `https://dummyjson.com/products?limit=${limit}`
const itemcontainer = document.querySelector(".product-itemscontainer")
const subcontainer = document.querySelector(".prod-subcontainer")
const addProducts = document.querySelector(".addProduct");

const productFetch = async () => {
    const productBk = await fetch(`${BASE_URL}`);
    const prdjson = productBk.json()
    return prdjson;
}

const prdfr = async() => {
    const productitems = await productFetch()
    const products = productitems.products
    productContainer.innerHTML = ``

    const categories = [...new Set(products.map(product => product.category))];
    console.log(categories);
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
            itemcontainer.classList.toggle("gorunur")
            const storedProducting = localStorage.getItem(`${producting.id}`);
            if(storedProducting){
                const parseProducting = JSON.parse(storedProducting)
                subcontainer.innerHTML = `
                    <div class="subsing">
                        <div class="exitcontainer">
                            <div class="exits">
                                <i class="fa-regular fa-circle-xmark"></i>
                            </div>
                        </div>
                        <div class="products-sub">
                            <div class="product-image">
                                <img src="${parseProducting.thumbnail}">
                            </div>
                            <div class="product-text">
                                <h2>${parseProducting.title}</h2>
                                <p>${parseProducting.description}</p>
                                <p>${parseProducting.category}</p>
                            </div>
                        </div>
                    </div>
                `
                const exits = document.querySelector(".exits")
                exits.addEventListener("click", function(){
                    itemcontainer.classList.remove("gorunur")
                })

            }
            else{
                console.log("ürün bulunamadı");
            }
        })
    }
}

const addProduct = ()=>{
    const addStorage = JSON.parse(localStorage.getItem("userData"))
    addProducts.innerHTML += `
        <div class="addProducting">
            <img src="${addStorage.addimageBase}">
            <h2>${addStorage.productAddTitle}</h2>
        </div>
    `
}


const init = () => {
    prdfr();
    addProduct();
}

init();