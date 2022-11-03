
var oldUSERS = JSON.parse(localStorage.getItem('projectAdmins')) || [];

let checkAdmin = () => {
    let id = getCookie('adminID')
    let username = getCookie('adminUsername')

    for (const user of oldUSERS) {
        if (user.role == "admin") {
            if (id == user.id && username == user.username) {
                return true;
            }

        }
    }

    window.location.href = './adminLogin.html';
    return false

}

function getCookie(cookieName) {
    var cookies = document.cookie;
    var cookie = cookies.split("; ");

    for (var i = 0; i < cookie.length; i++) {

        if (cookie[i].startsWith(cookieName)) {
            var val = cookie[i].split("=");
            return val[1];
        }
    }

    return false;
}



let logout = () => {
    let cookieName = ["adminUsername", "adminID", "adminRole"]
    for (var x = 0; x < cookieName.length; x++)
        document.cookie = cookieName[x] + "=; expires=Mo, 15 Aug 2022 00:00:00 UTC; path=/;";

    // checkLoggedin()
    window.location.assign("adminLogin.html")
}




/********************* Encryption & Decryption ***************/

/*********************************** Crypt password ***************************************** */
let decrypt = (password) => {
    var decipher = CryptoJS.AES.decrypt(password, "CIPHERKEY");
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
}

/*********************************** Crypt password ***************************************** */
let encrypt = (password) => {

    var cipher = CryptoJS.AES.encrypt(password, "CIPHERKEY");
    cipher = cipher.toString();
    return cipher;

}

const elementRegex = {
    category    :/^[a-z A-Z]*$/,
    productPric :/^[0-9]*$/,
    productNam  :/^[a-z A-Z]*$/
}
var errorDiv = document.getElementById('errorDiv')
const elements = document.querySelectorAll("input")

elements.forEach(element=>{
    element.oninput = (e)=>{
        if(e.target.value.match(elementRegex[element.id])){
            element.className = "form-control is-valid"
        }else{
            element.className = "form-control is-invalid"
        }
    }
}
)


