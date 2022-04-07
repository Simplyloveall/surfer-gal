const splash = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 5000);
});

let time = 1000;
let countDown = setInterval(timer, 1000);

function timer() {
  time -= 20;
  if (time === 0) {
    gameOver();
  }
}

const canvas = document.getElementById("play-area");
canvas.addEventListener("click", startGame);
const ctx = canvas.getContext("2d");
canvas.width = 770;
canvas.height = 500;
let w = canvas.width;
let h = canvas.height;

ctx.fillStyle = "rgb(54, 38, 38)";
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = "#F9D199";
ctx.font = "50px sans-serif";
ctx.fillText("Click to Play", 250, 250);
ctx.font = "24px sans-serif";
ctx.fillStyle = "white";
ctx.fillText("move with arrow keys", 250, 50);
ctx.fillText("avoid contact with boats", 250, 100);
ctx.fillText("definitely avoid sharks", 250, 150);

class Player {
  constructor() {
    this.w = 80;
    this.h = 80;
    this.x = w / 2 - this.w / 2;
    this.y = h - this.h - 10;
    this.score = 0;
    this.speedx = 0;
    this.speedy = 0;
  }
  moveUp() {
    player1.y -= 30;
  }
  moveDown() {
    player1.y += 30;
  }
  moveLeft() {
    player1.x -= 30;
  }
  moveRight() {
    player1.x += 30;
  }
  move() {
    this.x += this.speedx;
    this.y += this.speedy;
    if (this.y + this.h > h) {
      this.y = h - this.h;
    } else if (this.y < 0) {
      this.y = 0;
    } else if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > w) {
      this.x = w - this.w;
    }
  }
}

class Object {
  constructor(img) {
    this.w = 30;
    this.h = 30;
    this.x = Math.random() * w - this.w;
    this.y = 0;
    this.img = img;
  }
}

class Shark {
  constructor(img) {
    this.w = 120;
    this.h = 120;
    this.x = Math.random() * w - this.w;
    this.y = 0;
    this.img = img;
  }
}

class Boat {
  constructor(img) {
    this.x = 0;
    this.y = 150;
    this.w = 100;
    this.h = 100;
    this.img = img;
    this.reverse = false;
  }
}
let player1 = new Player();
let obstacleArr = [];
let sharkArr = [];
let boatArr = [];

let speed1 = 0;
let speed2 = 0;
let speed3 = 0;

const surfer = new Image();
surfer.src = "images/surfing-gal-player.png";
// surfer.onload = function () {
//   ctx.drawImage(surfer, player1.x, player1.y, player1.w, player1.h);
// };

const penImg = new Image();
penImg.src = "images/penguin.png";
penImg.onload = function () {
  // ctx.drawImage(penImg, penguin.x, penguin.y, penguin.w, penguin.h);
};

const octImg = new Image();
octImg.src = "images/octopus.png";
octImg.onload = function () {
  // ctx.drawImage(octImg, octopus.x, octopus.y, octopus.w, octopus.h);
};

const coralImg = new Image();
coralImg.src = "images/coral.png";
coralImg.onload = function () {
  // ctx.drawImage(coralImg, coral.x, coral.y, coral.w, coral.h);
};
const fwoodImg = new Image();
fwoodImg.src = "images/firewood.png";
fwoodImg.onload = function () {
  // ctx.drawImage(fwoodImg, firewood.x, firewood.y, firewood.w, firewood.h);
};
const shrseImg = new Image();
shrseImg.src = "images/seahorse.png";
shrseImg.onload = function () {
  // ctx.drawImage(shrseImg, seahorse.x, seahorse.y, seahorse.w, seahorse.h);
};
const pshipImg = new Image();
pshipImg.src = "images/pirate-ship.png";
pshipImg.onload = function () {
  // ctx.drawImage(
  //   pshipImg,
  //   pirateship.x,
  //   pirateship.y,
  //   pirateship.w * 3,
  //   pirateship.h * 3
  // );
};
const sharkImg = new Image();
sharkImg.src = "images/shark.png";
sharkImg.onload = function () {
  // ctx.drawImage(sharkImg, shark.x, shark.y, shark.w * 6, shark.h * 6);
};

// addEventListener; //key down

document.addEventListener("keydown", (e) => {
  console.log(e);
  switch (e.key) {
    case "ArrowUp":
      player1.speedy = -5;
      break;
    case "ArrowDown":
      player1.speedy = 5;

      break;
    case "ArrowLeft":
      player1.speedx = -5;

      break;
    case "ArrowRight":
      player1.speedx = 5;

      break;
  }
});

document.addEventListener("keyup", (e) => {
  player1.speedx = 0;
  player1.speedy = 0;
});
let animation;
let gameOn = false;

let int1;
let int2;
let int3;

function startGame() {
  if (gameOn === false) {
    int1 = setInterval(function () {
      imgArr = [penImg, octImg, coralImg, fwoodImg];
      let randomImg = imgArr[Math.floor(Math.random() * imgArr.length)];
      obstacleArr.push(new Object(randomImg));
    }, 1000);
    player1.score = 0;
    time = 1000;
    int2 = setInterval(function () {
      sharkArr.push(new Shark(sharkImg));
    }, 8000);

    int3 = setInterval(function () {
      boatArr.push(new Boat(pshipImg));
    }, 9000);
    updateCanvas();
    gameOn = true;
  }
}
//All animations occur here
function updateCanvas() {
  animation = window.requestAnimationFrame(updateCanvas);
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(surfer, player1.x, player1.y, player1.w, player1.h);
  player1.move();
  ctx.font = "20px goudy stout";
  ctx.fillStyle = "gold";
  ctx.fillText(`Time Left = ${time}`, 360, 30);
  for (let i = 0; i < obstacleArr.length; i++) {
    ctx.drawImage(
      obstacleArr[i].img,
      obstacleArr[i].x,
      obstacleArr[i].y,
      obstacleArr[i].w,
      obstacleArr[i].h
    );
    obstacleArr[i].y += 2;
    let didCollide = detectCollision(player1, obstacleArr[i]);
    if (didCollide) {
      player1.score += 10;
      obstacleArr.splice(i, 1);
    }
  }
  for (let i = 0; i < boatArr.length; i++) {
    ctx.drawImage(
      boatArr[i].img,
      boatArr[i].x,
      boatArr[i].y,
      boatArr[i].w,
      boatArr[i].h
    );

    boatArr[i].x += 3;
    let didCollide = detectCollision(player1, boatArr[i]);
    if (didCollide) {
      player1.score -= 20;
      boatArr.splice(i, 1);
    }

    // if (boatArr[i].x + boatArr[i].w > w) {
    //   boatArr[i].reverse = true;
    // }
    // if (boatArr[i].x < 0) {
    //   boatArr[i].reverse = false;
    // }
    // if (boatArr[i].reverse) {
    //   boatArr[i].x -= 5;
    // } else {
    //   boatArr[i].x += 5;
    // }
  }
  for (let i = 0; i < sharkArr.length; i++) {
    ctx.drawImage(
      sharkArr[i].img,
      sharkArr[i].x,
      sharkArr[i].y,
      sharkArr[i].w,
      sharkArr[i].h
    );
    sharkArr[i].y += 1;
    let didCollide = detectCollision(player1, sharkArr[i]);
    if (didCollide) {
      player1.score++;
      sharkArr.splice(i, 1);
      gameOver();
    }
  }

  ctx.font = "20px goudy stout";
  ctx.fillText(`Score = ${player1.score}`, 80, 30);
}

function gameOver() {
  window.cancelAnimationFrame(animation);
  clearInterval(int1);
  clearInterval(int2);
  clearInterval(int3);
  clearInterval(countDown);
  ctx.fillStyle = "#64ABE3";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#F9D199";
  ctx.font = "50px sans-serif";
  ctx.fillText("GAME OVER", 200, 250);
  gameOn = false;
}

//detects collision
function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    return true;
  } else {
    return false;
  }
}
