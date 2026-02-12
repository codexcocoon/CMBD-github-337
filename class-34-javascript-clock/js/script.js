const time = document.getElementById("time");
const date = document.getElementById("date");
const week = document.getElementById("week");
// time.textContent = "10:44 PM"
const d = new Date();
/*
let hour = d.getHours();
let min = d.getMinutes();
let sec = d.getSeconds();
let ampm;
if (hour > 12) {
  hour = hour - 12;
  ampm = "PM";
} else if (hour === 12) {
  ampm = "PM";
} else if (hour === 0) {
  hour = 12;
  ampm = "AM";
} else {
  ampm = "AM";
}

// time.textContent = hour + " " + ampm;
// time.textContent = `${hour}:${min}:${sec} ${ampm}`;

time.textContent = d.toLocaleTimeString("en-US", { hour12: true });

// date

const month = d.getMonth();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
date.textContent = `${months[month]} ${d.getDate()}, ${d.getFullYear()}`;
const year = d.getYear();


date.textContent = d.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const weekday = days[d.getDay()]; // get current day
*/
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
days.forEach((w) => {
  const div = document.createElement("div");
  div.classList = "border rounded px-2 py-1 text-xs font-bold";
  div.textContent = w;
  week.appendChild(div);
});
const dates = [];

const showDateAndTime = () => {
  const d = new Date();
  time.textContent = d.toLocaleTimeString("en-US", { hour12: true });
  date.textContent = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
showDateAndTime();
setInterval(showDateAndTime, 1000);
// calendar
const weekDay = d.toLocaleString("en-US", { weekday: "short" }); //get current day

Array.from(week.children).forEach((w) => {
  if (w.textContent === weekDay) {
    w.classList.add("border-blue-500", "text-blue-500");
  } else {
    w.classList.remove("border-blue-500", "text-blue-500");
  }
});

year = d.getFullYear();
month = d.getMonth();
const firstDay = new Date(year, month, 1).getDay();

const numberOfDays = new Date(year, month + 1, 0).getDate();
let day = document.getElementById("day");

for (i = 0; i < firstDay; i++) {
  let span = document.createElement("span");
  span.classList = "border rounded px-2 py-1 text-xs font-bold";
  span.textContent = "";
  day.appendChild(span);
}

for (i = 1; i <= numberOfDays; i++) {
  dates.push(i);
}

dates.forEach((w) => {
  let span = document.createElement("span");
  span.classList = "border rounded px-2 py-1 text-xs font-bold";
  span.textContent = w;
  day.appendChild(span);
  // Highlight today
  if (w === d.getDate()) {
    span.classList.add("border-blue-500", "text-blue-500");
  }
  if ((i + firstDay) % 7 == 0) {
    let span = document.createElement("span");
    day.appendChild(span);
  }
});
