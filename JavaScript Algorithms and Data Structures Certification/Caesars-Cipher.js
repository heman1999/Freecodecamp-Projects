function rot13(str) {
  let arr = str.toUpperCase().split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= "A" && arr[i] <= "Z") {
      let rotate = str.charCodeAt(i) + 13;
      rotate = rotate > 90 ? (rotate % 91) + 65 : rotate;
      arr[i] = String.fromCharCode(rotate);
    }
  }
  str = arr.join("");

  return str;
}

rot13("SERR-PBQR PNZC");
