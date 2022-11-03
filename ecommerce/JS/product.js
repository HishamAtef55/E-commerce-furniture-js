window.onload = function () {
    checkLoggedin()
    getCurrentProductId();
    getLatestPrducts()
}

/************************************* get Current Product Id  ***************************/
let getCurrentProductId = () => {
    let currentURL = window.location.href;
    let id = currentURL.split('?id=');
    id = id[1]
    getProductDetailsById(id)

}

/************************************* get Current Product Id  ***************************/
let getProductDetailsById = (id) => {
    var products = JSON.parse(localStorage.getItem('projectProducts')) || [];
    var productDiv = document.querySelector('div.single-product-container');

    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            let img = products[i]["image"]
            if (!(img.startsWith("https:")))
                img = '../../admin/images/' + img
            let productBlock = `
            <div class="single-p row"><div class="col-md-4">
                <img width="300" height="300" src=${img}>
            </div>
            <div class="col-md-8">
                <h3>${products[i]["name"]}</h3>
                <p class="pt-2">${products[i]["description"]}</p>
                <h5>Category : ${products[i]["category"]}</h5>
                <span class="text-danger mt-5">${products[i]["price"]}</span>

                <div class="product-btns mt-3">
                    <span hidden class="product-id">${products[i]["id"]}</span>
                    <button class="btn btn-light border minus" onclick="decreaseNum()">-</button>
                    <button class="btn btn-light border plus" onclick="increaseNum()">+</button>
                    <input class="number-inc  border-0" type="number" value =1 />
                    <button class="btn btn-dark add-to-cart" onclick="addToCart(${products[i]['id']} ,${products[i]["price"]})">Add to cart</button>
                    <button class="btn btn-light border add-to-wishlist" onclick="addToWishList(${products[i]['id']})"><i class="fa-solid fa-heart"></i></button>
                </div>
            </div> `;

            productDiv.innerHTML += productBlock;
        }
    }
}

/************************************************* Sidebar  ************************************/
let getLatestPrducts = () => {

    var dataInp = JSON.parse(localStorage.getItem('projectProducts')) || [];

    var sidebarDiv = document.querySelector('div.sidebar-products');

    for (var i = 0; i < 4; i++) {

        let singleProduct = `
        <div class="sidebar-single-product row">
            <div class="col-md-3">
                <a href='product.html?id=${dataInp[i]["id"]}'>
                    <img width="50" height="50" src="${dataInp[i]["image"]}"/>
                </a>
            </div>
            <div class="col-md-9">
                <a href='product.html?id=${dataInp[i]["id"]}'>
                    <p>${dataInp[i]["name"]}</p>
                    <span>${dataInp[i]["price"]}</span>
                </a>
            </div>
        </div>`
        sidebarDiv.innerHTML += singleProduct
    }

}