const productContainer = document.querySelector(".product")
let limit = 100;
const BASE_URL = `https://dummyjson.com/products?limit=${limit}`
const itemcontainer = document.querySelector(".product-itemscontainer")
const subcontainer = document.querySelector(".prod-subcontainer")
const addProducts = document.querySelector(".addProduct");
const basket = document.querySelector(".basket")
const basketCont = document.querySelector(".basketCont")

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
                                <a href="#" data-add-id="${producting.id}" class="subBasketData"> Sepete Ekle </a>
                            </div>
                        </div>
                        </div>
                        `
                        const exits = document.querySelector(".exits")
                        exits.addEventListener("click", function(){
                            itemcontainer.classList.remove("gorunur")
                        })
                        const subBasketData = document.querySelector(".subBasketData")
                        subBasketData.addEventListener("click" ,function(){
                            localStorage.setItem("subData", JSON.stringify(parseProducting))
                            basketCont.classList.toggle("basketContOpen")
                                const subData = JSON.parse(localStorage.getItem("subData"));
                                basketCont.innerHTML += `
                                <div class="basketFlex">
                                   <div class="basketimg"> <img src="${subData.thumbnail}"></div>
                                   <div class="basketText">
                                        <h3>${subData.title}</h3>
                                        <p>${subData.price}</p>
                                   </div>
                                </div>
                            `
                        })
                    }
                    else{
                        console.log("ürün bulunamadı");
                    }
                    
                })
    }
    basket.addEventListener("click", function(e){
        e.preventDefault();
        basketCont.classList.toggle("basketContOpen")  
    })
}

const addProduct = () => {
    let productsStorage = JSON.parse(localStorage.getItem("userData")) || [];
    addProducts.innerHTML = '';  

    productsStorage.forEach(product => {
        addProducts.innerHTML += `
            <img src="${product.addimageBase}" class="img-homeimages">
            <h3 class="product-title">${product.productAddTitle}</h3>
            <p class="product-desc">${product.productAddDesc}</p>
            <p class="product-price">$${product.productAddPrice}</p>
        `;
    });
}

const selectedFetch = async() => {
    const selectProductİtems = await productFetch()
    const products = selectProductİtems.products

    const categories = [...new Set(products.map(product => product.category))];
    const select = document.querySelector("#categorySelect")
    categories.forEach(category => {
        const option = document.createElement('option')
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
    console.log(categories);
}

const filterByCategory = async () => {
    const selectProductİtems = await productFetch()
    const products = selectProductİtems.products
    const filterProductinds = document.querySelector(".filterProductinds")
    filterProductinds.innerHTML = '';
    
    const selectedCategory = document.querySelector("#categorySelect").value
    const filterProducts = products.filter(product => product.category === selectedCategory)
    
    console.log(filterProducts)
    
    filterProducts.forEach(products2 => {
        productContainer.innerHTML = '';
        const createFilterProducts = document.createElement('div')
        createFilterProducts.classList.add("createFilterProducts")
        console.log(createFilterProducts);
        createFilterProducts.innerHTML =`
            <img src="${products2.thumbnail}">
            <h3>${products2.title}</h3>
            <p>${products2.description}</p>
            <span>$${products2.price}</span>
            `
            filterProductinds.appendChild(createFilterProducts)
    });
}
const init = () => {
    prdfr();
    addProduct();
    selectedFetch();
}

init();