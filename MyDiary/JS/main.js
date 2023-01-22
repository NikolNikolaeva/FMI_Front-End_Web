const settingsBtn = document.getElementById("settingsLogo");
var flag = true;
const setMenu = document.getElementsByClassName("setMenu")[0];

settingsBtn.addEventListener("click", () => {
  if (flag === true) {
    flag = false;
    setMenu.classList.add("visible");
  } else {
    flag = true;
    setMenu.classList.remove("visible");
  }
});

let time = document.querySelector("h1");
let date = document.querySelector("h2");

setInterval(() => {
  let curr = new Date();
  time.innerHTML = curr.toLocaleTimeString();
}, 1000);

setInterval(() => {
  let curr = new Date();
  date.innerHTML = curr.toLocaleDateString();
}, 1000);

document.addEventListener("click", (e) => {
  if (flag === false && e.target!==settingsBtn) {
    setMenu.classList.remove("visible");
    flag = true;
  }
});
