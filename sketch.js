var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var scoreBoard,heading;


var life =3;

var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2;


  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  heading=createElement("h1");
  scoreBoard=createElement("h1");

  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
heading.html("life: "+life);
heading.style('color:red');
heading.position(150,20);

scoreBoard.html("score: "+score);
scoreBoard.style('color:red');
scoreBoard.position(width-200,20);

  if(gameState===1){
    gun.y=mouseY  
    if(frameCount%80===0){
      drawBlueBubble();
      
    }
    if(frameCount%100===0){
      drawRedBubble();

    }
    if(keyDown("space")){
      shootBullets();

    }
    if(blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
      //redBubbleGroup.destroyEach();
     // blueBubbleGroup.destroyEach();
      //bulletGroup.destroyEach();
      //redBubbleGroup.setVelocity=0;
      
    }
    if(redBubbleGroup.collide(backBoard)){
      handleGameover(redBubbleGroup);
      redBubbleGroup.destroyEach();
      //blueBubbleGroup.destroyEach();
     // bulletGroup.destroyEach();

    }
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
     //blueBubbleGroup.destroyEach();
      //bulletGroup.destroyEach();
    }
    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
      //redBubbleGroup.destroyEach();
      //bulletGroup.destroyEach();
    }
    drawSprites();
  }
     
}
function drawBlueBubble(){
  bluebubble=createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale=0.1;
  bluebubble.velocityX=-8;
  bluebubble.lifeTime=400;
  blueBubbleGroup.add(bluebubble);

}
function drawRedBubble(){
  redbubble=createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale=0.1;
  redbubble.velocityX=-8;
  redbubble.lifeTime=400;
  redBubbleGroup.add(bluebubble);
  
}
function shootBullets(){
  bullet=createSprite(150,width/2,50,20);
  bullet.y=gun.y-20;
  bullet.lifeTime=400;
  bullet.addImage(bulletImg);
  bullet.scale=0.12;
 bullet.velocityX=7;
 bulletGroup.add(bullet);

}
function handleBubbleCollision(bubbleGroup){
  if(life>0){
    score=score+1;

  }
  blast=createSprite(bullet.x+60,bullet.y,50,50);
  blast.addImage(blastImg);
  blast.scale=0.5;
  blast.life=20;
  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
  
}
function handleGameover(){
  swal({
      title:'Game Over',
      text: "Oops you lost the game....!!!",
      text: "Your Score Is:"+score,
      imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize:"100x100",
      confirmButtonText:"Thanks For Playing"
  });
}

