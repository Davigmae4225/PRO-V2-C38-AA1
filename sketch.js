var canvas;
var backgroundImage, car1_img, car2_img, track,full_img,coin2_img;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2;
var cars = [];
var Fulls,PawerCoins;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img = loadImage("../assets/car1.png");
  car2_img = loadImage("../assets/car2.png");
  track = loadImage("../assets/pista.png");
   full_img=loadImage("../assets/fuel.png");
   coin2_img=loadImage("../assets/goldCoin.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
