var database;
var dog, happyDog, hungryDog;
var foodS, foodStock;

function preload(){
  hungryDog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(600, 600);

  database = firebase.database();
  
  dog = createSprite(430, 300, 10, 10);
  dog.addImage(hungryDog);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  textSize(20);
  fill("white");
  text("Note: Press Up arrow key to feed Drago the milk", 85, 20);
  text("Food Remaining: " + foodS, 215, 580);
  noFill();

  if (keyIsDown(UP_ARROW) && foodS !== 0){
    dog.addImage(happyDog);
  }else{
    dog.addImage(hungryDog);
  }

}

function keyPressed() {
  if (keyCode === UP_ARROW && foodS !== 0){
    writeStock(foodS);
    foodS = foodS - 0;
  }
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  }else {
    x -= 1;
  }
  database.ref('/').update({
    Food: x
  });

}
