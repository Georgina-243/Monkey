
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var ground, iGround;

var survivalTime = 0;
var score = 0;

var GameState;
var PLAY, END;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   
}



function setup() {
  createCanvas(500, 500);

  PLAY = 1;
  GameState = PLAY;
  END = 0;

  FoodGroup = new Group();
  obstacleGroup = new Group();

  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(250, 405, 1000, 10);
  ground.shapeColor = 'brown';
  ground.x = ground.width / 2;

  iGround = createSprite(250, 407, 1000, 10);
  iGround.shapeColor = 'brown';
  iGround.x = ground.width / 2;

}


function draw() {
  background("gold");

  if (GameState === PLAY) {

    //reset the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (iGround.x < 0) {
      iGround.x = iGround.width / 2;
    }
    iGround.velocityX = -5;

    if (keyDown("space") && monkey.isTouching(ground)) {
      monkey.velocityY = -20;
    }
    
    
    if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
  }
   
   Food();
   Obstacle();

   score = Math.round(frameCount / 5);
    
    if (monkey.isTouching(obstacleGroup)) {
      GameState = END;
    }

} 
  else if (GameState === END) {
    ground.velocityX = 0;
    iGround.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    survivalTime = 0;
    score = 0;
    

  }

  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(iGround);

  stroke("black");
  textSize(20);
  fill("yellow");
  text("score: " + score, 400, 80);

  stroke("black");
  textSize(20);
  fill("orange");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 170, 50);





  drawSprites();
}

function Food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function Obstacle() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }

}