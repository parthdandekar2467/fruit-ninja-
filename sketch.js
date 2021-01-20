var alien1, alien1_image, alien2, alien2_image;
var fruit1, fruit1_image, fruit2, fruit2_image, fruit3, fruit3_image, fruit4, fruit4_image, monster;
var gameover, gameover_image;
var sword, sword_image;
var monsterGroup, fruitGroup;
var fruit, monster;

// gamestates
var PLAY = 1;
var END = 0;
var gameState = 1;

var score;

function preload()
{
  // alien image preloading
  alien1_image = loadImage("alien1.png");
  alien2_image = loadImage("alien2.png");
 
  // fruit image preloading
  fruit1_image = loadImage("fruit1.png");
  fruit2_image = loadImage("fruit2.png");
  fruit3_image = loadImage("fruit3.png");
  fruit4_image = loadImage("fruit4.png");
 
  // sword image preloading
  sword_image = loadImage("sword.png");
 
  //gameover image preloading
  gameover_image = loadImage("gameover.png");
}

function setup()
{
  // to create background
  background(400, 400);
  
  gameover = createSprite(200, 200, 20, 20);
  gameover.addImage(gameover_image);
 
  // knife
  knife = createSprite(100, 100, 10, 10);
  knife.addImage(sword_image);
  knife.scale = 0.4;
  
  knife.setCollider("circle",0,0,55);
  knife.debug = true;
  
  
 
  // function called in setup for groups
  fruitGroup = new Group();
  monsterGroup = new Group();
  
  score = 0;
}

function draw()
{
  // background color'
  background("cyan");
  
  if(gameState === PLAY)
    {
      if (fruitGroup.isTouching(knife))
  {
    fruitGroup.destroyEach();
    score = score+1;
  }
      
      gameover.visible = false;
 
  // to move the knife
  knife.x = World.mouseX;
  knife.y = World.mouseY;
      
      if (monsterGroup.isTouching(knife))
          {
            gameState = END;
          }
    fruits();
    monsters();
    }
  
   else if (gameState === END) 
   {
      gameover.visible = true;
      knife.visible = false;
      fruitGroup.destroyEach();
      monsterGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      monsterGroup.setVelocityXEach(0);
   }
 
  // to draw sprites 
  drawSprites();
  text("Score: "+ score, 340,20);
}

function fruits()
{
  if(World.frameCount%80===0)
  {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    fruit.setCollider("circle", 0, 0, 80);
  fruit.debug = true;
    //fruit.debug = true;
    r = Math.round(random(1, 4));
   
      if (r == 1)
      {
        fruit.addImage(fruit1_image);
      } else if (r == 2) {
        fruit.addImage(fruit2_image);
      } else if (r == 3) {
        fruit.addImage(fruit3_image);
      } else {
        fruit.addImage(fruit4_image);
      }
   
    fruit.y=Math.round(random(20, 300));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
   
   
  }
}
function monsters()
{
    if (World.frameCount % 200===0)
    {
      monster = createSprite(400, 200, 20, 20);
      monster.addAnimation("moving", alien1_image);
      monster.y = Math.round(random(10, 290));
      monster.velocityX = -8;
      monster.setLifetime = 50;
      
      monsterGroup.add(monster);
      
    }  
  }
