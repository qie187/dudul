const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")
const iris = new Image();
const dudulWithNoEyes = new Image();
const dudulWithbnEyes = new Image();
const mousePosition = {x: 0, y: 0 };
const eyeRadius = 4;

dudulWithbnEyes.src = "assets/Gatosinpupilas1.png"
iris.src = "assets/Pupila.png";
dudulWithNoEyes.src = "assets/Gatosinojosnipupilas1.png"

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.height = canvas.height;
  ctx.width = canvas.width;
}

function drawDudulWithBnEyes() {
  const x = canvas.width / 2 - dudulWithbnEyes.width / 2;
  const y = canvas.height / 2 - dudulWithbnEyes.height / 2;
  ctx.drawImage(dudulWithbnEyes, x, y);
}

function drawdudulWithNoEyes() {
  const x = canvas.width / 2 - dudulWithNoEyes.width / 2;
  const y = canvas.height / 2 - dudulWithNoEyes.height / 2;
  ctx.drawImage(dudulWithNoEyes, x, y);
}

function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function getUnitVector(a, b) {
  const module = distance(a,b);
  return {
    x: (b.x - a.x) / module,
    y: (b.y - a.y) / module
  };
}

function getTranslatedPosition(eyePosition) {
  if (distance(eyePosition, mousePosition) <= eyeRadius) {
    return mousePosition;
  }
  const unitVector = getUnitVector(eyePosition, mousePosition);
  return {
    x: eyePosition.x + eyeRadius * Math.sin(unitVector.x),
    y: eyePosition.y + eyeRadius * Math.sin(unitVector.y),
  };
}

function drawEyes() {
  const eyeOriginPositions = [
    {
      x: canvas.width / 2 - 55,
      y: canvas.height / 2 - 1,
    },
    {
      x: canvas.width / 2,
      y: canvas.height / 2,
    }
  ];

  const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
  
  eyePositions.forEach((eyePosition) => {
    ctx.drawImage(iris, 
                  eyePosition.x - iris.width / 2, 
                  eyePosition.y - iris.height / 2);
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
  clearCanvas();
  drawDudulWithBnEyes();
  drawEyes();
  drawdudulWithNoEyes();
}

function onResize() {
  resizeCanvas();
  render();
}

function onMouseMove(event) {
  mousePosition.x = event.offsetX;
  mousePosition.y = event.offsetY;
  render();
}

function onTouchMove(event) {
  mousePosition.x = event.touches[0].clientX;
  mousePosition.y = event.touches[0].clientY;
  render();
}

function main() {
  resizeCanvas();
  render();
  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
}

window.addEventListener("load", main);