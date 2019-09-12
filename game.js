//declare a variable for the game piece
var player;


//declare an array of enemies
var enemies = [];

//Score tracking
var score;

//Background Variable
var map;

//startGame function simply calls the method start on the object gameArea
$(function startGame() 
{
    //Initializes the Game Piece
    //width,height,color,x,y,health
    player = new character(90, 90, "green", 10, 120, 100);

    score = new gameObject("30px", "Consolas", "black", 1000, 40, "text");

    map = new gameObject(1280, 720, "background.png", 0, 0, "image");-

    //creates first enemy
    enemies.push(new character(90, 90, "red", 100, 120, 100));

    //Initializes the Canvas
    gameArea.start();
});

//Start method dynamically creates a <canvas> element and inserts it
//as the first node of the <body> element
var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;  //Count Frames
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        //This runs the updateGameArea function at an interval of every 20 miliseconds (50x a second)
        this.interval = setInterval(updateGameArea, 20);

        //Add an event listener to intercept user keystrokes
        //First listener handles keydown
        window.addEventListener('keydown', function (e) {
          gameArea.keys = (gameArea.keys || []);
          gameArea.keys[e.keyCode] = (e.type == "keydown");
        })

        //Handles keyup
        window.addEventListener('keyup', function (e) {
          gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },

    //Clears the entire canvas so we can redraw new positions
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
    //Function to stop the game when a player dies
    stop : function() {
      map.image.src = "lose.png";
      map.newPos(); 
      map.update();
      clearInterval(this.interval);
  }
}

//This function dynamically creates a gameObject with the specified input as parameters
function gameObject(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.speedX = 0; //Handles Movement
    this.speedY = 0; //Handles Movement
    this.x = x;
    this.y = y;
    
    //Handles the drawing of the game piece
    this.update = function(){
        //Get the context
        ctx = gameArea.context;

        //If handles whether we are updating score or game piece
        if (this.type == "text") {
          ctx.font = this.width + " " + this.height;
          ctx.fillStyle = color;
          ctx.fillText(this.text, this.x, this.y);
        } 

        //Handles redrawing images
        else if (type == "image") {
          ctx.drawImage(this.image, 
          this.x, 
          this.y,
          this.width, this.height);
        }
        
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
  },

    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY; 
  },
  
    //Function to handle collision detection between objects
    this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
      }
    return crash;
  }
}


//This function dynamically creates a character with the specified input as parameters
//player and enemies
function character(width, height, color, x, y, health) 
{
  this.health = health;
  this.width = width;
  this.height = height;
  this.speedX = 0; //Handles Movement
  this.speedY = 0; //Handles Movement
  this.x = x;
  this.y = y;
  this.collideArr = [0,0,0,0];
  
  //Handles the drawing of the game piece
  this.update = function(){
      //Get the context
      ctx = gameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
},

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY; 
},

  //Function to handle collision detection between objects and map borders
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    maxHeight = gameArea.canvas.height;
    maxWidth = gameArea.canvas.width;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = false;

    //Colliding with (player and characters) or walls
    //Stops movement
    this.collideArr = [0,0,0,0];

    if ((mybottom == othertop && myleft < otherright && myright > otherleft) || mybottom >= maxHeight)
    { 
      //this. bottom colliding
      this.collideArr[0] = 1;
      crash = true;
    }
    if ((mytop == otherbottom && myleft < otherright && myright > otherleft) || mytop <= 0)
    {
      //this. top colliding
      this.collideArr[1] = 1;
      crash = true;
    }
    if ((myright == otherleft && mytop < otherbottom && mybottom > othertop) || myright >= maxWidth)
    {
      //this. right colliding
      this.collideArr[2] = 1;
      crash = true;
    }
    if ((myleft == otherright && mytop < otherbottom && mybottom > othertop) || myleft <= 0)
    {
      //this. left colliding
      this.collideArr[3] = 1;
      crash = true;
    }

  return crash;
}


}

//Determines if we are at a specified interval
function everyinterval(n) 
{
  // Mod 1 returns anything after the decimal
  if ((gameArea.frameNo / n) % 1 == 0) 
  {
    return true;
  } 
  else
  {
    return false;
  }
}

function random_num(min, max) {
  random = Math.floor(Math.random() * (+max - +min)) + +min; 

  return random
}

//Handles calling both the clear and update functions 
function updateGameArea() 
{
  var x, y;

  //Handles collision detection for any spawned objects
  checkCollision();

  //Clear the canvas so we can update it
  gameArea.clear();
  //Increase frame
  gameArea.frameNo += 1;

  map.newPos(); 
  map.update();

  //Set the speed of the player
  player.speedX = 0;
  player.speedY = 0; 

  //At every 150th frame we execute this and create a new obstacle
  //50 frames a second = every 3 seconds spawns
  /*
  if (gameArea.frameNo == 1 || everyinterval(150)) 
  {
      x = gameArea.canvas.width;
      minHeight = 20;
      maxHeight = 200;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      minGap = 100;
      maxGap = 200;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      enemies.push(new gameObject(100, height, "green", x, 0));
      enemies.push(new gameObject(100, x - height - gap, "green", x, height + gap));
  }
  */
 
  //Updates position of all obstacles in frame
  for (i = 0; i < enemies.length; i += 1) 
  {
    //enemies[i].x += -3;
    enemies[i].update();
  }

  //Set Values if the player is trying to move the piece
  //Left
  if (gameArea.keys && gameArea.keys[37]) 
  {
    if(player.collideArr[3] == 0)
        player.speedX = -5;
    else 
        player.speedX = 0;
  }
  //Right
  if (gameArea.keys && gameArea.keys[39]) 
  {
    if(player.collideArr[2] == 0)
        player.speedX = 5;
    else 
        player.speedX = 0;
  }
  //Up
  if (gameArea.keys && gameArea.keys[38]) 
  {
    if(player.collideArr[1] == 0)
        player.speedY = -5;
    else 
        player.speedY = 0;
  }
  //Down
  if (gameArea.keys && gameArea.keys[40]) 
  {
    if(player.collideArr[0] == 0)
        player.speedY = 5;
    else 
        player.speedY = 0;
  }


  //Update Score
  //score.text = "SCORE: " + gameArea.frameNo;
  //score.update();

  //Update the positions
  player.newPos();
  player.update();
}

function checkCollision()
{
 for (i = 0; i < enemies.length; i++) 
  {
    if (player.crashWith(enemies[i])) 
    {
      //deal damage
      /*
      map.image.src = "lose.png";
      map.newPos(); 
      map.update();
      gameArea.stop();
      return;
      */
    } 
  }
}