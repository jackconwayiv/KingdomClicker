//initialize data
const iData = {
  timer: 0,
  level: 1,
  gold: 0,
  goldPer: 0,
  food: 0,
  foodPer: 0,
  wood: 0,
  woodPer: 0,
  stone: 0,
  stonePer: 0,
  metal: 0,
  metalPer: 0,
};

function convertToJson(data) {
  return JSON.stringify(data);
}

function convertFromJson(data) {
  return JSON.parse(data);
}

function initialize() {
  let data = JSON.parse(window.localStorage.getItem("data")) || iData;
  if (data.timer > 0) {
    loadData(data);
  } else {
    reset();
  }
  updateScoreboard(data);
}

initialize();

function saveData() {
  let jData = convertToJson(data);
  window.localStorage.setItem("data", jData);
}

function loadData() {
  data = JSON.parse(window.localStorage.getItem("data"));
  updateScoreboard(data);
}

function addFood() {
  data.food++;
  saveData(data);
  updateScoreboard(data);
}

function addWood() {
  data.wood++;
  saveData(data);
  updateScoreboard(data);
}

function addMetal() {
  data.metal++;
  saveData(data);
  updateScoreboard(data);
}

function addStone(data) {
  data.stone++;
  saveData(data);
  updateScoreboard(data);
}

function reset() {
  window.localStorage.clear();
  let jData = JSON.stringify(iData);
  window.localStorage.setItem("data", jData);
  loadData();
  updateScoreboard();
}

function updateScoreboard(data) {
  document.getElementById("timer").innerText = "🕰️ " + data.timer;
  document.getElementById("gold").innerText = "💰 " + data.gold;
  document.getElementById("food").innerText = "🌾 " + data.food;
  document.getElementById("wood").innerText = "🪵 " + data.wood;
  document.getElementById("stone").innerText = "🧱 " + data.stone;
  document.getElementById("metal").innerText = "🔩 " + data.metal;
}

function tick() {
  data.timer++;
  saveData(data);
  updateScoreboard(data);
  // console.log(localStorage);
}

setInterval(tick, 1000);
