
/*********************************** ADD USER TO LOCAL STORAGE ******************************************/
let addUser = (username, pass, phone) => {
    let cryptedPass = encrypt(pass); //encrypt

    let user = {
        id: Math.floor(Math.random() * Date.now()),
        username,
        password: cryptedPass,
        phone,
        cart: [],
        wishlist: []
    }

    var oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];
    oldUSERS.push(user);
    localStorage.setItem('projectUsers', JSON.stringify(oldUSERS));
    return lastID;
}

