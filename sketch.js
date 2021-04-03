var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here
var feed,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed Simba");
  feed.position(950,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food For Simba");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
    var lastFedRef  = database.ref('FeedTime');
    lastFedRef.on("value",function(data){
       lastFed = data.val();
    })


  if (lastFed>=12){
     fill("black");
     text("Last Feed :"+lastFed + " " + "PM",600,60);
  }else if(lastFed == 0){
     fill("red");
     text("Last Feed : 12 AM",600,60);
  }else {
     fill("blue");
     text("Last Feed :"+lastFed + " "+ " AM",600,60);
  }
  
  
  
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  lastFed=hour();
  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime:lastFed
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
