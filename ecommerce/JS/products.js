var dataInp = JSON.parse(localStorage.getItem('projectProducts')) || [];

window.onload = function () {
    checkLoggedin()
    productLayout(dataInp, 3)
    displayListOfCat()

}

/*************************************** Filter Product By Price  ***************************/


let filterProductByPrice = () => {
    filterRes.value = priceFilter.value
    let price = document.querySelector('output').value

    let products = JSON.parse(localStorage.getItem('projectProducts')) || [];
    let filteredArr = products.filter(product => product.price < price)
    productLayout(filteredArr, 3)
}


/*************************************** Display List Of Categories  ***************************/

let displayListOfCat = () => {

    let code = `<ul class="cat-lost">`
    let categories = JSON.parse(localStorage.getItem('projectCategories')) || [];


    for (let i = 0; i < categories.length; i++) {
        code += `<li onclick='filterByCatID(${categories[i].id})'><a>${categories[i].categoryName}</a></li>`
    }
    code += `</ul>`
    document.querySelector('.cat-list-view').innerHTML += code

}


/*************************************** Filter Category By Category ID  ***************************/
let filterByCatID = (catID) => {

    let products = JSON.parse(localStorage.getItem('projectProducts')) || [];
    let categories = JSON.parse(localStorage.getItem('projectCategories')) || [];


    let filteredCat = categories.filter(cat => cat.id == catID)

    let filteredArr = products.filter(product => product.category == filteredCat[0].categoryName)
    productLayout(filteredArr, 3)
}









