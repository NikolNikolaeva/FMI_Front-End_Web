//--------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
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

var user = `${window.localStorage.user}`;
var currUser = user;
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const userEventsDataRef = ref(database, "Users/" + user + "/" + "Events/");
const newDataRef = push(userEventsDataRef);

//add event in calendar

function addEvent(day, month, year, eventTitle, timeFrom, timeTo, eventInfo) {
  set(
    ref(
      database,
      "Users/" + user + "/" + "Events/" + `${day} ${month} ${year} ${timeFrom}`
    ),
    {
      title: eventTitle,
      to: timeTo,
      info: eventInfo,
    }
  );
}

//read events
var arrayUserEventsInfo = new Array();
let eventsArr = new Array();

onValue(
  ref(database, "Users/" + user + "/" + "Events"),
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      arrayUserEventsInfo.push({
        day: childKey.split(" ")[0],
        month: childKey.split(" ")[1] - 1,
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

const currArray = [...arrayUserEventsInfo];

//comments
const containerComments = document.querySelector(".containerComments");

onValue(
  ref(database, "Users/" + user + "/Comments"),
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      containerComments.innerHTML += `<li>${childData.person}: ${childData.comment}</li>`;
    });
  },
  {
    onlyOnce: true,
  }
);
//friends list

const personFr = ref(database, "Users/" + user + "/" + "Friends");

const friendsCalendars = document.getElementById("frCalendar");

onValue(
  personFr,
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      //const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      friendsCalendars.innerHTML += `<option value="${childData.username}">${childData.username}</option>`;
    });
  },
  {
    onlyOnce: true,
  }
);

function addComment(comment, calendar) {
  set(
    push(ref(database, "Users/" + calendar + "/Comments"), {
      comment: comment,
      person: currUser,
    })
  );
}

//-----------------------------------------------

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

document.addEventListener("click", (e) => {
  if (flag === false && e.target !== settingsBtn) {
    setMenu.classList.remove("visible");
    flag = true;
  }
});

const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".data-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventsSubmit = document.querySelector(".add-event-btn");
const timeList = document.querySelector(".timeList");

let today = new Date();
let activeday;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");

  let goToMonth = false;
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      goToMonth = true;
    }
  }
  if (!goToMonth) {
    alert("Invalid date!");
  }
}

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    var event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    currArray.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeday = i;
      getActiveDay(i);
      updateEvents(i);

      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date ">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListener();
}

function updateEvents(date) {
  let events = "";
  let timeLineEvents = [];

  arrayUserEventsInfo.forEach((event) => {
    if (date == event.day && month == event.month && year == event.year) {
      events += `
          <div class="event">
             <div class="title">
               <i class="fas fa-circle"></i>
               <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="event-time">
                <span class="event-time">${event.from} - ${event.to}</span>
              </div>
          </div>
        `;

      timeLineEvents.push({
        from: event.from,
        li: `
            <li>
              <span></span>
              <div class="title">${event.title}</div>
              <div class="info">${event.info}</div>
              <div class="time">
                <span class="from">${event.from} </span>
                <span class="to">${event.to} </span>
              </div>
            </li>
      `,
      });
    }
  });

  eventsArr.forEach((event) => {
    if (date == event.day && month + 1 == event.month && year == event.year) {
      event.events.forEach((event) => {
        events += `
          <div class="event">
          <div class="title">
          <i class="fas fa-circle"></i>
          <h3 class="event-title">${event.title}</h3>
          </div>
          <div class="event-time">
          <span class="event-time">${event.time}</span>
          </div>
          </div>
          `;

        timeLineEvents.push({
          from: event.from,
          li: `
            <li>
                    <span></span>
                    <div class="title">${event.title}</div>
                    <div class="info">${event.info}</div>
                    <div class="time">
                      <span class="from">${
                        event.time.split(" ")[0] +
                        " " +
                        event.time.split(" ")[1]
                      } </span>
                      <span class="to">${
                        event.time.split(" ")[3] +
                        " " +
                        event.time.split(" ")[4]
                      } </span>
                    </div>
                  </li>
            `,
        });
      });
    }
  });

  if (events == "") {
    events = `
    <div class="no-event">
    <h3>No Events</h3>
    </div>
    `;
  }
  eventsContainer.innerHTML = events;

  timeLineEvents.sort((a, b) => {
    if (a.from > b.from) return -1;
    if (a.from > b.from) return 1;
    return 0;
  });

  timeList.innerHTML = "";
  timeLineEvents.forEach((el) => {
    timeList.innerHTML += el.li;
  });
}

initCalendar();
updateEvents(date);

const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventTo = document.querySelector(".event-time-to");
const addEventFrom = document.querySelector(".event-time-from");
const addEventInfo = document.querySelector(".event-time-info");

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

addEventTitle.addEventListener("input", () => {
  addEventTitle.value = addEventTitle.value.slice(0, 50);
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

function addListener() {
  const days = document.querySelectorAll(".day");

  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      activeday = Number(e.target.innerHTML);

      getActiveDay(e.target.innerHTML);
      updateEvents(activeday);

      days.forEach((day) => {
        day.classList.remove("active");
      });

      if (e.target.classList.contains("prev-date")) {
        prevMonth();
      }
      if (e.target.classList.contains("next-date")) {
        nextMonth();
      }
      setTimeout(() => {
        const daysInCalendar = document.querySelectorAll(".day");

        daysInCalendar.forEach((day) => {
          if (
            !day.classList.contains("prev-date") &&
            !day.classList.contains("next-date") &&
            day.innerHTML === e.target.innerHTML
          ) {
            day.classList.add("active");
          }
        });
      }, 100);
    });
  });
}

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

addEventsSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  const eventInfo = addEventInfo.value;

  if (
    eventTitle === "" ||
    eventTimeFrom === "" ||
    eventTimeTo === "" ||
    eventInfo === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");

  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid time format!");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
    info: eventInfo,
  };

  let eventAdded = false;

  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeday &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeday,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  addEventContainer.classList.remove("active");

  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  addEventInfo.value = "";

  const activeDayElement = document.querySelector(".day.active");
  if (!activeDayElement.classList.contains("event")) {
    activeDayElement.classList.add("event");
  }
  updateEvents(activeday);

  addEvent(activeday, month + 1, year, eventTitle, timeFrom, timeTo, eventInfo);
});

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

eventsContainer.addEventListener("click", () => {});

let selectFrCalendar = document.getElementById("frCalendar");

selectFrCalendar.addEventListener("change", () => {
  const value = selectFrCalendar.value;
  if (value !== "My Calendar") {
    user = value;
    addEventBtn.classList.remove("visible");
  } else {
    user = window.localStorage.user;
    addEventBtn.classList.add("visible");
  }
  arrayUserEventsInfo = new Array();
  eventsArr = new Array();

  onValue(
    ref(database, "Users/" + user + "/" + "Events"),
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        arrayUserEventsInfo.push({
          day: childKey.split(" ")[0],
          month: childKey.split(" ")[1] - 1,
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
  containerComments.innerHTML = "";

  onValue(
    ref(database, "Users/" + user + "/Comments"),
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        //const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        containerComments.innerHTML += `<li>${childData.person}:  ${childData.comment}</li>`;
      });
    },
    {
      onlyOnce: true,
    }
  );

  initCalendar();
});

const subTitleComments = document.querySelector(".subTitle");

//eventsContainer.addEventListener("click", () => {
//  eventsContainer.childNodes.forEach((event) => {
///    event.addEventListener("click", () => {
//      subTitleComments.innerHTML = event.querySelector(".title").
//     querySelector(".event-title").innerHTML;
// });
// });
//});

const addCommentBtn = document.querySelector(".add-comment-btn");
const comment = document.querySelector(".comment");

addCommentBtn.addEventListener("click", () => {
  let commentText=comment.value;
  if (comment.value === "") {
    alert("Write comment!");
    return;
  }
  let value = selectFrCalendar.value;
  if (value == "My Calendar") {
    value = window.localStorage.user;
  }
  containerComments.innerHTML += `<li>${currUser}:  ${comment.value}</li>`;
  comment.value = "";
  addComment(commentText, value);
});
