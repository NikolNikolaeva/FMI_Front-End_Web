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

let eventsArr = [];

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
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
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

initCalendar();

function prevMonth() {
  month--;
  if (month < 0) {
    month += 11;
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

  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid date!");
}

const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");

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

function updateEvents(date) {
  let events = "";

  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
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
      });
    }
  });

  if (events === "") {
    events = `
    <div class="no-event">
    <h3>No Events</h3>
    </div>
    `;
  }

  eventsContainer.innerHTML = events;
}

addEventsSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
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

  updateEvents(activeday);
  const activeDayElement = document.querySelector(".day.active");
  if (!activeDayElement.classList.contains("event")) {
    activeDayElement.classList.add("event");
  }
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

eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;

    eventsArr.forEach((event) => {
      if (
        event.day === activeday &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item,index)=>{
          if(item.title===eventTitle){
            event.events.splice(index,1);
          }
        });

        if(event.events.length===0){
          eventsArr.splice(eventsArr.indexOf(event),1);

          const activeDayElem=document.querySelector(".day.active");
          if(activeDayElem.classList.contains("event")){
            activeDayElem.classList.remove("event");
          }
        }

      }
    });

    updateEvents(activeday);
  }
});
