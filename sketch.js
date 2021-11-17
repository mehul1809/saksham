

var mario, mario_running, mario_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore=0;
var mushroom,turtle,bomb,obsGroup

function preload(){

//loadImage is used for loading image
  bgImage = loadImage("images/bgnew.jpg");

  brickImage = loadImage("images/brick.png");

//loadSound is used for loading sound
  coinSound = loadSound("sounds/coinSound.mp3");

//loadAnimation is used for the animation
  coinImage = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
  mushroom = loadAnimation("./images/mush1.png","./images/mush2.png","./images/mush3.png","./images/mush4.png","./images/mush5.png","./images/mush6.png")
  turtle = loadAnimation("./images/tur1.png","./images/tur2.png","./images/tur3.png","./images/tur4.png","./images/tur5.png",)
  bomb = loadAnimation("./images/keyobs1.png","./images/keyobs2.png","./images/keyobs3.png","./images/keyobs4.png","./images/keyobs5.png",)
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");

}


function setup() {
  createCanvas(1000, 600);
// bg is used for background 
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
  bg.velocityX = -6;
  
  mario = createSprite(200,505,20,50);
  mario.addAnimation("running", mario_running);
  mario.scale =0.3;

  ground = createSprite(200,585,400,10);

  //.visible is for the visiblity of the object of ground and for showing it is true
  ground.visible = false;

//new Group() is for making empty list in the array
  bricksGroup = new Group();
  coinsGroup = new Group();
  obsGroup= new Group()
}

function draw() {
 
  if (bg.x < 100){
    bg.x=bg.width/4;
  }
  if(mario.x<200){
    mario.x=200;
  }

  if(mario.y<50){
    mario.y=50;
  }
//this code is for moving the player in the game
  if(keyDown("space") ) {
    mario.velocityY = -16;
  }
  mario.velocityY = mario.velocityY + 0.5;

  generateBricks();
  //for is used :- for making looping through brickGroup
  for(var i = 0 ; i< (bricksGroup).length ;i++){
    var temp = (bricksGroup).get(i) ;
    //isTouching is used for contact between two spriets
    if (temp.isTouching(mario)) {
       mario.collide(temp);
      }
        
    }

    generateCoins();

    //for is used :- for making looping through coinGroup
    for(var i = 0 ; i< (coinsGroup).length ;i++){
      var temp = (coinsGroup).get(i) ;

      //isTouching is used for contact between two spriets
      if (temp.isTouching(mario)) {
        coinSound.play();
        coinScore++;
        temp.destroy();
        temp=null;
        }
          
      }
      generateObs()

  mario.collide(ground);

  drawSprites();
  textSize(20);
  fill("red")
  text("Coins Collected: "+ coinScore, 500,50);
  
}


function generateBricks() {
  //frameCount is used for making the game run smothly and generating the object

  if (frameCount % 70 === 0) {
    var brick = createSprite(1200,120,40,10);
    brick.y = random(50,450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    //lifetime is used for deleating of sprite after a period of time
    brick.lifetime =250;
    bricksGroup.add(brick);
  }
}

function generateCoins() {
  //frameCount is used for making the game run smothly and generating the object
  if (frameCount % 50 === 0) {
    var coin = createSprite(1200,120,40,10);
    coin.addAnimation("coin", coinImage);
    coin.y = Math.round(random(80,350));
    coin.scale = 0.1;
    coin.velocityX = -3;
    //lifetime is used for deleating of sprite after a period of time
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}
function generateObs(){
  if(frameCount%70==0){
    var obstacle = createSprite(1100,540,20,20)
    obstacle.velocityX=-6
    var x =Math.round(random(1,3))
    obstacle.scale=0.2

    // switch is used of switching between the coades
    switch(x){
      case 1:
        obstacle.y=530
        obstacle.addAnimation("mushroom",mushroom)
        break
        case 2:
          obstacle.addAnimation("turtle",turtle)
          break
          case 3:
            obstacle.scale=0.6
            obstacle.addAnimation("bomb",bomb)
        break
    }

  }
}