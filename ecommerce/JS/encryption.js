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



