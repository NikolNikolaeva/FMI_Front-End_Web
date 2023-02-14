//--------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
var user = window.localStorage.user;
const personPendingEvents = ref(database, "Users/" + user + "/PendingEvents/");
let arrayUsersPendingEvents = [];

onValue(
  personPendingEvents,
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      arrayUsersPendingEvents.push({
        title: childKey,
        from: childData.from,
        to: childData.to,
        day: childData.day,
        month: childData.month,
        year: childData.year,
        info: childData.info,
        fromPerson: childData.fromPerson,
      });
    });
    pendingMeetingsBar();
  },
  {
    onlyOnce: true,
  }
);

//add event
function addEvent(currevent) {
  set(
    ref(
      database,
      "Users/" +
        user +
        "/Events/" +
        `${currevent.day} ${currevent.month} ${currevent.year} ${currevent.from}/`
    ),
    {
      title: currevent.title,
      to: currevent.to,
      info: currevent.info,
    }
  );
}

//remove pending event

function removeEvent(name) {
  remove(ref(database, "Users/" + user + "/PendingEvents/" + name));
}

//-----------------------------------------------

const settingsBtn = document.getElementById("settingsLogo");
var flag = true;
const setMenu = document.getElementsByClassName("setMenu")[0];
const welcome = document.getElementsByClassName("welcome")[0];

welcome.innerHTML = `${window.localStorage.user}, welcome to your personal diary calendar!`;

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

listMeets.addEventListener("click", (event) => {
  //listMeets.forEach((meet) => {
  const meet = event.target.parentElement;

  let accept = meet.children[1];
  let decline = meet.children[2];
  let name = meet.children[0];

  const currevent = [];
  arrayUsersPendingEvents.forEach((event) => {
    if (
      event.title ==
      name.innerText.split(" ")[0] + " " + name.innerText.split(" ")[1]
    ) {
      currevent.push(event);
    }
  });

  if (accept) {
    listMeets.removeChild(meet);
    //pendingMeetingsBar();
    addEvent(currevent[0]);
    removeEvent(currevent[0].title);
  }

  if (decline) {
    decline.addEventListener("click", () => {
      removeEvent(currevent[0].title);
    });
  }
  //});
  pendingMeetingsBar();
});

function pendingMeetingsBar() {
  let events = "";
  arrayUsersPendingEvents.forEach((element) => {
    events += `
    <li class="meet">
      <div class="name">${element.title} ${element.day}/${element.month}/${element.year}</div>
        <button class="buttonList" id="accept">Accept</button>
        <button class="buttonList" id="decline">Decline</button>
    </div>
    <div class="info ">
    <div>${element.fromPerson}</div>
    <div>${element.day}/${element.month}/${element.year}</div>
    <div>${element.from} - ${element.to}</div>
    <div>${element.info}</div>
  </li>`;
  });
  if (events === "") {
    listMeets.innerHTML = `<h3 id="noMeets">No requested meets</h3>`;
    return;
  }

  listMeets.innerHTML = events;
}

pendingMeetingsBar();
