//initialize data
const initialData = {
  timer: 0,
  level: 0,
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
  market: true,
  quarry: true,
  mines: true,
  camp: true,
};

function convertToJson(data) {
  return JSON.stringify(data);
}

function convertFromJson(data) {
  return JSON.parse(data);
}

function initialize() {
  let data = JSON.parse(window.localStorage.getItem("data")) || initialData;
  renderTownHall();
  renderFarm();
  renderCamp();
  renderQuarry();
  renderMines();
  renderMarket();
  if (data.timer > 0) {
    loadData(data);
  } else {
    reset();
  }

  updateScoreboard(data);
}

function renderTownHall() {
  let townHall = document.getElementById("townHallPlot");
  const html = `<div id="townHall"><div class="buildingName">TOWN HALL</div><div id="townTalk" class="smallerFont">🏰 Grow the realm!</div><div id="clock"></div><div id="resetButtonField"><button id="resetButton" onclick="reset()">Reset Kingdom</button></div></div>`;
  townHall.innerHTML = html;
}

function renderFarm() {
  let farm = document.getElementById("farmPlot");
  const html = `<div id="farm"><div class="buildingName">FARM</div><div id="foodPer" class="smallerFont"></div><div id="food"></div><div id="foodButtonField"><button id="foodButton" onclick="addFood()">Add Food</button></div></div>`;
  farm.innerHTML = html;
}

function renderCamp() {
  let camp = document.getElementById("campPlot");
  const html = `<div id="camp"><div class="buildingName">LUMBER CAMP</div><div id="woodPer" class="smallerFont"></div><div id="wood"></div><div id="woodButtonField"><button id="woodButton" onclick="addWood()">Add Wood</button></div></div>`;
  camp.innerHTML = html;
}

function renderQuarry() {
  let quarry = document.getElementById("quarryPlot");
  const html = `<div id="quarry"><div class="buildingName">QUARRY</div><div id="stonePer" class="smallerFont"></div><div id="stone"></div><div id="stoneButtonField"><button id="stoneButton" onclick="addStone()">Add Stone</button></div></div>`;
  quarry.innerHTML = html;
}

function renderMines() {
  let mines = document.getElementById("minesPlot");
  const html = `<div id="mines"><div class="buildingName">MINES</div><div id="metalPer" class="smallerFont"></div><div id="metal"></div><div id="metalButtonField"><button id="metalButton" onclick="addMetal()">Add Metal</button></div></div>`;
  mines.innerHTML = html;
}

function renderMarket() {
  let market = document.getElementById("marketPlot");
  const html = `<div id="market"><div class="buildingName">MARKET</div><div id="goldPer" class="smallerFont"></div><div id="gold"></div><div id="goldButtonField"><button id="goldButton" onclick="addGold()">Add Gold</button></div></div>`;
  market.innerHTML = html;
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

function addGold() {
  data.gold++;
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
  document.querySelector("#clock").innerText = "🕰️ " + data.timer;
  document.getElementById("food").innerText = "🌾 " + data.food;
  document.getElementById("foodPer").innerText =
    data.foodPer + " 🌾 per second";
  if (data.market) {
    document.getElementById("gold").innerText = "💰 " + data.gold;
    document.getElementById("goldPer").innerText =
      data.goldPer + " 💰 per second";
  }
  if (data.camp) {
    document.getElementById("wood").innerText = "🪵 " + data.wood;
    document.getElementById("woodPer").innerText =
      data.woodPer + " 🪵 per second";
  }
  if (data.quarry) {
    document.getElementById("stone").innerText = "🧱 " + data.stone;
    document.getElementById("stonePer").innerText =
      data.stonePer + " 🧱 per second";
  }
  if (data.mines) {
    document.getElementById("metal").innerText = "🔩 " + data.metal;
    document.getElementById("metalPer").innerText =
      data.metalPer + " 🔩 per second";
  }
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

//buyBuildings functions set false to true and remove that option from the upgrades menu;
//buyUpgrades functions increment the quantity of that upgrade owned (workers) and stick around;
//can I get two columns of upgrades instead of one? or add a scrollbar so it doesnt look weird?
//can I make the squares in the Kingdom bigger?
//have buttons that won't work grayed out and inactive.
//have an "are you sure" window pop up when "reset kingdom" is clicked.
//break this code up into modules (does that work outside of node?)
//market allows you to convert resources to gold, but the more you do, the lower the price of that resource
//market also allows you to buy resources with gold, but the more you buy, the more expensive the resource price gets
//market increments in units of 10, but it can scale by level
//some one-time upgrades allow your click to become more powerful. the button changes to show this.
