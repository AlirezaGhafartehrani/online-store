// define variables

let mail, pass;

// define elements and selectors

const inputMail = document.getElementById("inputMail");
const inputPass = document.getElementById("inputPass");
const logInButton = document.getElementById("loginButton");

// eventListeners :
inputMail.addEventListener("change", function inputMailOnchange(e) {
  mail = e.target.value;
});

inputPass.addEventListener("change", function inputPassOnchange(e) {
  pass = e.target.value;
});

logInButton.addEventListener("click", function inputPassOnchange() {
  // post Email and pass to for authentication
  // here is a console log :
  // console.log("email: ", mail);
  // console.log("password: ", pass);
});
