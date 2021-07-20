// define variables:

let name, familyName, pass, address, mail;

// define elements:

const inputName = document.getElementById("inputName");
const inputFamilyName = document.getElementById("inputFamilyName");
const inputPass = document.getElementById("inputPass");
const inputAddress = document.getElementById("inputAddress");
const inputMail = document.getElementById("inputMail");
const signupBtn = document.getElementById("signupBtn");

// eventListeners :

inputName.addEventListener("change", function fnc(e) {
  name = e.target.value;
});

inputFamilyName.addEventListener("change", function fnc(e) {
  familyName = e.target.value;
});

inputPass.addEventListener("change", function fnc(e) {
  pass = e.target.value;
});

inputMail.addEventListener("change", function fnc(e) {
  mail = e.target.value;
});

inputAddress.addEventListener("change", function fnc(e) {
  address = e.target.value;
});

signupBtn.addEventListener("click", function fnc() {
  // post name, familyName, pass, address mail to for sign up
  // here is a console log :
  // console.log("name: ", name);
  // console.log("familyName: ", familyName);
  // console.log("pass: ", pass);
  // console.log("address: ", address);
  // console.log("mail: ", mail);
});
