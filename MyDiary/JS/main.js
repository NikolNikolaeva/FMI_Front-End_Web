//--------------------------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAho6taHOsZVzSGkvmx6OlGf2GwvF1beLo",
  authDomain: "mydiary-b9fd4.firebaseapp.com",
  databaseURL: "https://mydiary-b9fd4-default-rtdb.firebaseio.com",
  projectId: "mydiary-b9fd4",
  storageBucket: "mydiary-b9fd4.appspot.com",
  messagingSenderId: "352339163882",
  appId: "1:352339163882:web:8c8b54f3280e345cc87593",
  measurementId: "G-9SXHMKGV52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//-----------------------------------------------

const settingsBtn = document.getElementById("settingsLogo");
var flag = true;
const setMenu = document.getElementsByClassName("setMenu")[0];
const welcome=document.getElementsByClassName("welcome")[0];

welcome.innerHTML=`${window.localStorage.user}, welcome to your personal diary calendar!`;

settingsBtn.addEventListener("click", () => {
  if (flag === true) {
    flag = false;
    setMenu.classList.add("visible");
  } else {
    flag = true;
    setMenu.classList.remove("visible");
  }
});

document.addEventListener("click", (e) => {
  if (flag === false && e.target !== settingsBtn) {
    setMenu.classList.remove("visible");
    flag = true;
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

const listMeets = document.querySelector(".listMeets");

if (listMeets.innerHTML === "") {
  listMeets.innerHTML = `<h3 id="noMeets">No requested meets</h3>`;
}

function addListener() {
  const meets = document.querySelectorAll(".meet");
  meets.forEach((meet) => {
    let bar=meet.getElementsByTagName("div")[0];
    bar.addEventListener("click", () => {
      let info = meet.getElementsByTagName("div")[3];
      info.classList.add("visible")
    
      document.addEventListener("click", (e) => {
        if (e.target !== bar) {
          info.classList.remove("visible");
        }
      });
    });
  });
}

addListener();
