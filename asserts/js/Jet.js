class Jet {
	
  constructor(image, isWhite) {
  	this.x = random(width);
    this.y = random(height);
    this.image = image;
    
    this.angle = 0;
    this.speed = 1;
    
    
    this.rotateAmount = 0;
    
    this.bullets = [];
    this.isWhite = isWhite;
    this.score = 0;
    this.high_score = 9;
    
  }
  

  update(enemyPlayer) {
    this.goTheWayWereFacing();
    this.constrainToMap();
    

    this.angle += this.rotateAmount;

    // new function to check if player has been hit
    this.processBeingHitByBullet(enemyPlayer);

  }
  
  processBeingHitByBullet(enemyPlayer) {
  
    let enemyBullets = enemyPlayer.bullets;
    
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
    	if (dist(this.x, this.y, enemyBullets[i].x, enemyBullets[i].y) < (10 + enemyBullets[i].r)){ 
        enemyBullets.splice(i, 1);
        enemyPlayer.score++;
      }
      if (enemyPlayer.score > this.high_score){
        this.gameOver();
        noloop();        
      } 
    }
  }

  gameOver(){
		textSize(0.05 * canvas.width);
    fill("rgba(230, 230, 230, .50)");
    rect(0, 0, window.innerWidth, window.innerHeight);
    fill("#ffffff");
    text("Game Over", width/4, height/4);
    fill("#ffffff");

    textSize(0.04 * canvas.width);  
    fill("#ff0000");  
    if(blackJet.score > whiteJet.score)
      text("Player A Wins the Battle!", width/15, height/2);
    else 
      text("Player B Wins the Battle!", width/15, height/2);
   
  }
  
  goTheWayWereFacing() {
  	this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
  

  constrainToMap() {
    if (this.x < -this.image.width) {
    	this.x = width;
    } else if (this.x > width) {
    	this.x = 0;
    } 
    
    if (this.y > height) {
    	this.y = 0;
    } else if (this.y < -this.image.height) {
    	this.y = height;
    }
  }
  
  
  // when the player shoots add to the bullet array
	shoot() {
  	let bullet = new Bullet(this.x, this.y, this.angle, this.isWhite);
    this.bullets.push(bullet);
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
		rotate(this.angle + HALF_PI);
  	image(this.image, 0, 0);
    pop();
    
    // call to draw and update the buggers
    this.drawBullets();
  }
  
  // draw and update the buggers
  drawBullets() {
    
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();
    	this.bullets[i].draw(); 
      
      if (this.bullets[i].timeAlive > 200) {
      	this.bullets.splice(i, 1);
      }
    }
  	
  }
  
}