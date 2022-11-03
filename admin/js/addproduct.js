var productName = document.getElementById('productNam')
var productPrice = document.getElementById('productPric')
var category = document.getElementById('selectCategory')
var description = document.getElementById('productDsc')
var imageFile = document.getElementById("imageFile")


checkAdmin()


function getCategoriesFromLocalStorage() {
    var allCategories = JSON.parse(localStorage.getItem("projectCategories"))
    allCategories.forEach(ele => createOption(ele))
}

function createOption(element) {
    var newOption = document.createElement("option")
    newOption.innerHTML = element.categoryName
    newOption.value = element.categoryName
    newOption.setAttribute("name", "category")
    selectCategory.append(newOption)
}
getCategoriesFromLocalStorage()

function addProduct(e) {
    try {
        e.preventDefault()
        console.log(imageFile);

        // validation to product
        if (!productName.value.match(/^[a-z A-Z]*$/) || productName.value == '') {
            throw 'invalid proudct name'
        }
        if (!productPrice.value.match(/^[0-9]*$/) || productPrice.value == '') {
            throw 'invalid praice'
        }
        //image
        // .value  return facke path with image name
        if (!imageFile.value) 'image is required'

        // split the fack path at \ 
        var imageNameArray = imageFile.value.split('\\')
        // the last index of arry is the name of uploded image
        var productImage = imageNameArray[imageNameArray.length - 1]
        // generating unique id by using random number with time stamp 
        var productId = Math.floor(Math.random() * Date.now())

        // get old categories if not exist we make new empty array 
        var existingProducts = JSON.parse(localStorage.getItem("projectProducts")) || []
        var productObject = {
            id: productId,
            name: productName.value,
            price: productPrice.value,
            category: category.value,
            image: productImage,
            description: description.value
        }
        //push data to array and store it as string in  locale storage
        existingProducts.push(productObject)
        localStorage.setItem("projectProducts", JSON.stringify(existingProducts))
        errorDiv.innerHtml = ""
        window.location.assign("products.html")

    } catch (error) {
        errorDiv.innerText = error
        console.log(error);
    }

}
