//initialize data
let data = { food: 0, wood: 0, timer: 0 };

function initialize() {
  if (window.localStorage.getItem("timer") > 0) {
    loadData(data);
  } else {
    reset();
  }
  updateScoreboard(data);
}

initialize();

function saveData(data) {
  window.localStorage.setItem("food", data.food);
  window.localStorage.setItem("wood", data.wood);
  window.localStorage.setItem("timer", data.timer);
}

function loadData(data) {
  data.food = window.localStorage.getItem("food");
  data.timer = window.localStorage.getItem("timer");
  data.wood = window.localStorage.getItem("wood");
  updateScoreboard(data);
}

function addFood(data) {
  data.food++;
  saveData(data);
  updateScoreboard(data);
}

function addWood(data) {
  data.wood++;
  saveData(data);
  updateScoreboard(data);
}

function reset() {
  window.localStorage.clear();
  window.localStorage.setItem("food", 0);
  window.localStorage.setItem("timer", 0);
  window.localStorage.setItem("wood", 0);
  loadData(data);
  updateScoreboard(data);
}

function updateScoreboard(data) {
  document.getElementById("food").innerText = data.food + " food";
  document.getElementById("wood").innerText = data.wood + " wood";
  document.getElementById("timer").innerText = data.timer + " timer";
}

function tick() {
  data.timer++;
  data.food++;
  data.wood++;
  saveData(data);
  updateScoreboard(data);
  // console.log(localStorage);
}

setInterval(tick, 1000);
