window.onload = () => {
  document.getElementById("").onclick = () => {
    startGame();
  };
};

const canvas = document.getElementById("the-ocean");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
canvas.width = w;
canvas.height = h;

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 40;
    this.h = 40;
  }
}

player1 = new Player();
player1 = {
  x: 20,
  y: 20,
  w: 40,
  h: 30,
};

class Object {
  constructor() {
    this.x = Math.random() * 400;
    this.y = 0;
    this.w = Math.random() * 300;
    this.h = 20;
  }
}

let collectible1 = new Object();

let obstacleArr = [];

const surfer = new Image();
surfer.src = "images/surfing-gal-player.png";
surfer.onload = function () {
  ctx.drawImage(surfer, player1.x, player1.y, player1.w, player1.h);
};
