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

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
    tablinks[i].style.color = "gray";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
  elmnt.style.color = "black";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
