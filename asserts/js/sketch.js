let blackJet;
let whiteJet;
let bg;

let blackJetImage;
let whiteJetImage;
const ROTATE_AMOUNT = 0.05;

function preload() {
	blackJetImage = loadImage("/asserts/img/black-jet.png");
  whiteJetImage = loadImage("/asserts/img/white-jet.png");
}

function setup() {
  bg = loadImage('/asserts/img/bg.jpg');
  createCanvas(window.innerWidth, window.innerHeight);
  
  blackJet = new Jet(blackJetImage, false);
  whiteJet = new Jet(whiteJetImage, true);
}

function draw() {
 
  background(bg);
  
  // add the enemy bullets into the update function
  blackJet.update(whiteJet);
  whiteJet.update(blackJet);
  
  blackJet.draw();
  whiteJet.draw(); 
  
  
  textSize(0.008 * canvas.width);
  fill(0);
  text("Player A", width/3, height/7);
  
  textSize(50);
  fill(0);
  text(blackJet.score, width/2.87, height/10);
  
  textSize(0.008 * canvas.width);
  fill(255);
  text("Player B", width/1.8, height/7);
  
  textSize(50);
  fill(255);
  text(whiteJet.score, width/1.75, height/10);
}


function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
  	blackJet.rotateAmount = ROTATE_AMOUNT;
  } else if (keyCode === LEFT_ARROW) {
  	blackJet.rotateAmount = -ROTATE_AMOUNT;
  } else if (keyCode === 68) {
    // d
		whiteJet.rotateAmount = ROTATE_AMOUNT;
  } else if (keyCode === 65) { 
  	// a
    whiteJet.rotateAmount = -ROTATE_AMOUNT;
  } else if (keyCode === 38) {
  	// ctrl
    blackJet.shoot();
  } else if (keyCode === 87) {
  	// spacebar
    whiteJet.shoot();
  }
}

function keyReleased() {
	if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
  	blackJet.rotateAmount = 0;
  } else if (keyCode === 65 || keyCode === 68) {
  	whiteJet.rotateAmount = 0;
  }
}

