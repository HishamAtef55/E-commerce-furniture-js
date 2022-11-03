const elementRegex = {
    userName: /^[a-zA-Z]{3,}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    phone: /01[0125][0-9]{8}$/,
};

window.onload = function () {

    checkLoggedin()

    const elements = document.querySelectorAll("input")
    elements.forEach(element => {
        element.oninput = (e) => {
            if (e.target.value.match(elementRegex[element.id])) {
                element.className = "form-control is-valid"
            } else {
                element.className = "form-control is-invalid"
            }
        }
    }
    )
};

/*****************************  Submit user data ****************************************/

let submitData = () => {
    var validRes = validation(userName.value, password.value, phone.value);
    if (validRes) {
        let id = addUser(userName.value, password.value, phone.value);
        setCookie("id", id, 10);
        setCookie("username", userName.value, 10);
        setCookie("role", "user", 10);
        window.location.href = 'index.html';
    }
};

/*****************************  Validate user data ******************************************/
let validation = (username, check_password, check_phone) => {
    // console.log(username, password, phone)
    var oldUSERS = JSON.parse(localStorage.getItem("projectUsers")) || [];
    /// validate name
    if (!username.match(elementRegex["userName"])) {
        userName.className = "form-control is-invalid";
    }
    // validate username duplication
    else if (oldUSERS.some((user) => user.username == username)) // true
        userNameFeedback2.className = "invalid-feedback display-block"
    // validate password
    else if (!check_password.match(elementRegex["password"])) {
        password.className = "form-control is-invalid";
    }
    // validate phone
    else if (!check_phone.match(elementRegex["phone"])) {
        phone.className = "form-control is-invalid";
    }
    else {
        userName.className = "form-control is-valid";
        password.className = "form-control is-valid";
        phone.className = "form-control is-valid";
        return true;
    }
};


/***************************************  Add user in local storage **************************************/
let addUser = (username, pass, phone) => {
    let cryptedPass = encrypt(pass); //encrypt
    let cart, wishlist;
    let guests = JSON.parse(localStorage.getItem("projectGuests")) || [];
    console.log(guests);
    let id = getCookie("id");
    console.log(id);
    for (const guest of guests) {
        if (guest.id == id) {
            cart = guest.cart;
            wishlist = guest.wishlist;
            console.log("cart =" + cart);
            break;
        }
    }

    if (!cart || cart == undefined || cart == null) cart = [];

    if (!wishlist || wishlist == undefined || wishlist == null) wishlist = [];

    console.log("cart2 =" + cart);
    let newID = Math.floor(Math.random() * Date.now());
    let user = {
        id: newID,
        username: username,
        password: cryptedPass,
        phone: phone,
        cart: cart,
        wishlist: wishlist,
        role: "user",
    };

    var oldUSERS = JSON.parse(localStorage.getItem("projectUsers")) || [];
    oldUSERS.push(user);
    localStorage.setItem("projectUsers", JSON.stringify(oldUSERS));
    return newID;
};
