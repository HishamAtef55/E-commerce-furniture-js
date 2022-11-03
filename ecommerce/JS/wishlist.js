

window.onload = function () {
    checkLoggedin()
    let productIds = getWishlistByUserId()
    getProductsFromLocal(productIds)
}


/*********************** Get Wishlist By User Id *********************************/

let getWishlistByUserId = () => {
    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    if (!userCheck)
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    for (const user of oldUSERS) {
        if (user.id == userID)
            return user.wishlist;
    }
}



/*********************** Remove from wishlist *********************************/
let removeFromWishlist = (productID) => {
    event.target.parentNode.parentNode.remove()
    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;
    let wishlist = getWishlistByUserId()


    if (!userCheck) {
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];
        let arr = wishlist.filter(item => item != productID)
        oldUSERS[0].wishlist = arr
    }
    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    let arr = wishlist.filter(item => item != productID)
    for (const user of oldUSERS) {
        if (user.id == userID) {
            user.wishlist = arr
            break
        }
    }

    if (!userCheck)
        localStorage.setItem('projectGuests', JSON.stringify(oldUSERS));

    else
        localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));

    displayAlert("Item has been removed from wishlist successfully")

}

/******************************* Add Item To Wishlist  *****************************************/
let addToWishList = (productID) => {

    let userCheck = checkUserOrGuest() /// false = guest ; true = user
    let userID = getCookie('id')
    let oldUSERS;

    if (!userCheck)
        oldUSERS = JSON.parse(localStorage.getItem('projectGuests')) || [];

    else
        oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    for (const user of oldUSERS) {
        if (user.id == userID) {
            let oldWishlist = user.wishlist;
            console.log("old wishlist = " + oldWishlist)
            let productInwishList = oldWishlist.some((item) => item == productID);

            if (!productInwishList) {
                oldWishlist.push(productID)
                user.wishlist = oldWishlist
                displayAlert("Item has been added to wishlist successfully")

                if (!userCheck)
                    localStorage.setItem('projectGuests', JSON.stringify(oldUSERS));
                else
                    localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));

                return 0;
            }
            break
        }
    }

    return displayAlert("Item already in wishlist")
}


/************************* Display Products from Local  ****************************************/

function getProductsFromLocal(ids) {

    if (ids.length == 0) /// wishlist is empty
        document.querySelector('.container.wishlist').innerHTML = "<p class='text-center mb-3'>Your wishlist is empty</p>"

    else {
        var products = JSON.parse(localStorage.getItem('projectProducts')) || [];
        var wishlistDiv = document.querySelector('div.container.wishlist table tbody');

        for (let i = 0; i < ids.length; i++) {
            for (var j = 0; j < products.length; j++) {
                if (ids[i] == products[j].id) {

                    let img = products[j]["image"]
                    if (!(img.startsWith("https:")))
                        img = '../../admin/images/' + img

                    let singleRow = `
                    <tr class="align-middle">
                        <td class="col-1"><a href='product.html?id=${products[j]["id"]}'><img src='${img}' width="70" height="70"/></a></td>
                        <td class="col-6"><a href='product.html?id=${products[j]["id"]}' class="card-title text-dark">${products[j]["name"]}</a></td>
                        <td class="col-1 text-danger">${products[j]["price"]}</td>
                        <td class="col-4">  
                        <button class="btn btn-dark mb-2 add-to-cart" onclick="addToCart(${products[j]['id']} ,${products[j]["price"]})">Add to cart</button>
                        <button class="btn btn-dark  remove-from-wishlist" onclick="removeFromWishlist(${products[j].id})">Remove From wishlist</button>
                        
                        </td>

                    </tr>`;
                    wishlistDiv.innerHTML += singleRow
                    break;
                }
            }
        }
    }
}






