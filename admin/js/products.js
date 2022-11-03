/**************************** Display all ******************************** */
checkAdmin()

var i = 1

function getDataFromLocalStorage() {
    var projectProducts = JSON.parse(localStorage.getItem("projectProducts"))
    projectProducts.forEach(ele => createRow(ele))
}

function createRow(product) {
    var newRow = document.createElement("tr")
    var cell1 = document.createElement("td")
    var cell2 = document.createElement("td")
    var cell3 = document.createElement("td")
    var cell4 = document.createElement("td")
    var cell5 = document.createElement("td")
    var cell6 = document.createElement("td")
    var cell7 = document.createElement("td")
    var cell8 = document.createElement("td")
    var cell9 = document.createElement("td")


    cell1.innerHTML = i++
    cell2.innerHTML = product.id
    cell3.innerHTML = product.name
    cell4.innerHTML = product.price
    cell5.innerHTML = product.category
    let img = product.image
    if (img.startsWith("https:"))
        cell6.innerHTML = `<img src="${product.image}" alt="${product.image}" height="50px" width="50px">`
    else
        cell6.innerHTML = ` <img src="${'../images/' + product.image}" alt="${product.image}" height="50px" width="50px">`

    cell7.innerHTML = product.description.substring(0, 30) + "..."
    cell8.innerHTML = "<i onclick='editeProduct(event)' class='fa-sharp fa-solid fa-pen-to-square'></i>"
    cell9.innerHTML = "<i onclick='deleteProduct(event)' class='fa-sharp fa-solid fa-trash'></i>"
    newRow.append(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9)
    allProductTable.append(newRow)
};
getDataFromLocalStorage()

// ************************************ edite ************************************

function editeProduct(e) {
    var productId = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML
    window.location.assign("editproduct.html?" + productId)
}

// ************************************ delete ************************************

function deleteProduct(e) {
    // get id of the category
    var productId = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML
    console.log(productId);

    // get all products from local storge
    let products = JSON.parse(localStorage.getItem("projectProducts"))
    console.log(products);

    // delet from local storage
    let newProducts = products.filter((element) => element.id != productId)
    console.log(newProducts);
    localStorage.setItem("projectProducts", JSON.stringify(newProducts))
    // delete from Html 
    e.target.parentNode.parentNode.remove()
}