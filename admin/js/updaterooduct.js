checkAdmin()


// get query string 
var queryString = window.location.search
var productId = queryString.replace("?", "")
var productName = document.getElementById('productNam')
var productPrice = document.getElementById('productPric')
var category = document.getElementById('selectCategory')
var description = document.getElementById('productDsc')
var imageFile = document.getElementById("imageFile")
var oldImageNameInput = document.getElementById("oldImageName")
var oldImage = document.getElementById("oldImage")
var imageValue
//**********************get all Products from locale storage************
var allProducts = JSON.parse(localStorage.getItem("projectProducts"))

//*****************find product by id******************
var oldObject = allProducts.find(element => element.id == productId)
productName.value = oldObject.name
productPrice.value = oldObject.price
description.innerText = oldObject.description
oldImageNameInput.value = oldObject.image
var selectedCategory = oldObject.category
// oldImage.src            = "../image/" + oldObject.image 
oldImage.src = oldObject.image // absolue path
var productImage
function getCategoriesFromLocalStorage() {
    var allCategories = JSON.parse(localStorage.getItem("projectCategories"))
    allCategories.forEach(ele => createOption(ele))
}

function createOption(element) {
    var newOption = document.createElement("option")
    newOption.innerHTML = element.categoryName
    newOption.value = element.categoryName
    newOption.setAttribute("name", "category")
    category.append(newOption)
    if (element.categoryName == selectedCategory) {
        category.value = selectedCategory
    }
}
getCategoriesFromLocalStorage()

function updateProduct() {
    try {
        //filter method return new arry without thise product
        var products = allProducts.filter((element) => element.id != productId)
        if (!productName.value.match(/^[a-z A-Z]*$/) || productName.value == '') {
            throw 'invalid proudct name'
        }
        if (!productPrice.value.match(/^[0-9]*$/) || productPrice.value == '') {
            throw 'invalid praice'
        }
        // 
        if (!imageFile.value) {
            imageValue = oldImageNameInput.value
        } else {
            var imageNameArray = imageFile.value.split('\\')
            // the last index of arry is the name of uploded image
            imageValue = imageNameArray[imageNameArray.length - 1]
        }
        var editedProduct = {
            id: productId,
            name: productName.value,
            price: productPrice.value,
            category: category.value,
            image: imageValue,
            description: description.value
        }
        products.push(editedProduct)
        localStorage.setItem("projectProducts", JSON.stringify(products))
        productErrorsDiv.innerHtml = ""
        window.location.assign("products.html")
    } catch (error) {
        productErrorsDiv.innerText = error
    }
}
