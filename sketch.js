var tower, towerImg;
var ghost, ghostImg;
var climber, climberImg, climberGroup;
var door, doorImg, doorGroup;
var invisibleBlock, invisibleBlockGroup;
PLAY = 1;
END = 0;
var gameState = PLAY;
var sound;

function preload(){
 
towerImg = loadImage("tower.png");
ghostImg = loadImage("ghost-standing.png");
climberImg = loadImage("climber.png");
doorImg = loadImage("door.png");
sound = loadSound("spooky.wav")  
}

function setup(){
  createCanvas(600,600);
 
tower = createSprite(300,300);
tower.addImage("tower", towerImg );
tower.velocityY = 1;
 
climberGroup = createGroup();
doorGroup = createGroup();
  
ghost = createSprite(200,200);
ghost.addImage("ghost", ghostImg);
ghost.velocityY = 2;
ghost.scale = 0.3;  
  
invisibleBlockGroup = createGroup();  
}

function draw(){
   background("blue");
  
if (gameState == PLAY){ 
 
 sound.loop();
  
  if (tower.y> 400){
    tower.y = 300;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
 if(keyDown("left")){
    ghost.velocityX -= 1;
  } 
  
  if(keyDown("right")){
    ghost.velocityX += 1;
  }

if(climberGroup.isTouching(ghost)){
  ghost.velocityY = 0;
}  
   
if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
  ghost.destroy();
  gameState = END;
}  
 
  
ghost.velocityY+=0.8
doors();  
  drawSprites(); 
}

if (gameState == END){
  fill("green");
  textSize(30);
  text("GameOver", 200,300);
}  
}  
function doors(){
  if(frameCount%240 === 0){
  door = createSprite(200,200);
  door.addImage("door", doorImg);
  climber = createSprite(200,250);
  climber.addImage(climberImg);
  door.x = Math.round(random(100,500));
  door.velocityY = 1;  
  climber.x = door.x;
  climber.velocityY = 1;
    
  door.lifetime = 600;
  climber.lifetime = 600;
    
  ghost.depth = door.depth;
  ghost.depth += 1;  
    
  doorGroup.add(door);
  climberGroup.add(climber);
    
  invisibleBlock = createSprite(200,250);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
    
  invisibleBlockGroup.add(invisibleBlock);  
    
}
}
