//initialize data
let data = {};

function initialize() {
  if (window.localStorage.getItem("score") > 4000) {
    loadData(data);
  } else {
    reset();
  }
  updateScoreboard(data);
}

initialize();

function saveData(data) {
  window.localStorage.setItem("score", data.score);
}

function loadData(data) {
  data.score = window.localStorage.getItem("score");
  updateScoreboard(data);
}

function add(data) {
  data.score++;
  saveData(data);
  updateScoreboard(data);
}

function reset() {
  window.localStorage.clear();
  window.localStorage.setItem("score", 4000);
  data.score = window.localStorage.getItem("score");
  updateScoreboard(data);
}

function updateScoreboard(data) {
  document.getElementById("scoreboard").innerText = data.score;
}

function tick() {
  data.score++;
  saveData(data);
  updateScoreboard(data);
}

setInterval(tick, 1000);
