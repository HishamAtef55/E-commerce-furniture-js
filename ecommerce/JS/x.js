var oldUSERS = JSON.parse(localStorage.getItem('projectAdmins')) || [];

window.onload = function () {

    var inputs = document.querySelectorAll('input');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("focus", function () { /// hide error msg when focus on any input
            document.querySelector('.error').innerText = "";
        })
    }

    let id = getCookie('adminID')
    let username = getCookie('adminUsername')

    for (const user of oldUSERS) {
        if (user.role == "admin") {
            if (id == user.id && username == user.username) {
                window.location.href = '/admin/html/products.html'
                break
            }

        }
    }

}


/*****************************  Submit user data ****************************************/

let submitData = () => {
    // var uname = document.querySelector('form#LoginForm input#uname').value;
    // var pass = document.querySelector('form#LoginForm input#password').value;

    let user = {
        username: userName.value,
        password: password.value
    }

    var validRes = validation(user);

    if (validRes) {
        setCookie("adminID", validRes, 10);
        setCookie("adminUsername", uname, 10);
        setCookie("adminRole", "admin", 10);
        window.location.href = '/admin/html/products.html';
    }

}


/*****************************  Validate user data ******************************************/
let validation = (user) => {
    var oldUSERS = JSON.parse(localStorage.getItem('projectAdmins')) || [];
     for (const localUser of oldUSERS) {
            if (localUser.username == user.username && decrypt(localUser.password) == user.password)
                return localUser.id;
        }

        userName.className = "form-control is-invalid"

    return false;
}




/************************** Add Admin  ***************************/
let addAdmin = () => {
    let cryptedPass = encrypt("admin1234");

    let user = {
        id: Math.floor(Math.random() * Date.now()),
        username: "admin",
        password: cryptedPass,
        phone: "01066588490",
        cart: [],
        wishlist: [],
        role: "admin"
    }

    var oldUSERS = JSON.parse(localStorage.getItem('projectAdmins')) || [];
    oldUSERS.push(user);
    localStorage.setItem('projectAdmins', JSON.stringify(oldUSERS));

}
/************************** Check If Admin exist or call function  ***************************/

let checkAdminInLocal = () => {
    var oldUSERS = JSON.parse(localStorage.getItem('projectAdmins')) || [];
    for (const localUser of oldUSERS) {
        if (localUser.role == "admin")
            return localUser.role;
    }
    addAdmin()
}

checkAdminInLocal()