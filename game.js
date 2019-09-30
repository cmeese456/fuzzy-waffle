//declare a variable for the game piece
var player;

//declare an array of enemies\
var enemy1;
var enemies = [];

//Declare an array of objects
var mapObjects = [];
var wall;

//Score tracking
var score;

//Background Variable
var map;
var backgroundImage;
var pattern;

var myCanvas;
var startImage;

var wWidth = Math.floor(window.innerWidth/8.0) * 8;
var wHeight = Math.floor(window.innerHeight/8.0) * 8;

$(function(){
  //create a canvas and append it to the HTML body
  myCanvas = document.createElement("canvas");
  myCanvas.id = "startCanvas";
  myCanvas.width = wWidth;
  myCanvas.height  = wHeight;
  document.body.appendChild(myCanvas);

  //logic for switching between background images
  startImage = new Image();
  var count = 0;
  startImage.src = "images/start-screen.png"
  startImage.addEventListener('load',function(){
    myCanvas.getContext("2d").drawImage(startImage,0,0,myCanvas.width,myCanvas.height)
  });

  //set its event listener
  $('#startCanvas').on("click",startGame);
});

//startGame function simply calls the method start on the object gameAre
function startGame() {
  // Play game music
  

  //Initializes the Game Piece
  //width,height,color,x,y,health
  player = new character(
    16,
    22,
    "images/character_up.png",
    0,
    0,
    100,
    64,
    64,
    0
  );

    var startX = 320;
    var startY = 304;
    for (var i = 0; i < 6; i++)
    {
        console.log(startX + "x");
        console.log(startY + "y");
        var newX = Math.ceil((startX + 50) / 8.0) * 8;
        var newY = Math.ceil((startY + 50) / 8.0) * 8;
        enemies[i] = new enemy(16, 22, "images/character_left.png", newX, newY, 200, 64, 64, 0);
        startX = newX;
        startY = newY;
    }

  //enemy1 = new enemy(16,22,"images/character_left.png",320,304,200,64,64,0);

  score = new gameObject("30px", "Consolas", "black", 1000, 40, "text");

  map = new gameObject(wWidth, wHeight, pattern, 0, 0, "background");

  wall = new gameObject(112, 304, "brown", 104, 104, "wall");

  //Initializes the Canvas + setup the map
  gameArea.start();
}

//Start method dynamically creates a <canvas> element and inserts it
//as the first node of the <body> element
var gameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = wWidth;
    this.canvas.height = wHeight;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0; //Count Frames
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    //Sets up the initial background tile pattern and fills it
    backgroundImage = new Image();
    backgroundImage.src = "images/background_tile.png";
    pattern = this.context.createPattern(backgroundImage, "repeat");
    this.context.fillStyle = pattern;
    this.context.fillRect(this.x, this.y, this.width, this.height);

    //Here is where static objects should be created and drawn

    //This runs the updateGameArea function at an interval of every 20 miliseconds (50x a second)
    this.interval = setInterval(updateGameArea, 20);

    //Add an event listener to intercept user keystrokes
    //First listener handles keydown
    window.addEventListener("keydown", function(e) {
      gameArea.keys = gameArea.keys || [];
      gameArea.keys[e.keyCode] = e.type == "keydown";
      e.preventDefault();
    });

    //Handles keyup
    window.addEventListener("keyup", function(e) {
      gameArea.keys[e.keyCode] = e.type == "keydown";
    });
  },

  //Clears the entire canvas so we can redraw new positions
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  //Function to stop the game when a player dies
  stop: function() {
    map.image.src = "lose.png";
    map.newPos();
    map.update();
    clearInterval(this.interval);
  }
};

//This function dynamically creates a gameObject with the specified input as parameters
function gameObject(width, height, color, x, y, type)
{
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
    this.color = color;
    this.scaledW = width;
    this.scaledH = height;

  //Handles the drawing of the game piece
  (this.update = function() {
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
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    
    }
    
    //Draws the background
    else if (type == "background")
    {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    //Draws rectangular objects
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }),
    (this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    })
}

//This function dynamically creates a character with the specified input as parameters
//player and enemies
function character(
  width,
  height,
  color,
  x,
  y,
  health,
  scaledW,
  scaledH,
  frame
) {
  this.health = health;
  this.width = width;
  this.height = height;
  this.speedX = 0; //Handles Movement
  this.speedY = 0; //Handles Movement
  this.x = x;
  this.y = y;
  this.collideArr = [0, 0, 0, 0];
  this.image = new Image();
  this.image.src = color;
  this.scaledW = scaledW;
  this.scaledH = scaledH;
  this.frame = frame;

  //Handles the drawing of the game piece
  (this.update = function() {
    //Get the context + frame #
    ctx = gameArea.context;

    //Stop animating if the player is not moving
    if (this.speedX == 0 && this.speedY == 0) {
      this.frame = 0;
    }

    //Draw the needed object
    ctx.drawImage(
      this.image,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      64,
      64
    );

    if (everyinterval(10)) {
      if (this.frame == 3) {
        this.frame = 0;
      } else {
        this.frame = this.frame + 1;
      }
    }

    /*
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      */
  }),
    (this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    }),

    //Function to handle collision detection between player and others objects
      (this.checkCollision = function (otherobj)
      {
      var myleft = this.x;
      var myright = this.x + this.scaledW;
      var mytop = this.y;
      var mybottom = this.y + this.scaledH;
      var maxHeight = gameArea.canvas.height;
      var maxWidth = gameArea.canvas.width;
      var otherleft = otherobj.x;
      var otherright = otherobj.x + otherobj.scaledW;
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + otherobj.scaledH;
      var crash = false;
      //Colliding with the passed in object stops movement
      //Stops movement
      //console.log(otherobj.color);
      //console.log(myright == otherleft);
      //console.log(mytop < otherbottom);
      //console.log(mytop);
      //console.log(otherbottom);
      //console.log(mybottom > othertop);
      //console.log(otherobj.color);
      //console.log(myright + "r");
      //console.log(otherleft + "l");
      if (mybottom == othertop && myleft < otherright && myright > otherleft)
      {
        //this. bottom colliding
        this.collideArr[0] = 1;
        crash = true;
      }
      if (mytop == otherbottom && myleft < otherright && myright > otherleft) {
        //this. top colliding
       //console.log("top");
        this.collideArr[1] = 1;
        crash = true;
      }
      if (myright == otherleft && mytop < otherbottom && mybottom > othertop) {
        //this. right colliding
        this.collideArr[2] = 1;
        crash = true;
      }
      if (myleft == otherright && mytop < otherbottom && mybottom > othertop) {
        //this. left colliding
        //console.log("left");
        this.collideArr[3] = 1;
        crash = true;
      }

      //console.log(this.collideArr[0], this.collideArr[1], this.collideArr[2], this.collideArr[3]);

      //Boundary checking
      //console.log(mybottom);
      //console.log(maxHeight);
      if (mybottom == maxHeight) 
      {
        //console.log("bot");
        this.collideArr[0] = 1;
        crash = true;
      }
      //Handle top border
      if (mytop == 0) 
      {
        //console.log("top");
        this.collideArr[1] = 1;
        crash = true;
      }
      //Handle Right Border
      if (myright == maxWidth) 
      {
        this.collideArr[2] = 1;
        crash = true;
      }
      //Handle Left Border
      if (myleft == 0) 
      {
        this.collideArr[3] = 1;
        crash = true;
      }

      return crash;
    })
  }


  function enemy(width,height,color,x,y,health,scaledW,scaledH,frame) {
    this.health = health;
    this.width = width;
    this.height = height;
    this.speedX = 0; //Handles Movement
    this.speedY = 0; //Handles Movement
    this.x = x;
    this.y = y;
    this.collideArr = [0, 0, 0, 0];
    this.image = new Image();
    this.image.src = color;
    this.scaledW = scaledW;
    this.scaledH = scaledH;
    this.frame = frame;
  
    //Handles the drawing of the game piece
    (this.update = function() {
      //Get the context + frame #
      ctx = gameArea.context;
  
      //Stop animating if the player is not moving
      if (this.speedX == 0 && this.speedY == 0) {
        this.frame = 0;
      }
  
      //Draw the needed object
      ctx.drawImage(this.image,this.width * this.frame,0,this.width,this.height,this.x,this.y,64,64);
  
      if (everyinterval(10)) {
        if (this.frame == 3) {
          this.frame = 0;
        } else {
          this.frame = this.frame + 1;
        }
      }
  
      /*
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        */
    }),
      (this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
      }),
  
      //Function to handle collision detection between player and others objects
      (this.checkCollision = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + this.scaledW;
        var mytop = this.y;
        var mybottom = this.y + this.scaledH;
        var maxHeight = gameArea.canvas.height;
        var maxWidth = gameArea.canvas.width;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;
        var crash = false;
  
        //Colliding with the passed in object stops movement
        //Stops movement
        if (mybottom == othertop && myleft < otherright && myright > otherleft) {
          //this. bottom colliding
          this.collideArr[0] = 1;
          crash = true;
        }
        if (mytop == otherbottom && myleft < otherright && myright > otherleft) {
          //this. top colliding
          this.collideArr[1] = 1;
          crash = true;
        }
        if (myright == otherleft && mytop < otherbottom && mybottom > othertop) {
          //this. right colliding
          this.collideArr[2] = 1;
          crash = true;
        }
        if (myleft == otherright && mytop < otherbottom && mybottom > othertop) {
          //this. left colliding
          this.collideArr[3] = 1;
          crash = true;
        }
  
        //Boundary checking
        if (mybottom == maxHeight) 
        {
          //console.log("bot");
          this.collideArr[0] = 1;
          crash = true;
        }
        //Handle top border
        if (mytop == 0) 
        {
          //console.log("top");
          this.collideArr[1] = 1;
          crash = true;
        }
        //Handle Right Border
        if (myright == maxWidth) 
        {
          this.collideArr[2] = 1;
          crash = true;
        }
        //Handle Left Border
        if (myleft == 0) 
        {
          this.collideArr[3] = 1;
          crash = true;
        }
  
        return crash;
      })
    }

//Determines if we are at a specified interval
function everyinterval(n) {
  // Mod 1 returns anything after the decimal
  if ((gameArea.frameNo / n) % 1 == 0) {
    return true;
  } else {
    return false;
  }
}

function random_num(min, max) {
  random = Math.floor(Math.random() * (+max - +min)) + +min;

  return random;
}

//Handles calling both the clear and update functions
function updateGameArea() {
  var x, y;

  //Handles collision detection for any spawned objects
    //console.log(player.checkCollision(enemy1) + " " + player.checkCollision(wall));
    /*
    if (!player.checkCollision(enemy1) && !player.checkCollision(wall))
    {
        player.collideArr = [0, 0, 0, 0];
    }
    */
  
  //Clear the canvas so we can update it
  gameArea.clear();
  //Increase frame
  gameArea.frameNo += 1;

  //enemy1.update();
    for (var i = 0; i < 6; i++)
    {
        enemies[i].update();
        if(!player.checkCollision(enemies[i]))
        {
            player.collideArr = [0, 0, 0, 0];
        }
    }
  wall.update();
  //map.newPos();
  //map.update();

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

  //Set Values if the player is trying to move the piece
  //Left
  if (gameArea.keys && gameArea.keys[37]) {
    player.image.src = "images/character_left.png";
    if (player.collideArr[3] == 0) player.speedX = -8;
    else player.speedX = 0;
  }
  //Right
  if (gameArea.keys && gameArea.keys[39]) {
    player.image.src = "images/character_right.png";
    if (player.collideArr[2] == 0) player.speedX = 8;
    else player.speedX = 0;
  }
  //Up
  if (gameArea.keys && gameArea.keys[38]) {
    player.image.src = "images/character_up.png";
    if (player.collideArr[1] == 0) player.speedY = -8;
    else player.speedY = 0;
  }
  //Down
  if (gameArea.keys && gameArea.keys[40]) {
    player.image.src = "images/character_down.png";
    if (player.collideArr[0] == 0) player.speedY = 8;
    else player.speedY = 0;
  }

  //Update Score
  //score.text = "SCORE: " + gameArea.frameNo;
  //score.update();

  //Update the positions
  player.newPos();
  player.update();
}


// Handles Game Music
function updateGameMusic(){
  var musicFile;


  

}
