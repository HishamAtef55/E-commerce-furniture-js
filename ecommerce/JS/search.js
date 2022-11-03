

checkLoggedin();

getSearchedDataFromLocaleStorage()
function getSearchedDataFromLocaleStorage() {
    let queryString = window.location.href
    let charx = queryString.split('?search=');
    charx = charx[1]
    try {
        var allData = JSON.parse(localStorage.getItem("projectProducts")) || [];
        var searchResultArray = allData.filter(element => element.name.toLowerCase().startsWith(charx))
        // check empty result
        if (!searchResultArray.length) throw " sorry no matched result "
        productLayout(searchResultArray)

    } catch (error) {
        document.querySelector('.products').innerHTML = `<p class="text-center m-5 h5">${error}</p>`
    }
} 