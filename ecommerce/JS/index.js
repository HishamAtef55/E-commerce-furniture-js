var current_page = 1;
var records_per_page = 8;
let products = JSON.parse(localStorage.getItem('projectProducts')) || [];
console.log(products);
function numPages()
{
    return Math.ceil(products.length / records_per_page);
}
function prevPage()
{
//   window.scrollTo(0,0);
window.scrollTo({top: 0, behavior: 'smooth'});

    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}
function nextPage()
{
window.scrollTo({top: 0, behavior: 'smooth'});
//   window.scrollTo(0,0);
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var productsDiv = document.querySelector('div.products .row');
    colClass = "col-12 col-md-4 col-lg-3"
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    productsDiv.innerHTML = ""
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        let img = products[i]["image"]
        if (!(img.startsWith("https:")))
            img = '../../admin/images/' + img
        let singleProduct = `
        <div class="card-container ${colClass}">
            <div class="card border-0 mb-5 shadow p-3 mb-5 bg-white rounded" >
                <a href='product.html?id=${products[i]["id"]}'>

                <img class="card-img-top" src="${img}" style="height:300px; width:85%; object-fit:contain;"/>
                <div class="card-body mb-0 pb-0">
                    <h6 class="card-title text-dark">${products[i]["name"]}</h6>
                    <span class="text-danger">${products[i]["price"]}</span>
                </div></a>
                <div class="row product-btns p-2 justify-content-center">
                    <span hidden class="product-id">${products[i]["id"]}</span>
                    <button class="btn btn-light border minus col-1 p-0 me-1" onclick="decreaseNum()">-</button>
                    <button class="btn btn-light border plus col-1 p-0" onclick="increaseNum()">+</button>
                    <input class="number-inc border-0 col-1" readonly type="number" value =1 />
                    <button class="btn btn-dark add-to-cart col-6 p-0 p-lg-2" onclick="addToCart(${products[i]['id']},${products[i]["price"]})">Add to cart</button>
                    <button class="btn btn-light border add-to-wishlist col-1 p-0 ms-1" onclick="addToWishList(${products[i]['id']})"><i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>
        `
        productsDiv.innerHTML += singleProduct
    }
    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }
    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }

 
}
window.onload = function() {
    checkLoggedin()
    changePage(1);
};







