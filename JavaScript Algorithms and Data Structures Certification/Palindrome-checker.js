function palindrome(str) {
    str = str.toLowerCase().replace(/\W|_|\s+/g, "");
    return str === str.split("").reverse().join("");
}



console.log(palindrome("_eye"));