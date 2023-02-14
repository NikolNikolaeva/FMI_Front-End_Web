const form1 = document.getElementsByTagName("form")[0];
const form2 = document.getElementsByTagName("form")[1];

form1.addEventListener("submit", (event) => {
  event.preventDefault();
});

form2.addEventListener("submit", (event) => {
  event.preventDefault();
});

//--------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//const newDataRef = push(dataRef);


//save user in database

function saveUser(username,email,password){
  set(ref(database, 'Users/' + username),{
  email:email,
  password:password,
  });
}


//read data users
var arrayDataUsers = new Array();

onValue(
  ref(database, 'Users'),
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      arrayDataUsers.push(
        new Object({
          username: childKey,
          email: childData.email,
          password: childData.password,
        })
      );
    });
  },
  {
    onlyOnce: true,
  }
);

console.log(arrayDataUsers);

//-----------------------------------------------


const signInBtn = document.getElementsByClassName("button")[0];
const wrapperForm = document.querySelector("section");
var flag = true;

signInBtn.addEventListener("click", () => {
  if (flag === true) {
    signInBtn.textContent = "Sign up";
    flag = false;
    wrapperForm.classList.toggle("active");
  } else {
    signInBtn.textContent = "Log in";
    flag = true;
    wrapperForm.classList.toggle("active");
  }
});

//Log in

const username = document.getElementById("usernameLog");
const passwordLog = document.getElementById("passLog");
const buttonLogIn = document.getElementsByClassName("button")[2];

buttonLogIn.addEventListener("click", () => {
  let logIn = false;
  if (username.value === "" || passwordLog.value === "") {
    alert("Invalid username or password!");
    return;
  }

  arrayDataUsers.forEach((user) => {
    if (user.username === username.value && user.password === passwordLog.value) {
      logIn = true;
      window.localStorage.setItem("user", username.value);
      window.location.href="/HTML/main.html";
    }
  });

  if (!logIn){
    alert("Invalid username or password!");
  }
});


//Registration

const name = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const passConfirm = document.getElementById("passComf");
const buttonRegister = document.getElementsByClassName("button")[1];

buttonRegister.addEventListener("click", () => {
  if (password.value === passConfirm.value) {
    let available = true;
    if (name.value === "" || password.value === "" || email.value === "") {
      return;
    }
    arrayDataUsers.forEach((user) => {
      if (user.username === name.value) {
        available = false;
        alert("Unavailable username!");
        return;
      }
    });

    if (available) {
      //addUserData(name.value, email.value, password.value);
      saveUser(name.value, email.value, password.value);
      alert("Successfully registered!");
      arrayDataUsers.push(
        new Object({
          username: name.value,
          email: email.value,
          password:password.value,
        }));
      name.value="";
      email.value="";
      password.value="";
      passConfirm.value="";
    }
  } else {
    alert("Repeat your password!");
  }
});
