const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

let train1Position = 300;
let train2Position = 500;
let train1Speed = 2;
let train2Speed = 3;
const initialSpeed1 = train1Speed;
const initialSpeed2 = train2Speed;
let coupled = false;

function updateSimulation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  let gradient1 = ctx.createRadialGradient(
    train1Position,
    200,
    5,
    train1Position,
    200,
    20
  );
  gradient1.addColorStop(0, 'limegreen');
  gradient1.addColorStop(1, 'darkgreen');

  let gradient2 = ctx.createRadialGradient(
    train2Position,
    200,
    5,
    train2Position,
    200,
    20
  );
  gradient2.addColorStop(0, 'red');
  gradient2.addColorStop(1, 'darkred');

  ctx.fillStyle = gradient1;
  ctx.beginPath();
  ctx.arc(train1Position, 200, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = gradient2;
  ctx.beginPath();
  ctx.arc(train2Position, 200, 20, 0, Math.PI * 2);
  ctx.fill();

  if (coupled) {
    let targetSpeed = (train1Speed + train2Speed) / 2;
    adjustSpeedsTowards(targetSpeed);
    moveTrainsCloser();
  } else {
    adjustSpeedsTowardsInitial();
    separateTrains();
  }

  document.getElementById(
    'speedDisplay'
  ).innerText = `Speeds: Train 1 = ${train1Speed.toFixed(
    1
  )}, Train 2 = ${train2Speed.toFixed(1)}`;
  requestAnimationFrame(updateSimulation);
}

function coupleTrains() {
  coupled = true;
}

function decoupleTrains() {
  coupled = false;
}

function adjustSpeedsTowards(targetSpeed) {
  if (Math.abs(train1Position - train2Position) > 40) {
    train1Speed += (targetSpeed - train1Speed) * 0.05;
    train2Speed += (targetSpeed - train2Speed) * 0.05;
  }
}

function moveTrainsCloser() {
  if (Math.abs(train1Position - train2Position) > 40) {
    train1Position += train1Speed * 0.5;
    train2Position -= train2Speed * 0.5;
  }
}

function adjustSpeedsTowardsInitial() {
  train1Speed += (initialSpeed1 - train1Speed) * 0.05;
  train2Speed += (initialSpeed2 - train2Speed) * 0.05;
}

function separateTrains() {
  if (train1Position > 300) train1Position -= train1Speed;
  if (train2Position < 500) train2Position += train2Speed;
}

function toggleResources() {
  var resourcesPanel = document.getElementById('resourcesPanel');
  if (resourcesPanel.style.display === 'block') {
    resourcesPanel.style.display = 'none';
  } else {
    resourcesPanel.style.display = 'block';
  }
}

updateSimulation();
