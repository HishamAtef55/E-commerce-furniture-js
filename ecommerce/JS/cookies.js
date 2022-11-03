

/*********************************** Set cookies ******************************/
let setCookie = (cookieName, cookieValue, expiryDate) => {
    const d = new Date();
    d.setTime(d.getTime() + (expiryDate * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

/*********************************** get cookies ******************************/

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

