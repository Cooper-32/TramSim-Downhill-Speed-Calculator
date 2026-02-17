const AVG_SPEED = 152;
const TOP_SPEED = 161.75;
const AVG_POINTS = 15000;
const REQ_DISTANCE = 40008;

let selected = "averageStats";
let data = {
  distance: 0,
  points: 0,
  hours: 0,
  minutes: 0
};

const inputs = {
  distance: document.getElementById("distanceInput"),
  points: document.getElementById("tsp"),
  hours: document.getElementById("hoursInput"),
  minutes: document.getElementById("minutesInput"),
};

const element = {
  displayResult: document.getElementById("displayResult2"),
  select: document.getElementById("calcMode"),
  goalInput: document.getElementById("distanceGoal"),
  barItem: document.getElementById("item"),
  barTracker: document.getElementById("barTracker"),
};

element.select.addEventListener("change", ()=> {
  selected = element.select.value;
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

element.barTracker.addEventListener("click", ()=> {
  let status = element.barTracker.dataset.status === "true";
  element.barTracker.dataset.status = !status;
  let tracker = Number(localStorage.getItem("tracker")) || 0;
  element.barTracker.innerHTML = status ? `${Math.round(tracker).toLocaleString()}/${REQ_DISTANCE.toLocaleString()}km` : `${Math.round(REQ_DISTANCE - tracker).toLocaleString()} km left`;
});

function getValues() {
  data.hours = inputs.hours.value || 0;
  data.minutes = inputs.minutes.value / 60 || 0;
  data.distance = inputs.distance.value || 0;
  data.points = inputs.points.value || 0;
}

function calculate() {
  getValues();
  if (selected === "averageStats") {
    let totalTime = Number(data.hours) + Number(data.minutes);
    let result = data.distance / totalTime;
    data.points = data.points / totalTime;
    element.displayResult.innerHTML = `∅ Speed: ${result.toFixed(2)}km/h, ${data.points.toFixed(2)} TSP/h`;
  }
  else if (selected === "timeDistance") {
    result = data.distance / AVG_SPEED;
    let hoursInt = Math.floor(result);
    let minutesInt = (result - hoursInt) * 60;
    element.displayResult.innerHTML = `Time for ${Number(data.distance).toFixed(1)}km: ~${hoursInt}h ${Math.round(minutesInt)}min`;
  }
  else if (selected === "timePoints") {
    result = data.points / AVG_POINTS;
    let hoursInt = Math.floor(result);
    let minutesInt = (result - hoursInt) * 60;
    element.displayResult.innerHTML = `Time for ${parseInt(data.points)} TSP: ~${hoursInt}h ${Math.round(minutesInt)}min`;
  }
  else if (selected === "speedglitch") {
  result = Math.sqrt(TOP_SPEED ** 2 + data.distance ** 2);
  element.displayResult.innerHTML = `Top Speed with ${data.distance}km/h: ${result.toFixed(2)}km/h`;
  }
}

function addDistance() {
  let distanceGoalInput = element.goalInput.value || 0;
  let bar = (distanceGoalInput / REQ_DISTANCE) * 100;
  element.barItem.style.width = bar + "%";
  element.barItem.innerHTML = bar <= 0 ? `0.00%` : bar <= 100 ? `${bar.toFixed(2)}%` : `100.00%`;
  element.barTracker.innerHTML = `${Number(Math.round(distanceGoalInput)).toLocaleString()}/${REQ_DISTANCE.toLocaleString()}km`;
  localStorage.setItem("progress", bar);
  localStorage.setItem("tracker", distanceGoalInput);
}

function loadProgressBar() {
  setTimeout(()=> {
  let progress = Number(localStorage.getItem("progress")) || 0;
  let tracker = Number(localStorage.getItem("tracker")) || 0;
  element.barItem.style.width = progress + "%";
  element.barItem.innerHTML = `${Number(progress).toFixed(2)}%`;
  element.barTracker.innerHTML = `${Math.round(tracker).toLocaleString()}/${REQ_DISTANCE.toLocaleString()}km`;
 }, 100)
}