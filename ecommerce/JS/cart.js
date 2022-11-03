


window.onload = function () {
    checkLoggedin();
    let productIds = getCartByUserId()
    getProductsFromLocal(productIds)
    calcCartTotal()

}


/*********************** Get Cart By User Id *********************************/

let getCartByUserId = () => {
    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    if (!userCheck)
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];


    for (let user of oldUSERS) {
        if (user.id == userID) {
            if (user.cart.length > 0) return user.cart
            else return []
        }
    }
}


/************************* Display Products from Local  ****************************************/

function getProductsFromLocal(ids) {


    if (ids == undefined || ids.length == 0) /// Cart is empty
        document.querySelector('.container.cart').innerHTML = "<p style='text-align:center'>Your Cart is empty</p>"

    else {
        var products = JSON.parse(localStorage.getItem('projectProducts')) || [];
        var cartDiv = document.querySelector('.container.cart table tbody');

        for (let i = 0; i < ids.length; i++) {
            for (var j = 0; j < products.length; j++) {
                if (ids[i].id == products[j].id) {
                    let img = products[j]["image"]
                    if (!(img.startsWith("https:")))
                        img = '../../admin/images/' + img

                    let singleRow = `
                    <tr class="align-middle">
                        <td class="col-1"><a href='product.html?id=${products[j]["id"]}'><img src='${img}' width="70" height="70"/></a></td>
                        <td class="col-5"><a href='product.html?id=${products[j]["id"]}' class="card-title text-dark">${products[j]["name"]}</a></td>
                        <td class="col-1 text-danger">${products[j]["price"]}</td>
                        <td class="col-2"><button class="btn btn-light border minus" onclick="decreaseNumInCart(${products[j].id},${products[j]["price"]})">-</button>
                        <button class="btn btn-light border plus" onclick="increaseNumInCart(${products[j].id},${products[j]["price"]})">+</button> 
                        <input class="number-inc border-0" readonly type="number" value="${ids[i]["quantity"]}"></td>
                        <td class="col-1 total">${parseInt(products[j]["price"]) * parseInt(ids[i]["quantity"])}</td>
                        <td class="col-2"><button class="btn btn-dark remove-from-cart product-btns" onclick="removeFromCart(${products[j].id})">Remove From Cart</button></td>
                    </tr>`;
                    cartDiv.innerHTML += singleRow
                    break;
                }
            }
        }
    }
}

/*********************** Remove from Cart *********************************/
let removeFromCart = (productID) => {

    event.target.parentNode.parentNode.remove()

    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    let cart = getCartByUserId()

    if (!userCheck)
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    let arr = cart.filter(item => item.id != productID)

    for (let user of oldUSERS) {
        if (user.id == userID) {
            user.cart = arr
            break
        }
    }

    if (!userCheck)
        localStorage.setItem('projectGuests', JSON.stringify(oldUSERS));
    else
        localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));

    displayAlert("Item has been removed from cart successfully")
    getCartTotal()
    calcCartTotal()
}



/***************************** Clear Cart  *********************************************/
let clearCart = () => {
    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    if (!userCheck)
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    for (const user of oldUSERS)
        if (user.id == userID) {
            user.cart = []; break
        }

    if (!userCheck)
        localStorage.setItem('projectGuests', JSON.stringify(oldUSERS));

    else
        localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));

    document.querySelector('.container.cart').innerHTML = "<p style='text-align:center'>Your Cart is empty</p>"
}


/******************************** Calculate Cart Total *****************************/

let calcCartTotal = () => {

    let userCart = getCartByUserId()
    let total = 0;

    for (let i = 0; i < userCart.length; i++)
        total += parseInt(userCart[i]["price"]) * userCart[i]["quantity"]

    if (document.querySelector('.cart-total-summaray .cart-total-1 span'))
        document.querySelector('.cart-total-summaray .cart-total-1 span').innerText = Math.round(total)

}

/******************************** Update Cart Total *****************************/

let increaseNumInCart = (productId, price) => {
    event.target.nextElementSibling.value++
    event.target.parentNode.nextElementSibling.innerText = parseInt(price) * event.target.nextElementSibling.value

    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    if (!userCheck)
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    for (const user of oldUSERS) {
        if (user.id == userID) {
            let oldCart = user.cart;
            for (let i = 0; i < oldCart.length; i++) {
                if (oldCart[i].id == productId) {
                    oldCart[i].quantity = event.target.nextElementSibling.value
                    user.cart = oldCart
                    break
                }
            }
        }
    }

    if (!userCheck)
        localStorage.setItem('projectGuests', JSON.stringify(oldUSERS));

    else
        localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));

    //getCartTotal()
    calcCartTotal()
}

/*************************************** Decrease Number Of Quantity In Cart ********************************/
let decreaseNumInCart = (productId, price) => {
    if (event.target.nextElementSibling.nextElementSibling.value > 1) {
        event.target.nextElementSibling.nextElementSibling.value--

        event.target.parentNode.nextElementSibling.innerHTML = parseInt(price) * event.target.nextElementSibling.nextElementSibling.value

        let userCheck = checkUserOrGuest() /// false = guest ; true = user
        let userID = getCookie('id')
        let oldUSERS;

        if (!userCheck)
            oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

        else
            oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

        for (const user of oldUSERS) {
            if (user.id == userID) {
                let oldCart = user.cart;
                for (let i = 0; i < oldCart.length; i++) {
                    if (oldCart[i].id == productId) {
                        oldCart[i].quantity = event.target.nextElementSibling.nextElementSibling.value
                        user.cart = oldCart
                        break
                    }
                }
            }
        }

        if (!userCheck)
            localStorage.setItem('projectGuests', JSON.stringify(oldUSERS));

        else
            localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));

        getCartTotal()
        calcCartTotal()
    }

}

