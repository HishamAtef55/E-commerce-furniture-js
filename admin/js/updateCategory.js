checkAdmin()


// get query string 
var queryString = window.location.search
console.log(queryString);
var categoryId = parseInt(queryString.replace("?", ""))
console.log(categoryId);

//get all categories from locale storage
var allCategories = JSON.parse(localStorage.getItem("projectCategories"))

var oldObjectCategory = allCategories.find(element => element.id == categoryId)
// console.log(oldName);
category.value = oldObjectCategory.categoryName

function updateCategory(e) {
    try {
        e.preventDefault()
        //filter method return new arry without thise category
        let newCategories = allCategories.filter((element) => element.id != categoryId)

        //check if name is exist or not
        if (newCategories.find(element => category.value == element.categoryName)) {
            throw 'category name already exist'
        }
        if (!category.value.match(/^[a-z A-Z]*$/) || category.value == '') {
            throw 'invalid Category name'
        }

        // map method return new array we make check by id and re assign the value of category name
        var newUpdatedCategories = allCategories.map((element) => {
            if (element.id == categoryId) {
                return { ...element, categoryName: category.value }
            } else {
                return element
            }
        })

        localStorage.setItem("projectCategories", JSON.stringify(newUpdatedCategories))
        errorDiv.innerText =""
        errorDiv.classList.add("d-none")
        window.location.assign("allCategories.html")
    } catch (error) {
        errorDiv.innerText = error
        errorDiv.classList.remove("d-none") 
    }
}