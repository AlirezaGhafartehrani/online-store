// define variables:

let name, familyName, pass, address;

// define elements:

const inputName = document.getElementById("inputName");
const inputFamilyName = document.getElementById("inputFamilyName");
const inputPass = document.getElementById("inputPass");
const inputAddress = document.getElementById("inputAddress");
const editBtn = document.getElementById("editBtn");

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

inputAddress.addEventListener("change", function fnc(e) {
  address = e.target.value;
});

editBtn.addEventListener("click", function fnc() {
  // post name, familyName, pass, address to for edit
  // here is a console log :
  // console.log("name: ", name);
  // console.log("familyName: ", familyName);
  // console.log("pass: ", pass);
  // console.log("address: ", address);
});
