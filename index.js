// window.onload = () => {
//   document.getElementById("").onclick = () => {
//     startGame();
//   };
// };

const canvas = document.getElementById("play-area");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
let w = canvas.width;
let h = canvas.height;

class Player {
  constructor() {
    this.w = 100;
    this.h = 100;
    this.x = w / 2 - this.w / 2;
    this.y = h - this.h - 10;
    this.score = 0;
  }
}

class Object {
  constructor(img) {
    this.x = Math.random() * 590;
    this.y = 0;
    this.w = 30;
    this.h = 30;
    this.img = img;
  }
}

class Shark {
  constructor(img) {
    this.x = Math.random() * 590;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    this.img = img;
  }
}

class Boat {
  constructor(img) {
    this.x = 0;
    this.y = 0;
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
surfer.onload = function () {
  ctx.drawImage(surfer, player1.x, player1.y, player1.w, player1.h);
};

const penImg = new Image();
penImg.src = "images/penguin.png";
penImg.onload = function () {
  ctx.drawImage(penImg, penguin.x, penguin.y, penguin.w, penguin.h);
};

const octImg = new Image();
octImg.src = "images/octopus.png";
octImg.onload = function () {
  ctx.drawImage(octImg, octopus.x, octopus.y, octopus.w, octopus.h);
};

const coralImg = new Image();
coralImg.src = "images/coral.png";
coralImg.onload = function () {
  ctx.drawImage(coralImg, coral.x, coral.y, coral.w, coral.h);
};
const fwoodImg = new Image();
fwoodImg.src = "images/firewood.png";
fwoodImg.onload = function () {
  ctx.drawImage(fwoodImg, firewood.x, firewood.y, firewood.w, firewood.h);
};
const shrseImg = new Image();
shrseImg.src = "images/seahorse.png";
shrseImg.onload = function () {
  ctx.drawImage(shrseImg, seahorse.x, seahorse.y, seahorse.w, seahorse.h);
};
const pshipImg = new Image();
pshipImg.src = "images/pirate-ship.png";
pshipImg.onload = function () {
  ctx.drawImage(
    pshipImg,
    pirateship.x,
    pirateship.y,
    pirateship.w * 3,
    pirateship.h * 3
  );
};
const sharkImg = new Image();
sharkImg.src = "images/shark.png";
sharkImg.onload = function () {
  ctx.drawImage(sharkImg, shark.x, shark.y, shark.w * 6, shark.h * 6);
};

setInterval(function () {
  imgArr = [penImg, octImg, coralImg, fwoodImg];
  let randomImg = imgArr[Math.floor(Math.random() * imgArr.length)];
  obstacleArr.push(new Object(randomImg));
}, 1000);

setInterval(function () {
  sharkArr.push(new Shark(sharkImg));
}, 1000);

setInterval(function () {
  boatArr.push(new Boat(pshipImg));
}, 1000);

addEventListener; //key down

//All animations occur here
function updateCanvas() {
  window.requestAnimationFrame(updateCanvas);
  ctx.clearRect(0, 0, 600, 600);

  for (let i = 0; i < obstacleArr.length; i++) {
    ctx.drawImage(
      obstacleArr[i].img,
      obstacleArr[i].x,
      obstacleArr[i].y,
      obstacleArr[i].w,
      obstacleArr[i].h
    );
    obstacleArr[i].y += 5;
    let didCollide = detectCollision(player1, obstacleArr[i]);
    if (didCollide) {
      player1.score++;
    }
  }
  for (let i = 0; i < sharkArr.length; i++) {
    ctx.drawImage(
      sharkArr[i].img,
      sharkArr[i].x,
      sharkArr[i].y,
      sharkArr[i].w,
      sharkArr[i].h
    );
    sharkArr[i].y += 3;
  }
  for (let i = 0; i < boatArr.length; i++) {
    ctx.drawImage(
      boatArr[i].img,
      boatArr[i].x,
      boatArr[i].y,
      boatArr[i].w,
      boatArr[i].h
    );

    boatArr[i].y += 1;
    if (boatArr[i].x + boatArr[i].w > w) {
      boatArr[i].reverse = true;
    }
    if (boatArr[i].x < 0) {
      boatArr[i].reverse = false;
    }
    if (boatArr[i].reverse) {
      boatArr[i].x -= 5;
    } else {
      boatArr[i].x += 5;
    }
  }
  ctx.drawImage(surfer, player1.x, player1.y, player1.w, player1.h);
}
updateCanvas();

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
