const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const show = document.querySelector("#show");
let num = 0;
let h = 0;
let m = 0;
let s = 0;
const setTime = () => {
  if (num === 10) {
    num = 0;
    s++;
  }
  if (s === 60) {
    s = 0;
    m++;
  }
  if (m === 60) {
    m = 0;
    h++;
  }
};
const showTime = () => {
  show.textContent =
    String(h).padStart(2, 0) +
    ":" +
    String(m).padStart(2, 0) +
    ":" +
    String(s).padStart(2, 0) +
    ":" +
    String(num).padStart(2, 0);
};
showTime();
let timing;
let timeout = 100;
start.addEventListener("click", (e) => {
  if (e.target.textContent === "Start") {
    e.target.textContent = "Pause";
    timing = setInterval(() => {
      //   show.textContent = ++num;
      ++num;
      setTime();
      showTime();
    }, timeout);
  } else {
    e.target.textContent = "Start";
    clearInterval(timing);
  }
});
reset.addEventListener("click", (e) => {
  clearInterval(timing);
  num = 0;
  //   show.textContent = num;
  //   start.textContent = "Start";
  h = 0;
  m = 0;
  s = 0;
  showTime();
  start.textContent = "Start";
});
