// This is a reusable method to grab html elements
var f = function (x){
return document.querySelector(x)
}

//for debugging
l = console.log;



// velocity x and y
vx = 10
vy = 10


var cv =  f("canvas")
var c =cv.getContext("2d")
cw = cv.width = 400
ch = cv.height = 340

camx = cw /2
camy = ch /2

function Sprite(x,y,w,h,col){
this.x = x
this.y = y
this.w = w
this.h =h
this.col =col


}



//related to the map

let area
var path
var ts = 32

var data
var world; 
var mapW

var layer =[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,7,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,7,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


]


//images initialization
var tree = new Image()
var flame = new Image();
var grass = new Image();
var home = new Image();
var house = new Image();
var fence = new Image();
var mur = new Image();
var carpet = new Image();
var playerImg = new Image();
playerImg.src="allsprite.png"



//spritesheet info 
var flameFW =64 , flameFH = 64 , flamecol = 0 , flamerow = 0 ;

var player = new Sprite(40,100,32,32)

player.fw = 51; player.fh = 71; 
 player.col = 2; player.row = 6


//this allows me to enter and leave house
var doors = []


var door = new Sprite(500,56,20,20,"transparent")
doors.push(door)



//fetch json map
 var url ="level1.json"

function loadMap(){

grass.src="grass03.png"
home.src="house.png"
house.src="home.png"
carpet.src="sand3.png"
mur.src="brick4.png"
fence.src="wall2.png"
flame.src="CampFire.png"
tree.src="trunck.png"

//initialize the main map 
init() // init is in levelLoader.js
}


//  drawMap starts here

function drawMap(){
// detect which area before drawing

if(area =="Village"){

for(var col = 0; col < world.length; col++){
for(var row = 0; row < world[col].length; row++){
tileX = row*32; 
tileY = col*32


if(world[col][row] == 0){
c.drawImage(grass,row*ts,col*ts,ts,ts)
}

if(world[col][row] == 1){
c.drawImage(fence,row*ts,col*ts,ts,ts)
}

if(world[col][row] == 1){
//tilecollider test
c.strokeStyle ="transparent"
c.strokeRect(tileX,tileY,32,32)

}



}

}

} // end of level1

var tile // represents any single tile from the map
// level2
if(area =="Room"){
for(var col = 0; col < world.length; col++){
for(var row = 0; row < world[col].length; row++){
tile = world[col][row]
if(tile == 3){
c.fillStyle = "black"
c.fillRect(row*ts,col*ts,ts,ts)

//c.drawImage(yard,row*ts,col*ts,ts,ts)

}

if(tile == 5){

c.drawImage(carpet,row*ts,col*ts,ts,ts)
}



if(tile == 6){
c.drawImage(mur,row*ts,col*ts,ts,ts)
}

if(tile == 0){
c.fillStyle = "darkred"
c.fillRect(row*ts,col*ts,ts,ts)
}


}


// flame animation

flamecol++
if(flamecol >= 5){
flamecol = 0
}

/* that is just an example
you would better use an array
instead of doing the following */

c.drawImage(flame,flamecol*flameFW,flamerow*flameFH,64,64,130,330,32,24)
c.drawImage(flame,flamecol*flameFW,flamerow*flameFH,64,64,460,330,32,24)
c.drawImage(flame,flamecol*flameFW,flamerow*flameFH,64,64,215,330,32,24)

}

} // end of level2


//draw the houses of the village
if(area == "Village"){
for(var co = 0; co < layer.length; co++){
for(var ro = 0; ro < layer[co].length; ro++){
if(layer[co][ro] == 7){
c.shadowColor = "black";
 c.shadowBlur = 2;
 c.shadowOffsetX = 5;
 c.shadowOffsetWidth = 5; 
 c.shadowOffsetHeight = 5; 
c.drawImage(home,ro*ts,co*ts,100,50)
}

if(layer[co][ro] == 3){
c.drawImage(house,ro*ts,co*ts,100,50)

}


}

}
}

}  // end of drawMap


// that method below attaches to the doors and switches  map 
function swichy(){
if(area =="Village"){
path = "level2.json"
player.x = mapW/2-20
player.y = mapH/2 +90

}

if(area =="Room"){
path = "level1.json"
player.x = 488
player.y = 107

}

changeL() // that method is in levelLoaders.js file
}


 

function drawLevel(){
c.fillStyle ="red"
c.font="italic 28px monospace"
c.strokeStyle ="gold"
c.lineWidth= 0.7
c.fillText(area,player.x-40, player.y-40)
c.strokeText(area,player.x-40, player.y-40)
}





function drawPlayer(){
c.shadowColor = "red";
 c.shadowBlur = 0;
 c.shadowOffsetX = 0;
 c.shadowOffsetWidth = 0; 

c.drawImage(playerImg,player.col*player.fw,player.row*player.fh,player.fw,player.fh,player.x,player.y,player.w,player.h)


}


var secondDor = false
function drawDoor(){
if(area =="Room"){  //area = room
secondDor = true

if(secondDor){
var door2 = new Sprite(293,349,48,28,"transparent")
doors = [door2] // use only the second door
}

}else{ // area = village 
doors = [door] // use only the first door

}


for(let dor of doors){
c.fillStyle = dor.col
c.fillRect(dor.x,dor.y,dor.w,dor.h)

}
}


function isCollide(a,b){
if(a.x+a.w >= b.x &&
a.x <= b.x+b.w &&
a.y+a.h >= b.y &&
a.y <= b.y+b.h
){
return true
}

}



// movement controllers start here
var rightPress = f("#right")
var leftPress = f("#left")
var downPress = f("#down")
var upPress = f("#up")

let rightB = false
let leftB = false
let downB = false
let upB = false

rightPress.ontouchstart = function(){
rightB = true

}

rightPress.ontouchend = function(){
rightB = false
}


leftPress.ontouchstart = function(){
leftB = true
}

leftPress.ontouchend = function(){
leftB = false
}


downPress.ontouchstart = function(){
downB = true
}

downPress.ontouchend = function(){
downB = false
}


upPress.ontouchstart = function(){
upB = true
}

upPress.ontouchend = function(){
upB = false
}

// movement controllers end here



var then = performance.now()
var now

function loop(){
requestAnimationFrame(loop)
now = performance.now()
 dT = now - then
var fps = 10

if(dT > 1000 / fps){
c.clearRect(0,0,cw,ch)

then = now


c.save()
c.translate( camx-player.x,camy-player.y)
c.imageSmoothingEnabled = false;
c.imageSmoothingQuality="high"



drawMap()
drawPlayer()
drawDoor()
drawLevel()


if(rightB){
right()
}

if(leftB){
left()
}

if(downB){
down()
}

if(upB){
up()
}


for(dor of doors){
if(isCollide(player,dor)){
swichy()


}
}


}

oldX = player.x // tracking player X position
oldY = player.y // tracking player Y position

c.restore()

}


loop()




// collision between player , the game world  and the houses
function tileCollision(){
if(area =="Village"){
for(var col = 0; col < world.length; col++){
for(var row = 0; row < world[col].length; row++){
tileX = row*32; 
tileY = col*32
tile = world[col][row]
if(player.x+player.w >=tileX &&
player.x <= tileX+24 &&
player.y+player.h >= tileY &&
player.y <= tileY+24 && tile == 1){
player.x = oldX
player.y = oldY

}

tile = layer[col][row]
if(player.x+player.w >=tileX &&
player.x <= tileX+100 &&
player.y+player.h >= tileY &&
player.y <= tileY+30 && tile !=0){
player.x = oldX
player.y = oldY

}



}
}

} //end of village


if(area =="Room"){
for(var col = 0; col < world.length; col++){
for(var row = 0; row < world[col].length; row++){
tileX = row*32; 
tileY = col*32
tile = world[col][row]
if(player.x+player.w >=tileX &&
player.x <= tileX+32 &&
player.y+player.h >= tileY &&
player.y <= tileY+32 && tile == 6){
player.x = oldX
player.y = oldY

}
}
}

} //end of room


}





function left(){
//check for collision between player and the game world


player.x-= vx
player.row = 5

player.col++

if(player.col >= 3){
player.col = 0
}


tileCollision()

}

function right(){

player.x+= vx

player.row = 6

player.col++

if(player.col >= 3){
player.col = 0
}


tileCollision()
}

function up(){
player.y-= vy

player.row = 7

player.col++

if(player.col >= 3){
player.col = 0
}


tileCollision()
}

function down(){

player.y+= vy

player.row = 4

player.col++

if(player.col >= 3){
player.col = 0
}


tileCollision()
}

