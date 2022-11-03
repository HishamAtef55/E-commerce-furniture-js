checkAdmin()


/**************************** Display all ******************************** */
var i = 1

function getDataFromLocalStorage() {
    var allCategories = JSON.parse(localStorage.getItem("projectCategories"))
    // if(!allCategories){
    //     var newRow    = document.createElement("tr")
    //     var cell = document.createElement("td")
    //     cell.setAttribute("colspa")


    // }
    allCategories.forEach(ele => createRow(ele))
}

function createRow(category) {
    var newRow = document.createElement("tr")
    var cell1 = document.createElement("td")
    var cell2 = document.createElement("td")
    var cell3 = document.createElement("td")
    var cell4 = document.createElement("td")
    var cell5 = document.createElement("td")

    cell1.innerHTML = i++
    cell2.innerHTML = category.id
    cell3.innerHTML = category.categoryName
    cell4.innerHTML = "<i onclick='editeCategory(event)' class='fa-sharp fa-solid fa-pen-to-square'></i>"
    cell5.innerHTML = "<i onclick='deleteCategory(event)' class='fa-sharp fa-solid fa-trash'></i>"
    newRow.append(cell1, cell2, cell3, cell4, cell5)
    allCategoriesTable.append(newRow)
};
getDataFromLocalStorage()

// ************************************ edite ************************************

function editeCategory(e) {
    var categoryId = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML
    window.location.assign("editeCategory.html?" + categoryId)
}

// ************************************ delete ************************************

function deleteCategory(e) {
    // get id of the category
    var categoyId = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML
    console.log(categoyId);

    // get all categories from local storge
    let categories = JSON.parse(localStorage.getItem("projectCategories"))
    console.log(categories);

    // delet from local storage
    let newCategories = categories.filter((element) => element.id != categoyId)
    console.log(newCategories);
    localStorage.setItem("projectCategories", JSON.stringify(newCategories))
    // delete from Html 
    e.target.parentNode.parentNode.remove()
}