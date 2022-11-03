


window.onload = function () {
    checkLoggedin()

    var inputs = document.querySelectorAll('input');

    /*  for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("focus", function () { /// hide error msg when focus on any input
              document.querySelector('.invalid-feedback').innerText = "";
          })
      }*/

    if (getCookie("username") != "guest" && getCookie("username"))
        window.location.href = "index.html"
}


/*****************************  Submit user data ****************************************/

let submitData = () => {
    /* var uname = document.querySelector('form#login input#uname').value;
     var pass = document.querySelector('form#login input#password').value;
     let oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];
 
     let user = {
         username: uname,
         password: pass
     }
 
     var validRes = validation(user);
     if (validRes) {
         let user = oldUSERS.filter(user => user.username == uname)
         let id = user.length > 0 ? user[0].id : 0
         setCookie("id", id, 10);
         setCookie("username", uname, 10);
         setCookie("role", 0, 10);
         window.location.href = 'index.html';
 
     }*/

    // var uname = document.querySelector('form#login input#uname').value;
    // var pass = document.querySelector('form#login input#password').value;
    let oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    let user = {
        username: userName.value,
        password: password.value
    }

    var validRes = validation(user);
    if (validRes) {
        let user = oldUSERS.filter(user => user.username == userName.value)
        let id = user.length > 0 ? user[0].id : 0
        setCookie("id", id, 10);
        setCookie("username", userName.value, 10);
        setCookie("role", 0, 10);
        window.location.href = 'index.html';

    }


}


/*****************************  Validate user data ******************************************/
let validation = (user) => {
    if (!((/^[a-zA-Z]*$/).test(user.username)) || user.username.length == 0)
        userName.className = "form-control is-invalid"
    else {
        //// validate name is not in storage
        let check = checkUsername(user);
        if (check == -1)
            password.className = "form-control is-invalid"

        else if (check == 0)
            userName.className = "form-control is-invalid"

        else
            return true;

    }

}


/*********************************** Check if local storage has same username ******************************/
let checkUsername = (user) => {
    let oldUSERS = JSON.parse(localStorage.getItem('projectUsers')) || [];

    for (const localUser of oldUSERS) {
        if (localUser.username == user.username && decrypt(localUser.password) == user.password)
            return 1;

        else if (localUser.username == user.username && decrypt(localUser.password) != user.password)
            return -1;

    }
    return 0;
}



