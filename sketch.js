const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
let ground,bunny;
var rope,fruit,fruit_con,rope2,rope3,fruit_con2,fruit_con3;
var button,mute_btn;
var blink,eat;
var sad;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

let blower;

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  bunny_img = loadImage('Rabbit-01.png');
  blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;

  bk_song = loadSound("sound1.mp3");
  cut_sound = loadSound("rope_cut.mp3");
  sad_sound = loadSound("sad.wav");
  eating_sound = loadSound("eating_sound.mp3");
  air = loadSound("air.wav");

}

function setup() 
{

  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200,690,600,20);

  rope = new Rope(8, {x:40 , y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  var fruitOption = {
    density : 0.001
  }

  fruit = Bodies.circle(300,300,20,fruitOption);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);

  bunny = createSprite(250,620,100,100);
  bunny.scale = 0.2;
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);

  button1 = createImg('cut_btn.png');
  button1.position(20,30);
  button1.size(50,50);
  button1.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);


  imageMode(CENTER);
  textSize(50);

  blower = createImg('balloon.png');
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airblow);

  bk_song.play();
  bk_song.setVolume(0.5)

  mute_btn = createImg("mute.png");
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,500,700);
  Engine.update(engine);

  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  
  if(fruit!==null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
 
  if(collide(fruit,bunny)){
    bunny.changeAnimation("eating");
    eating_sound.play();
  }

  
  if(fruit!= null && fruit.position.y>=650){
    bunny.changeAnimation("crying");
    bk_song.stop();
    sad_sound.play();
    fruit = null;
  }
   


  drawSprites();
}

function drop(){
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2(){
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
}

function drop3(){
  cut_sound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
}

function collide(body,sprite){
  if(body!== null){
    var d  = dist(body.position.x, body.position.y,sprite.position.x, sprite.position.y);
    if(d <= 80){
      
      World.remove(world, fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}


function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x: 0.01, y:0});
  air.play();
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
    console.log("Trying to stop");
  }
  else{
    bk_song.play();
  }
}
