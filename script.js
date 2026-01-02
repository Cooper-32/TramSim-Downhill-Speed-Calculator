function calculate() {
  let speed = document.getElementById("input").value || 0;
  let maxSpeed = 161.75;
  let result = 0;
  result = Math.sqrt(maxSpeed ** 2 + speed ** 2);
  document.getElementById("displayResult").innerHTML = `Top Speed with ${speed}km/h: ${result.toFixed(2)}km/h`
}
//Hello :)