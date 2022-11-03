let checkLoggedin = () => {
    checkAddGuest();

    //saveCatsToLocalStorage()
    if (getCookie('username') == "guest") { // has cookie
        document.querySelector('.menu-logged').style.display = "none"
        var items = document.querySelectorAll('.menu-not-logged');
        for (var i = 0; i < items.length; i++)
            items[i].style.display = "inline-block"
    }
    else {
        var items = document.querySelectorAll('.menu-not-logged');
        for (var i = 0; i < items.length; i++)
            items[i].style.display = "none"
        document.querySelector('.menu-logged').style.display = "inline-block"

    }

    if (window.location.pathname != '/ecommerce/index.html' && window.location.pathname != '/ecommerce/') {
        document.querySelector('.breadcrumb-item.active a').innerText = document.title
        document.querySelector('.page-title-banner h2').innerText = document.title

    }


    document.querySelector('body').innerHTML += "<div class='fixed-alert'><p></p></div>"
    let categories = JSON.parse(localStorage.getItem('projectCategories')) || [];
    categories.forEach(category => {

        document.querySelector('.dropdown-menu').innerHTML += `<li><a class="dropdown-item" href="category.html?id=${category.id}">${category.categoryName}</a></li>`
        footerCatregory.innerHTML += `<li class="d-inline-block col-md-5 mb-3 mt-1"><a class="border p-1 text-dark" href="category.html?id=${category.id}">${category.categoryName}</a></li>`

    });

    getCartTotal()

}

var searchCharcters = document.getElementById("search")

/***************************************** Search Part *************************************************/

function ValidateSearch(value) {
    console.log(value)
    if (!value.match(/^[a-zA-Z]*$/) || value == "") {
        searchErrorDiv.innerText = "in valid name"
        console.log(1)
        return false
    } else {
        searchErrorDiv.innerText = ""
        return true;
    }
}
function searchFor() {
    if (ValidateSearch(search.value)) {
        window.location.assign("search1.html?" + search.value)
    } else {
        searchErrorDiv.innerText = error;
    }
}

/***************************************** Logout *************************************************/


let logout = () => {
    let cookieName = ["username", "id", "role"]
    for (var x = 0; x < cookieName.length; x++)
        document.cookie = cookieName[x] + "=; expires=Mo, 15 Aug 2022 00:00:00 UTC; path=/;"; // UTC login

    checkLoggedin()
}


/***************************************** Get Products ************************************************/
let getProducts = () => {
    fetch('https://fakestoreapi.com/products/')
        .then(response => response.json())
        .then(json => saveToLocalStorage(json))
}


/*************************************** Save To Local Storage **********************************************/
let saveToLocalStorage = (products) => {
    let productsArr = [];
    for (product of products) {
        var singleProduct = {
            id: product.id, name: product.title,
            price: product.price, description: product.description,
            category: product.category, image: product.image
        }
        productsArr.push(singleProduct);
    }
    localStorage.setItem('projectProducts', JSON.stringify(productsArr));
}

getProducts()


/*************************************** display Alert **********************************************/

let displayAlert = (text) => {
    document.querySelector('.fixed-alert p').innerText = text
    document.querySelector('.fixed-alert').style.display = "block";
    setTimeout(() => {
        let alertBox = document.querySelector('.fixed-alert');
        alertBox.style.display = 'none';

    }, 2000);
}



/*************************************** save CatsToLocalStorage **********************************************/

let saveCatsToLocalStorage = (categories) => {

    let categoriesArr = JSON.parse(localStorage.getItem('projectCategories')) || [];

    let categoriesFromApi = JSON.parse(localStorage.getItem('projectProducts')) || [];

    for (let i = 0; i < categoriesFromApi.length; i++) {
        let currentCategory = categoriesFromApi[i]["category"]

        const existingNames = categoriesArr.map((cat) => cat.categoryName);

        if (!existingNames.includes(currentCategory)) {
            let category = {
                id: Math.floor(Math.random() * Date.now()),
                categoryName: currentCategory
            }
            categoriesArr.push(category);
        }
    }

    localStorage.setItem('projectCategories', JSON.stringify(categoriesArr));

    //return categoriesArr
}

saveCatsToLocalStorage()

/*************************************** decrease Num **********************************************/


let decreaseNum = () => {
    // let number = Number(document.querySelector('button.minus').innerText)
    if (event.target.nextElementSibling.nextElementSibling.value > 1)
        event.target.nextElementSibling.nextElementSibling.value--

}
/*************************************** increase Num **********************************************/


let increaseNum = () => {
    event.target.nextElementSibling.value++
}


let checkUserOrGuest = () => {

    if (getCookie("username") == "guest") {
        return false
    }
    else {
        return true
    }

}


let getUserID = () => {

}
/********************** get Cart Total ********************************** */
let getCartTotal = () => {
    let countItems;
    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    if (!userCheck) { // false : guest
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];
        //   if (!oldUSERS.length)
        //     return 0
    }

    else // user : guest 
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    for (const user of oldUSERS) {
        if (user.id == userID) {
            countItems = user.cart.length;
            break
        }
    }

    if (isNaN(countItems)) countItems = 0

    document.querySelector('span.cart-items').innerText = countItems
    if (document.querySelector('.mobile-header span.cart-items'))
        document.querySelector('.mobile-header span.cart-items').innerText = countItems

}



/*************************************** displayDropDown **********************************************/

let displayDropDown = () => {
    if (document.querySelector('li.categories ul').style.display == "" || document.querySelector('li.categories ul').style.display == "none") {
        document.querySelector('li.categories ul').style.display = "inline-block"
    }
    else if (document.querySelector('li.categories ul').style.display == "inline-block") {
        document.querySelector('li.categories ul').style.display = "none"
    }

}


/************************* Add guest as a cookie  ********************************/
let checkAddGuest = () => {
    if (!getCookie("username")) {  //// new guest
        userID = Math.floor(Math.random() * Date.now())
        addGuest("guest", userID)
        setCookie("id", userID, 10);
        setCookie("username", "guest", 10);
        setCookie("role", "user", 10);
    }
}

/******************************* Add Item To Cart  *****************************************/



let addToCart = (productID, price) => {

    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    if (!userCheck) /// customer enter as a guest but not for first time
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    let quantity;
    if (event.target.previousElementSibling)
        quantity = event.target.previousElementSibling.value;

    if (quantity == 0 || quantity == null || quantity == undefined)
        quantity = 1


    let newProduct = {
        id: productID,
        quantity,
        price
    }

    for (const user of oldUSERS) {
        if (user.id == userID) {
            let oldCart = user.cart;
            if (oldCart.length > 0) { // items in cart
                let flag = true
                for (let i = 0; i < oldCart.length; i++) {  ///////#check again
                    if (oldCart[i].id == productID) {
                        oldCart[i].quantity = Number(oldCart[i].quantity) + Number(quantity)
                        flag = false
                        break
                    }
                }
                if (flag)
                    oldCart.push(newProduct)

                user.cart = oldCart
                break
            }

            else { /// cart iis empty
                let arr = []
                arr.push(newProduct)
                user.cart = arr
            }
            break;
        }
    }

    if (!userCheck)
        localStorage.setItem('projectGuests', JSON.stringify(oldUSERS));
    else
        localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));

    displayAlert("Item added to cart successfully")
    getCartTotal()

}


/***************************************  Add Guest in local storage **************************************/
let addGuest = (username, id) => {
    let guest = {
        id: id,
        username,
        cart: [],
        wishlist: []
    }

    var oldGuests = JSON.parse(localStorage.getItem('projectGuests')) || [];
    oldGuests.push(guest);
    localStorage.setItem('projectGuests', JSON.stringify(oldGuests));
}

/******************************* Layout For product  *****************************************/



let productLayout = (dataInp, cols) => {
    let colClass;
    var productsDiv = document.querySelector('div.products .row');

    if (cols == 3) colClass = "col-12 col-md-6 col-lg-4"
    else colClass = "col-12 col-md-4 col-lg-3"

    productsDiv.innerHTML = ""
    for (var i = 0; i < dataInp.length; i++) {
        let img = dataInp[i]["image"]
        if (!(img.startsWith("https:")))
            img = '../../admin/images/' + img
        let singleProduct = `
        <div class="card-container ${colClass}">
            <div class="card border-0 mb-5 shadow p-3 mb-5 bg-white rounded" >
                <a href='product.html?id=${dataInp[i]["id"]}'>

                <img class="card-img-top" src="${img}" style="height:300px; width:85%; object-fit:contain;"/>
                <div class="card-body mb-0 pb-0">
                    <h6 class="card-title text-dark">${dataInp[i]["name"]}</h6>
                    <span class="text-danger">${dataInp[i]["price"]}</span>
                </div></a>
                <div class="row product-btns p-2 justify-content-center">
                    <span hidden class="product-id">${dataInp[i]["id"]}</span>
                    <button class="btn btn-light border minus col-1 p-0 me-1" onclick="decreaseNum()">-</button>
                    <button class="btn btn-light border plus col-1 p-0" onclick="increaseNum()">+</button>
                    <input class="number-inc border-0 col-1" readonly type="number" value =1 />
                    <button class="btn btn-dark add-to-cart col-6 p-0 p-lg-2" onclick="addToCart(${dataInp[i]['id']},${dataInp[i]["price"]})">Add to cart</button>
                    <button class="btn btn-light border add-to-wishlist col-1 p-0 ms-1" onclick="addToWishList(${dataInp[i]['id']})"><i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>
        `
        productsDiv.innerHTML += singleProduct
    }


}
