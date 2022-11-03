var categoryName = document.getElementById("category")
checkAdmin()
function addCategoryToLocaleStorage(e) {
    
    try {
        e.preventDefault()
        // validation to Category
        if (!categoryName.value.match(/^[a-z A-Z]*$/) || categoryName.value == '') {
            throw 'invalid Category name'
        }

        // generating unique id by using random number with time stamp 
        var categoryId = Math.floor(Math.random() * Date.now())

        // get old categories if not exist we make new empty array 
        var existingCategories = JSON.parse(localStorage.getItem("projectCategories")) || []
        if (existingCategories.find(category => category.categoryName == categoryName.value)) {
            throw 'category name already exist'
        }
        var categoryObject = {
            id: categoryId,
            categoryName: categoryName.value
        }
        //push data to array and store it as string in  locale storage
        existingCategories.push(categoryObject)
        localStorage.setItem("projectCategories", JSON.stringify(existingCategories))
        errorDiv.innerText = ""
        window.location.assign("allCategories.html")
    } catch (error) {
        errorDiv.innerText = error
    }

}