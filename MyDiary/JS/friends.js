//--------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
  query,
  orderByChild,
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
var user = `${window.localStorage.user}`;
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const usersRef = ref(database, "Users");

const personFr = ref(database, "Users/" + user + "/" + "Friends/");
const newDataRef = push(personFr);

function addFriendsInfo(name, email) {
  set(newDataRef, {
    username: name,
    email: email,
  });
}

function addPendingEvent(fr, event) {
  set(
  ref(database, "Users/" + fr + "/" + "PendingEvents/" + event.title),
    {
      from: event.from,
      to: event.to,
      day: event.day,
      month: event.month,
      year: event.year,
      info: event.info,
      fromPerson: user,
    }
  );
}

//-----------------------------------------------

var arrayUsers = [];

onValue(
  usersRef,
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      arrayUsers.push({
        username: childKey,
        email: childData.email,
      });
    });
  },
  {
    onlyOnce: true,
  }
);

var arrayUsersFriends = [];

onValue(
  personFr,
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      //const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      arrayUsersFriends.push({
        username: childData.username,
        email: childData.email,
      });
      friendsList.innerHTML += `<li class="friend">👤 ${childData.username}</li> `;
    });
  },
  {
    onlyOnce: true,
  }
);

//read events
var arrayUserEventsInfo = new Array();

onValue(
  ref(database, "Users/" + user + "/" + "Events"),
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      arrayUserEventsInfo.push({
        day: childKey.split(" ")[0],
        month: childKey.split(" ")[1],
        year: childKey.split(" ")[2],
        title: childData.title,
        from: childKey.split(" ")[3] + " " + childKey.split(" ")[4],
        to: childData.to,
        info: childData.info,
      });
    });
  },
  {
    onlyOnce: true,
  }
);

const friendsList = document.querySelector(".friendsList");
const settingsBtn = document.getElementById("settingsLogo");
var flag = true;
const setMenu = document.getElementsByClassName("setMenu")[0];
const welcome = document.getElementsByClassName("welcome")[0];

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

const addEventBtn = document.querySelector(".addFriendPlus");
const addEventContainer = document.querySelector(".add-friend-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTo = document.querySelector(".event-time-to");
const addEventFrom = document.querySelector(".event-time-from");
const dateInput = document.querySelector(".data-input");

addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
});

addEventFrom.addEventListener("input", () => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", () => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length === 5) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 10) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
});

const choosenFriend = document.querySelector(".choosenFr");

friendsList.addEventListener("click", () => {
  friendsList.childNodes.forEach((fr) => {
    fr.addEventListener("click", () => {
      choosenFriend.innerHTML = `Invite ${fr.innerHTML.split(" ")[1]} to`;
    });
  });
});

const addFriend = document.querySelector(".friend-name");
const addFrBtn = document.querySelector(".add-friend-btn");

addFrBtn.addEventListener("click", () => {
  if (addFriend.value === "") {
    alert("Find friend by username or email!");
    return;
  }
  let friends = false;
  if (addFriend.value === window.localStorage.user) {
    alert("Cannot add yourself!");
    friends = true;
  }
  arrayUsersFriends.forEach((el) => {
    if (el.username === addFriend.value || el.email == addFriend.value) {
      alert(`${el.username} is already your friend!`);
      friends = true;
      return;
    }
  });
  if (!friends) {
    let found = false;
    arrayUsers.forEach((el) => {
      if (el.username === addFriend.value || el.email == addFriend.value) {
        friendsList.innerHTML += `<li class="friend">👤 ${el.username}</li> `;
        found = true;
        alert("Succesfully added friend!\nNow you can see their calendars!");
        addFriendsInfo(el.username, el.email);
        return;
      }
    });
    if (!found) {
      alert("Cannot find this user! Wrong username/email or does not exist!");
    }
  }
  addFriend.value = "";
});

const friendName = document.querySelector(".choosenFr");
const sentEventBtn = document.querySelector(".add-event-btn");
const eventFrom = document.querySelector(".event-time-from");
const eventTo = document.querySelector(".event-time-to");
const dataInput = document.querySelector(".data-input");

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

sentEventBtn.addEventListener("click", (e) => {
  let data = dataInput.value.split("/");
  if (
    eventFrom.value === "" ||
    eventTo.value === "" ||
    dataInput.value === ""
  ) {
    alert("Fill all fields!");
    return;
  } else if (friendName.innerHTML === "Choose friend from the list") {
    alert("Choose friend!");
    return;
  }
  arrayUserEventsInfo.forEach((event) => {
    let timeFrom = convertTime(eventFrom.value);
    let timeTo = convertTime(eventTo.value);
    if (
      event.from === timeFrom &&
      event.to === timeTo &&
      Number(data[0]) == event.day &&
      Number(data[1]) == event.month &&
      Number(data[2]) == event.year
    ) {
      alert("Sent successfully!");
      addPendingEvent(friendName.innerHTML.split(" ")[1], event);
      dataInput.value = "";
      eventFrom.value = "";
      eventTo.value = "";
      return;
    }
  });
});
