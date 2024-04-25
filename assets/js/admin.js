const form = document.querySelector("#dataForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const productAddTitle = document.querySelector("#productAddTitle").value;
    const productAddDesc = document.querySelector("#productAddDesc").value;
    const productAddImage = document.querySelector("#productAddimage").files[0]; 
    const productAddPrice = document.querySelector("#productAddPrice").value;

    if (productAddImage) { 
        const reader = new FileReader();
        reader.onload = function(e) {
            const addimageBase = e.target.result;
            let addStorageProducts = JSON.parse(localStorage.getItem("userData")) || [];
            addStorageProducts.push({ productAddTitle, productAddDesc, addimageBase, productAddPrice });
            localStorage.setItem('userData', JSON.stringify(addStorageProducts));
            alert('Data saved successfully!');
        };
        reader.readAsDataURL(productAddImage);
    }
    window.location.href = "index.html"; 
});
