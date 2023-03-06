//initialize data
const initialData = {
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
  market: false,
  quarry: false,
  mines: false,
  camp: false,
  farm: true,
};

function convertToJson(data) {
  return JSON.stringify(data);
}

function convertFromJson(data) {
  return JSON.parse(data);
}

function initialize() {
  let data = JSON.parse(window.localStorage.getItem("data")) || initialData;
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
  updateScoreboard();
}

function addFood() {
  data.food++;
  saveData();
  updateScoreboard();
}

function addWood() {
  data.wood++;
  saveData();
  updateScoreboard();
}

function addMetal() {
  data.metal++;
  saveData();
  updateScoreboard();
}

function addStone() {
  data.stone++;
  saveData();
  updateScoreboard();
}

function reset() {
  window.localStorage.clear();
  let jData = JSON.stringify(initialData);
  window.localStorage.setItem("data", jData);
  loadData();
  updateScoreboard();
}

//line 86 is throwing an error that doesn't affect functionality
function updateScoreboard() {
  document.querySelector(".townHall").innerText =
    "TOWN HALL\n\n🕰️ " + data.timer + "\n\nRESET GAME";
  if (data.market)
    document.getElementById("gold").innerText = "💰 " + data.gold;
  if (data.farm) document.getElementById("food").innerText = "🌾 " + data.food;
  if (data.camp) document.getElementById("wood").innerText = "🪵 " + data.wood;
  if (data.quarry)
    document.getElementById("stone").innerText = "🧱 " + data.stone;
  if (data.mines)
    document.getElementById("metal").innerText = "🔩 " + data.metal;
}

function tick() {
  data.timer++;
  data.gold += data.goldPer;
  data.food += data.foodPer;
  data.wood += data.woodPer;
  data.stone += data.stonePer;
  data.metal += data.metalPer;
  saveData(data);
  updateScoreboard(data);
  // console.log(localStorage);
}

setInterval(tick, 1000);
