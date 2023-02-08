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

function chooseDate() {
  const dateArr = dateInput.value.split("/");
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let date = false;
  if (dateArr.length === 2) {
    if (
      dateArr[1] > 0 &&
      dateArr[1] < 13 &&
      dateArr[2].length === 4 &&
      dateArr[0] < 1 &&
      dateArr[0] > monthLength[dateArr[1] - 1]
    ) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      date = true;
    }
  }
  if (!date) {
    alert("Invalid date!");
  }
}

function addListener() {
  let friendsList = document.querySelector(".friendsList");
  let choosenFriend = document.querySelector(".choosenFr");

  friendsList.childNodes.forEach((fr) => {
    fr.addEventListener("click", () => {
      choosenFriend.innerHTML = `Invite ${fr.innerHTML.split(" ")[1]} to`;
    });
  });
}

addListener();
