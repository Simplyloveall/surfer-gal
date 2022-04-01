const canvas = document.getElementById("the-ocean");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
canvas.width = w;
canvas.height = h;

const player = {
  x: 250,
  y: 600,
  w: 40,
  h: 60,
  score: 0,
};

class Object {
  constructor() {
    this.x = Math.random() * 400;
    this.y = 0;
    this.w = Math.random() * 300;
    this.h = 20;
  }
}

let collectible = new Object();

let obstacleArr = [];

const surfer = new Image();
car.src = "images/car.png";
car.onload = function () {
  ctx.drawImage(surfer, player.x, player.y, player.w, player.h);
};
