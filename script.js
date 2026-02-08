const AVG_SPEED = 155;
const TOP_SPEED = 161.75;
const AVG_POINTS = 15000;
const REQ_DISTANCE = 40008;
let hours;
let minutes;
let distance;
let points;
let progress;
let displayResult = document.getElementById("displayResult2");
let selectElement = document.getElementById("calcMode");
let selected = "averageStats";
const inputs = {
  distance: document.getElementById("distanceInput"),
  points: document.getElementById("tsp"),
  hours: document.getElementById("hoursInput"),
  minutes: document.getElementById("minutesInput"),
};

selectElement.addEventListener("change", ()=> {
  selected = selectElement.value;
  if (selected === "help") {
    window.location.href = "./help.html";
  }
  else if (selected === "timeDistance" || selected === "speedglitch") {
    inputs.hours.disabled = true;
    inputs.minutes.disabled = true;
    inputs.distance.disabled = false;
    inputs.points.disabled = true;
  }
  else if (selected === "averageStats") {
    inputs.hours.disabled = false;
    inputs.minutes.disabled = false;
    inputs.distance.disabled = false;
    inputs.points.disabled = false;
  }
  else if (selected === "timePoints") {
    inputs.hours.disabled = true;
    inputs.minutes.disabled = true;
    inputs.distance.disabled = true;
    inputs.points.disabled = false;
  }
});

function getValues() {
  hours = document.getElementById("hoursInput").value || 0;
  minutes = document.getElementById("minutesInput").value / 60 || 0;
  distance = document.getElementById("distanceInput").value || 0;
  points = document.getElementById("tsp").value || 0;
}

function calculate() {
  getValues();
  if (selected === "averageStats") {
    let totalTime = Number(hours) + Number(minutes);
    let result = distance / totalTime;
    points = points / totalTime;
    displayResult.innerHTML = `∅ Speed: ${result.toFixed(2)}km/h, ${points.toFixed(2)} TSP/h`;
  }
  else if (selected === "timeDistance") {
    result = distance / AVG_SPEED;
    let hoursInt = Math.floor(result);
    let minutesInt = (result - hoursInt) * 60;
    displayResult.innerHTML = `Time for ${Number(distance).toFixed(1)}km: ~${hoursInt}h ${Math.round(minutesInt)}min`;
  }
  else if (selected === "timePoints") {
    result = points / AVG_POINTS;
    let hoursInt = Math.floor(result);
    let minutesInt = (result - hoursInt) * 60;
    displayResult.innerHTML = `Time for ${parseInt(points)} TSP: ~${hoursInt}h ${Math.round(minutesInt)}min`;
  }
  else if (selected === "speedglitch") {
  result = Math.sqrt(TOP_SPEED ** 2 + distance ** 2);
  displayResult.innerHTML = `Top Speed with ${distance}km/h: ${result.toFixed(2)}km/h`;
  }
}

function addDistance() {
  let distanceGoalInput = document.getElementById("distanceGoal").value || 0;
  let bar = (distanceGoalInput / REQ_DISTANCE) * 100;
  const barItem = document.getElementById("item");
  barItem.style.width = bar + "%";
  document.getElementById("item").innerHTML = bar <= 0 ? `0.00%` : bar <= 100 ? `${bar.toFixed(2)}%` : `100.00%`;
  localStorage.setItem("progress", bar);
}

function loadProgressBar() {
progress = localStorage.getItem(progress);
barItem.style.width = progress + "%";
displayResult2.innerHTML="BITCH";
}
