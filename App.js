let can = document.getElementById("myCan");
let ctx = can.getContext("2d");
let points = [[0, 0]];
let cellSize = 50;
let direction = "right";

let widthBound = 1500;
let heightBound = 700;
let idd;

let score = 0;
let HighScore =localStorage.getItem('HighScore') || 0;
let gameOver = false;
let foodPoints = generate();
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    direction = "up";
  } else if (e.key === "ArrowDown") {
    direction = "down";
  } else if (e.key === "ArrowLeft") {
    direction = "left";
  } else {
    direction = "right";
  }
});
function draw() {
  if (gameOver === true) {
    clearInterval(idd);
    HighScore = Math.max(score,HighScore);
    localStorage.setItem('HighScore', HighScore);
    ctx.fillStyle = "red";
    ctx.font = "50px monospace";
    ctx.fillText(
      `Game Over !!`,
      widthBound / 2 - 2 * cellSize,
      heightBound / 2 - 2 * cellSize
    );
    ctx.fillStyle = "blue";
    ctx.font = "24px monospace";
    ctx.fillText(
      `Highest Score: ${HighScore} :)`,
      widthBound / 2 -  cellSize,
      heightBound / 2 -  cellSize
    );
    return;
  }
  ctx.clearRect(0, 0, 1500, 700);
  for (let cell of points) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
  }
  //food
  ctx.fillStyle = "green";
  ctx.fillRect(foodPoints[0], foodPoints[1], cellSize, cellSize);
  ctx.fillStyle = "white";
  ctx.font = "24px monospace";
  ctx.fillText(`score: ${score}`, 20, 20);
}
function update() {
  let x = points[points.length - 1][0];
  let y = points[points.length - 1][1];
  let newX;
  let newY;
  if (direction === "up") {
    newX = x;
    newY = y - cellSize;
    if (newY < 0) {
      gameOver = true;
      return;
    }
  } else if (direction === "down") {
    newX = x;
    newY = y + cellSize;
    if (newY > heightBound - cellSize) {
      gameOver = true;
      return;
    }
  } else if (direction === "left") {
    newX = x - cellSize;
    newY = y;
    if (newX < 0) {
      gameOver = true;
      return;
    }
  } else {
    newX = x + cellSize;
    newY = y;
    if (newX > widthBound - cellSize) {
      gameOver = true;
      return;
    }
  }

  // why includes not work?
  // if(points.includes([newX,newY])){
  //   gameOver=true;
  //   return;
  // }

  if (khagaya(newX, newY)) {
    gameOver = true;
    return;
  }
  points.push([newX, newY]);

  if (newX === foodPoints[0] && newY === foodPoints[1]) {
    score++;
    foodPoints = generate();
  } else {
    points.shift();
  }
}

idd = setInterval(() => {
  draw();
  update();
}, 200);

function generate() {
  return [
    Math.round((Math.random() * (widthBound - cellSize)) / cellSize) * cellSize,
    Math.round((Math.random() * (heightBound - cellSize)) / cellSize) *
      cellSize,
  ];
}

function khagaya(newX, newY) {
  for (let item of points) {
    if (item[0] === newX && item[1] === newY) {
      return true;
    }
  }
  return false;
}
