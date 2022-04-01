var score=0;
// form load life and score
var space ,bg;
var spacecraft,spacecraftImg ;
var obstacle,obstacleGroup;
var meteor,meteor2,meteorGroup;
var alienspaceship,alienspaceshipGroup,alienspaceshipImg;
var missile,missileImg,missileGroup;
var blast,blastImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var endpoint;
var launchsound,blastsound;
var lasersound,lasersound2;
var alienspaceshipdestroy;
var power,powerImg,powerGroup;
var laser,laserImg,laserGroup;
var spacesound;

var life =3;
var gameState=1
var score = 0;


function preload(){
space = loadImage("space.png");   
spacecraftImg = loadImage("spacecraft2.png");
meteor2 = loadImage("meteor2.png");
alienspaceshipImg = loadImage("alienspaceship.png");
missileImg = loadImage("missile3.png");
blastImg=loadImage("boom2.png");
heart1Img=loadImage("heart_1.png");
heart2Img=loadImage("heart_2.png");
heart3Img=loadImage("heart_3.png");
launchsound=loadSound("missilelaunch.wav");
blastsound=loadSound("meteorblast.wav");
lasersound=loadSound("lasershoot.mp3");
lasersound2=loadSound("lasershoot2.mp3");
alienspaceshipdestroy=loadSound("alienspaceshipdestroy.wav");
powerImg = loadImage("power.png");
laserImg = loadImage("laser.png");
spacesound=loadSound("spacesound.mp3");

}

function setup(){

  //background  
createCanvas(windowWidth,windowHeight);
bg=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
bg.addImage(space);
bg.scale=1.75;

//SPACECRAFT
spacecraft=createSprite(180,height/2,50,height);
spacecraft.addImage(spacecraftImg);
spacecraft.scale=0.16;


heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

    endpoint = createSprite(300,height/2,60,windowHeight);
    endpoint.visible=false;

//obstacleGroup
meteorGroup=createGroup();
missileGroup=createGroup();
alienspaceshipGroup=createGroup();
powerGroup=createGroup();
laserGroup=createGroup();

}
function draw(){
    
    background("black");

    bg.velocityX=-3;

   //  spacesound.play();
//INFINITE





    if(bg.x<600){
        bg.x=bg.width/2;
    }

    //KEY FOR SPACECRAFT
    if(keyDown(DOWN_ARROW)){
        spacecraft.y=spacecraft.y+5;
    }

    if(keyDown(UP_ARROW)){
        spacecraft.y=spacecraft.y-5;
    }

   



   spawnmeteor();

   spawnpower();
  
  if(keyWentDown(RIGHT_ARROW)){
    launchmissile();
    launchsound.play();
  }


   if(meteorGroup.isTouching(missileGroup)){
     
    for(var i =0;i<meteorGroup.length;i++){
        if(meteorGroup[i].isTouching(missileGroup)){
            meteorGroup[i].destroy();
            missileGroup.destroyEach();
            blastsound.play(); 
            score=score+5;  
        }
    }
   }

  

   if(score>=50){
       spawnalienspaceship();
   }

 
   if(alienspaceshipGroup.isTouching(missileGroup)){
     
    for(var i =0;i<alienspaceshipGroup.length;i++){
        if(alienspaceshipGroup[i].isTouching(missileGroup)){
            alienspaceshipGroup[i].destroy();
            missileGroup.destroyEach();
  alienspaceshipdestroy.play();
            score=score+10;  
        }
    }
}


if(spacecraft.isTouching(powerGroup)){
    laserpower();
    
}

if(keyWentDown(LEFT_ARROW)){
    laser.velocityX=14;
    laser.addImage(laserImg);
    laser.visible=true;
}



if(meteorGroup.isTouching(endpoint)){
    for(var i =0;i<meteorGroup.length;i++){

        if(meteorGroup[i].isTouching(endpoint)){
            meteorGroup[i].destroy();
           life=life-1;
        }
    }
}


if(alienspaceshipGroup.isTouching(endpoint)){
    for(var i =0;i<alienspaceshipGroup.length;i++){

        if(alienspaceshipGroup[i].isTouching(endpoint)){
            alienspaceshipGroup[i].destroy();
           life=life-1;
        }
    }
}

 spacecraftlife();

 spacecraftdestroy();

  drawSprites();
  textSize(27);
   fill("white");
  text("score: "+score,displayWidth-250,100);


}


function spawnmeteor() {
    if(frameCount%54===0){
        meteor=createSprite(600,300,40,100);
    meteor.addImage(meteor2);
       meteor.y=Math.round(random(0,windowHeight))
       meteor.x=Math.round(random(windowWidth/2,windowWidth));
        meteor.scale=0.09;
        meteor.velocityX=-3;
       meteorGroup.add(meteor);
    }
}

function spawnalienspaceship(){
    if(frameCount%57===0){
        alienspaceship=createSprite(700,400,40,100);
    alienspaceship.addImage(alienspaceshipImg);
       alienspaceship.y=Math.round(random(0,windowHeight));
       alienspaceship.x=Math.round(random(windowWidth/2,windowWidth));
       alienspaceship.scale=0.09;
       alienspaceship.velocityX=-3;
      alienspaceshipGroup.add(alienspaceship);
}}

function spawnpower(){
    if(frameCount%40===0){
        power=createSprite(700,400,40,100);
        power.addImage(powerImg);
        power.y=Math.round(random(0,windowHeight));
        power.x=Math.round(random(windowWidth/2,windowWidth));
        power.scale=0.2;
        power.velocityX=-2;
      powerGroup.add(power);
}}

function launchmissile(){
    missile= createSprite(spacecraft.x, spacecraft.y, 50,20)
    missile.addImage(missileImg)
    missile.scale=0.2
    missile.velocityX= 7
    missileGroup.add(missile)

}

function laserpower(){
 
    
    laser=createSprite(spacecraft.x, spacecraft.y, 40,20)      
  
    laser.scale=0.2;
   laser.visible=false;
    laserGroup.add(laser);
    
       
}


function spacecraftlife(){
    if(life===2){
       heart3.visible=false;
        heart2.visible=true;
    }

    if(life===1){
        heart2.visible=false;
        heart1.visible=true;
    }
}

function spacecraftdestroy(){
    if(life===0){
      heart1.visible=false;
    spacecraft.destroy();
    missileGroup.destroyEach();
    meteorGroup.destroyEach();
    alienspaceshipGroup.destroyEach();
    powerGroup.destroyEach();
    bg.velocityX=0;
 GameOver();
    }
      
    }

function GameOver() {
swal({
    title: `Game Over`,
    
    text: "YOUR SCORE IS : " + score ,
    
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}
