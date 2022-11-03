checkAdmin()


/**************************** Display all users ******************************** */
var i = 1

function getDataFromLocalStorage() {
    var allUsers = JSON.parse(localStorage.getItem("projectUsers"))
    allUsers.forEach(ele => createRow(ele))
}

function createRow(user) {
    var newRow = document.createElement("tr")
    var cell1 = document.createElement("td")
    var cell2 = document.createElement("td")
    var cell3 = document.createElement("td")
    var cell4 = document.createElement("td")

    cell1.innerHTML = i++
    cell2.innerHTML = user.username
    cell3.innerHTML = user.phone
    cell4.innerHTML = '<a href="tel:+2' + user.phone + '"><i class="fa-sharp fa-solid fa-phone"></i></a>'
    newRow.append(cell1, cell2, cell3, cell4)
    usersTable.append(newRow)
};
getDataFromLocalStorage()

