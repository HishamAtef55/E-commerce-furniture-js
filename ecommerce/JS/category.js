
window.onload = function () {
    checkLoggedin();
    getProductsFromLocalByCatId();

}
/************************************* GET PRODUCTS FROM LOCAL STORAGE  ****************************/
function getProductsFromLocalByCatId() {

    let currentURL = window.location.href;
    let currentId = currentURL.split('?id=');
    currentId = currentId[1]

    let allCats = JSON.parse(localStorage.getItem('projectCategories')) || [];
    for (cat of allCats)
        if (cat.id == currentId) {
            catNme = cat.categoryName
            break
        }

    document.querySelector('.page-title-banner h2').innerText = catNme
    var products = JSON.parse(localStorage.getItem('projectProducts')) || [];
    let resProducts = products.filter(product => product.category == catNme)

    productLayout(resProducts)

}