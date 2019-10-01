/* Declare Game Variables Gere */
//lol
var player; //Player Variable
var animatedObjects = []; //Array of animated objects
var staticObjects = []; //Array of static objects
var scoreObject; //Object to draw score
var score = 0; //Tracks the score
var killValue = 100; // Scoring value of a kill
var map; //Variable to handle the background image
var backgroundImage; //Image used to tile the background
var pattern; //Pattern for background
var startCanvas; //Canvas used for the startgame functionality
var startImage; //Image used in the starting screen canvas above
var heartArr = [];
var fireArr = [];
/*var enemy1 = new object(
  64,
  88,
  "images/enemy_left.png",
  48,
  144,
  100,
  0,
  "enemy"
);
var enemy2 = new object(
  64,
  88,
  "images/enemy_left.png",
  1200,
  400,
  100,
  0,
  "enemy"
);*/
let projectiles = [];
const projectileSpeed = 25;
var lastFire = 0;
let bulletDamage = 15;
var enemyArr = [];

let healthBars = [];
const healthBarHeight = 6;
const healthBarWidth = 64;
const healthBarMargin = 9;

let enemyDamage = 10;
let lastHit = 0;
let hit = false;
let invincibleLength = 2000;
let hitBlinkFrequency = 200;
let toughness = 200;
let enemySpeed = 4;
let scorePerSecond = 10;
let difficulty = "Very Easy";
//Variables for dynamic height and width, commenting to save but
//Static window size probably best option
//var wWidth = Math.floor(window.innerWidth/8.0) * 8;
//var wHeight = Math.floor(window.innerHeight/8.0) * 8;

//Game Window Dimensions
const canvasHeight = 720;
const canvasWidth = 1280;

//variable for whether game has ended
var isOver = false;

/* Start Screen Code*/
$(function displayStart() {
  //create a canvas and append it to the HTML body
  startCanvas = document.createElement("canvas");
  startCanvas.id = "startCanvas";
  startCanvas.width = canvasWidth;
  startCanvas.height = canvasHeight;
  document.body.appendChild(startCanvas);

  //logic for switching between background images
  startImage = new Image();
  startImage.src = "images/start-screen.png"
  startImage.addEventListener("load", function () {
      startCanvas.getContext("2d").drawImage(startImage, 0, 0, startCanvas.width, startCanvas.height)
  });

  //set its event listener to run startGame function when the user clicks
  $("#startCanvas").on("click", startGame);
});

/* End Screen Code*/
function displayEnd() {
  //remove game canvas
  $("#gameCanvas").remove();
  //create a canvas and append it to the HTML body
  endCanvas = document.createElement("canvas");
  endCanvas.id = "endCanvas";
  endCanvas.width = canvasWidth;
  endCanvas.height = canvasHeight;
  document.body.appendChild(endCanvas);

  //logic for switching between background images
  endImage = new Image();
  endImage.src = "images/lose-screen.png"
  endImage.addEventListener("load", function () {
      endCanvas.getContext("2d").drawImage(endImage, 0, 0, endCanvas.width, endCanvas.height)
  });

  //set its event listener to run startGame function when the user clicks
  $("#endCanvas").on("click", function () {
      window.location.reload();
  });
}

let direction;

var enemy_right = new Image();
enemy_right.source = "images/enemy_right.png";

var enemy_left = new Image();
enemy_left.source = "images/enemy_left.png";


/* This function handles starting the game by initializing players, objects and enemies
    As well as setting up the map */
function startGame() {
  $("#startCanvas").remove();
  //Create the player here
  player = new object(
    64,
    88,
    "images/character_up_large.png",
    600,
    600,
    100,
    0,
    "player"
  );

  //Initialize the map
  map = new object(
    canvasWidth,
    canvasHeight,
    "images/background_tile.png",
    0,
    0,
    0,
    0,
    "background"
  );

  //Create fountain objects
  var fountain1 = new object(
    96,
    94,
    "images/fountain3.png",
    0,
    0,
    0,
    0,
    "fountain"
  );
  var fountain2 = new object(
    96,
    94,
    "images/fountain3.png",
    0,
    632,
    0,
    0,
    "fountain"
  );
  var fountain3 = new object(
    96,
    94,
    "images/fountain3.png",
    1184,
    0,
    0,
    0,
    "fountain"
  );
  var fountain4 = new object(
    96,
    94,
    "images/fountain3.png",
    1184,
    632,
    0,
    0,
    "fountain"
  );
  var fountain5 = new object(
    96,
    94,
    "images/fountain3.png",
    600,
    280,
    0,
    0,
    "fountain"
  );
  animatedObjects.push(fountain1);
  animatedObjects.push(fountain2);
  animatedObjects.push(fountain3);
  animatedObjects.push(fountain4);
  animatedObjects.push(fountain5);

  //Create tree objects
  var tree1 = new object(
    64,
    64,
    "images/trees_final.png",
    488,
    656,
    0,
    0,
    "tree"
  );
  var tree2 = new object(
    64,
    64,
    "images/trees_final.png",
    488,
    600,
    0,
    0,
    "tree"
  );
  var tree3 = new object(
    64,
    64,
    "images/trees_final.png",
    720,
    656,
    0,
    0,
    "tree"
  );
  var tree4 = new object(
    64,
    64,
    "images/trees_final.png",
    720,
    600,
    0,
    0,
    "tree"
  );
  var tree5 = new object(
    64,
    64,
    "images/trees_final.png",
    536,
    320,
    0,
    0,
    "tree"
  );
  var tree6 = new object(
    64,
    64,
    "images/trees_final.png",
    536,
    264,
    0,
    0,
    "tree"
  );
  var tree7 = new object(
    64,
    64,
    "images/trees_final.png",
    696,
    264,
    0,
    0,
    "tree"
  );
  var tree8 = new object(
    64,
    64,
    "images/trees_final.png",
    696,
    320,
    0,
    0,
    "tree"
  );
  animatedObjects.push(tree1);
  animatedObjects.push(tree2);
  animatedObjects.push(tree3);
  animatedObjects.push(tree4);
  animatedObjects.push(tree5);
  animatedObjects.push(tree6);
  animatedObjects.push(tree7);
  animatedObjects.push(tree8);

  //Create static bush objects
  var lrBush1 = new object(
    64,
    32,
    "images/bush_left_right.png",
    0,
    96,
    0,
    0,
    "static"
  ); //Start top left
  var lrBush2 = new object(
    64,
    32,
    "images/bush_left_right.png",
    48,
    96,
    0,
    0,
    "static"
  );
  var udBush1 = new object(
    32,
    64,
    "images/bush_up_down.png",
    104,
    0,
    0,
    0,
    "static"
  );
  var udBush2 = new object(
    32,
    64,
    "images/bush_up_down.png",
    104,
    64,
    0,
    0,
    "static"
  );
  var lrBush3 = new object(
    64,
    32,
    "images/bush_left_right.png",
    0,
    600,
    0,
    0,
    "static"
  ); //Start bottom left
  var lrBush4 = new object(
    64,
    32,
    "images/bush_left_right.png",
    48,
    600,
    0,
    0,
    "static"
  );
  var udBush3 = new object(
    32,
    64,
    "images/bush_up_down.png",
    104,
    600,
    0,
    0,
    "static"
  );
  var udBush4 = new object(
    32,
    64,
    "images/bush_up_down.png",
    104,
    664,
    0,
    0,
    "static"
  );
  var lrBush5 = new object(
    64,
    32,
    "images/bush_left_right.png",
    1216,
    96,
    0,
    0,
    "static"
  ); //Start top right
  var lrBush6 = new object(
    64,
    32,
    "images/bush_left_right.png",
    1168,
    96,
    0,
    0,
    "static"
  );
  var udBush5 = new object(
    32,
    64,
    "images/bush_up_down.png",
    1144,
    0,
    0,
    0,
    "static"
  );
  var udBush6 = new object(
    32,
    64,
    "images/bush_up_down.png",
    1144,
    64,
    0,
    0,
    "static"
  );
  var lrBush7 = new object(
    64,
    32,
    "images/bush_left_right.png",
    1216,
    600,
    0,
    0,
    "static"
  ); //Start bottom right
  var lrBush8 = new object(
    64,
    32,
    "images/bush_left_right.png",
    1168,
    600,
    0,
    0,
    "static"
  );
  var udBush7 = new object(
    32,
    64,
    "images/bush_up_down.png",
    1144,
    600,
    0,
    0,
    "static"
  );
  var udBush8 = new object(
    32,
    64,
    "images/bush_up_down.png",
    1144,
    664,
    0,
    0,
    "static"
  );
  staticObjects.push(lrBush2);
  staticObjects.push(lrBush1);
  staticObjects.push(udBush1);
  staticObjects.push(udBush2);
  staticObjects.push(lrBush4);
  staticObjects.push(lrBush3);
  staticObjects.push(udBush3);
  staticObjects.push(udBush4);
  staticObjects.push(lrBush5);
  staticObjects.push(lrBush6);
  staticObjects.push(udBush5);
  staticObjects.push(udBush6);
  staticObjects.push(lrBush7);
  staticObjects.push(lrBush8);
  staticObjects.push(udBush7);
  staticObjects.push(udBush8);

  //Create static background objects
  var walkway1 = new object(
    160,
    192,
    "images/walkway.png",
    560,
    600,
    0,
    0,
    "static"
  );
  var hole = new object(64, 72, "images/hole.png", 960, 600, 0, 0, "static");
  var bones = new object(96, 64, "images/bones.png", 840, 616, 0, 0, "static");
  var headstone1 = new object(
    48,
    64,
    "images/headstone.png",
    240,
    640,
    0,
    0,
    "static"
  );
  var headstone2 = new object(
    48,
    64,
    "images/headstone.png",
    320,
    600,
    0,
    0,
    "static"
  );
  var headstone3 = new object(
    48,
    64,
    "images/headstone.png",
    400,
    616,
    0,
    0,
    "static"
  );
  var trapdoor = new object(
    96,
    96,
    "images/trapdoor.png",
    840,
    40,
    0,
    0,
    "static"
  );
  var doghouse = new object(
    72,
    96,
    "images/doghouse.png",
    240,
    32,
    0,
    0,
    "static"
  );
  staticObjects.push(walkway1);
  staticObjects.push(hole);
  staticObjects.push(bones);
  staticObjects.push(headstone1);
  staticObjects.push(headstone2);
  staticObjects.push(headstone3);
  staticObjects.push(trapdoor);
  staticObjects.push(doghouse);

  //Create Score Object
  scoreObject = new object("30px", "Consolas", "black", canvasWidth / 2, 60, 0, 0, "score", "Score: 0");

  //Create difficulty Object
  difficultyObject = new object("30px", "Consolas", "black", 330, 100, 0, 0, "difficulty", "Difficulty: Very Easy");

  //Create hearts
  heart1 = new object(46, 32, "images/hearts.png", 320, 32, 0, 0, "heart");
  heart2 = new object(46, 32, "images/hearts.png", 320+60, 32, 0, 0, "heart");
  heart3 = new object(46, 32, "images/hearts.png", 320+120, 32, 0, 0, "heart");
  heart4 = new object(46, 32, "images/hearts.png", 320+180, 32, 0, 0, "heart");
  heart5 = new object(46, 32, "images/hearts.png", 320+240, 32, 0, 0, "heart");
  heartArr.push(heart1);
  heartArr.push(heart2);
  heartArr.push(heart3);
  heartArr.push(heart4);
  heartArr.push(heart5);

  //fire1 = new object(64, 80, "images/fire_extended.png", 320+240, 200, 0, 0, "fire", 0);
  //fireArr.push(fire1);

  //Load background image
  //May want to load all images here but for now the player image is having no issues with loads
  backgroundImage = new Image();
  backgroundImage.src = "images/background_tile.png";
  backgroundImage.onload = function() {
    gameArea.start();
  };
}

/* gameArea variable which initializes the canvas, sets up and draws the initial background
   and adds listeners for keys
*/
var gameArea = {
  //Create the canvas
  canvas: document.createElement("canvas"),

  //Start method
  start: function() {
    //Initialize the size of the window
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    this.canvas.id = "gameCanvas";
    this.frameNo = 0; //Counts frames
    document.body.insertBefore(this.canvas, document.body.childNodes[0]); //Inserts at front

    //Setup the initial background and fill it
    pattern = this.context.createPattern(backgroundImage, "repeat");
    this.context.fillStyle = pattern;
    this.context.fillRect(map.x, map.y, map.width, map.height);

    //Spawn the player
    player.update();

    //Create static objects here for the map

    //Run the updateGameArea function every 20 miliseconds
    this.interval = setInterval(updateGameArea, 20);

    //Add event listeners for keystrokes
    //Handles Keydown
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
  //Needs modification
  stop: function() {
    //map.image.src = "lose.png";
    //map.newPos();
    //map.update();
    clearInterval(this.interval);
    displayEnd();
  }
};

/* Function to create game objects. Not all fields need to be used for every object */
function object(width, height, source, x, y, health, frame, type, data) {
  //Initialize with passed in values
  this.width = width;
  this.height = height;
  this.source = source; //Source for the image file
  this.x = x;
  this.y = y;
  this.health = health;
  this.frame = frame; //Only used for animating
  this.type = type; //Refers to the type of object for determining how to process

  this.data = data; //contains other data for certain objects

  //Set some additional parameters for the object
  this.collideArr = [0, 0, 0, 0]; //Handles collision

  //This initializes the image for the created object
  //However we initialize background before we start the game
  if (type != "background" && type != "score") {
    this.image = new Image(); //Creates an image object
    this.image.src = source; //Sets the source to point to our image file location
  }

  //Update function to handle updating the position of objects
  (this.update = function() {
    //Grab the current context
    ctx = gameArea.context;

    if(player.health <= 0) {
      isOver = true;
    }

    //Handle player movement
    if (type == "player") {
      //Stop animating if the player is not moving
      if (this.speedX == 0 && this.speedY == 0 && !(gameArea.keys && gameArea.keys[32])) {
        this.frame = 0;
      }
    
      if (! hit || Math.floor(Date.now() / hitBlinkFrequency) % 2) {
          ctx.drawImage(
            this.image,
            this.width * this.frame,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
          );
      }
      //Draw the player object using drawImage
      //This allows us to dynamically crop the sprite map
      //image, sx, sy, swidth, sheight, x, y, width, height(64,64)
      /*
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      */
      
      //Update the frame if we are at a 10th interation
      if (everyinterval(10)) 
      {
        if (this.frame == 3) {
          this.frame = 0;
        } else {
          this.frame = this.frame + 1;
        }
      }
    }
    //Handle drawing the background
    else if (type == "background") {
      //Set the fill style to be the pattern we established before game launch
      //Then use it to fill the canvas with a rectangle
      ctx.fillStyle = pattern;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (type == "fountain") {
      //Draw the image
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      //Update the frame if we are at a 10th interation
      if (everyinterval(4)) {
        if (this.frame == 2) {
          this.frame = 0;
        } else {
          this.frame = this.frame + 1;
        }
      }
    } else if (type == "staticAnimated") {
      //Draw the image
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (type == "projectile") {
      // put projectile image here
      let c = gameArea.canvas;
      let ctx = c.getContext("2d");
      ctx.beginPath();
      //ctx.rect(this.x, this.y, 5, 5);
      //ctx.stroke();
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      switch (this.data["direction"]) {
        case 0:
          this.x -= projectileSpeed;
          break;
        case 1:
          this.x += projectileSpeed;
          break;
        case 2:
          this.y -= projectileSpeed;
          break;
        case 3:
          this.y += projectileSpeed;
          break;
        case 4:
          this.y -= projectileSpeed;
          this.x -= projectileSpeed;
          break;
        case 5: 
          this.y -= projectileSpeed;
          this.x += projectileSpeed;
          break;
        case 6:
          this.y += projectileSpeed;
          this.x += projectileSpeed;
          break;
        case 7:
          this.y += projectileSpeed;
          this.x -= projectileSpeed;
          break;
      }

      for (let i = 0; i < projectiles.length; i++) {
        if (
          this.x > canvasWidth ||
          this.x < 0 ||
          this.y > canvasHeight ||
          this.y < 0
        ) {
          projectiles.splice(i, 1);
          i--; //We have an issue somewhere here. When one bullet is despawned we lose all bullets fired since space was pressed
        }
      }
    } else if (type == "tree") {
      //Draw the tree
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      //Update the animation if needed
      if (everyinterval(50)) {
        if (this.frame == 15) {
          this.frame = 15;
        } else {
          this.frame = this.frame + 1;
        }
      };
    } else if (type == "static") {
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

    } else if(this.type == "score") {
      //Update the score every second
      if(everyinterval(50))
      {
        score = score + scorePerSecond;
      }

      //Draw the score
      this.data = "Score: " + score.toString();
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.source;
      ctx.fillText(this.data, this.x, this.y);
    }

    else if(this.type == "difficulty")
    {
      //Update the difficulty
      if(toughness == 160) {difficulty = "Easy";}
      else if(toughness == 120) {difficulty = "Medium"}
      else if(toughness == 80) {difficulty = "Hard"}
      else if(toughness == 60) {difficulty = "Expert"}
      else if(toughness == 40) {difficulty = "Insanity"}

      //Draw the difficulty
      this.data = "Difficulty: " + difficulty;
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.source;
      ctx.fillText(this.data, this.x, this.y);
    }

    else if(this.type == "heart")
    {
      //Draw the heart
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    else if(this.type == "fire")
    {
      ctx.drawImage(
        this.image,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      if(everyinterval(4))
      {
        if(this.frame <= 6)
        {
          this.frame = this.frame + 1;
        }
      }

      if(this.frame == 7)
      {
        fireArr.splice(this.data, 1);
      }
    }
    else if(this.type == "healthbar") {
  
      ctx.clearRect(this.x, this.y, this.width, this.height);
      if(this.health > 65) {
        ctx.fillStyle = "#39ff14";
      } else if (this.health > 30) {
        ctx.fillStyle = "yellow";
      } else {
        ctx.fillStyle = "red";
      }
      ctx.fillRect(this.x, this.y, this.width * (this.health / 100), this.height);
      
    }
  }),
    //Function to handle updating the position of a given object
    (this.newPos = function() {
      //Update the coordinates based on speed
      this.x += this.speedX;
      this.y += this.speedY;
    }),
    //Function to handle collision detection between an object and other objects
    (this.checkCollision = function(otherobj) {
      //Check Left
      //If the left side of this object is inside or touching another object
      if ((this.x <= otherobj.x + otherobj.width) && (this.x >=  otherobj.x + otherobj.width-8)) {
        //If the other object is within the same verticle plane as this object
        //OR if this object is within the same verticle plane as the other object
        if (
          (otherobj.y >= this.y && otherobj.y <= this.y + this.height) ||
          (this.y >= otherobj.y && this.y <= otherobj.y + otherobj.height)
        ) {
          //Set the cell of the collide array representing left to true
          this.collideArr[3] = 1;
        }
      }

      //Check Right
      //If the right side of this object is inside or touching another object
      if (this.x + this.width >= otherobj.x && (this.x + this.width <= otherobj.x+8)) {
        //If the other object is within the same verticle plane as this object
        //OR if this object is within the same verticle plane as the other object
        if (
          (otherobj.y >= this.y && otherobj.y <= this.y + this.height) ||
          (this.y >= otherobj.y && this.y <= otherobj.y + otherobj.height)
        ) {
          //Set the cell of the collide array representing right to true
          this.collideArr[2] = 1;
        }
      }

      //Check Top
      //If the top side of this object is inside or touching the bottom side of another object
      if ((this.y <= otherobj.y + otherobj.height) && (this.y >= otherobj.y + otherobj.height - 8)) {
        //If the other object is within the same horizontal plane as this object
        //OR if this object is within the same hotizontal plane of the other object
        if (
          (otherobj.x >= this.x && otherobj.x <= this.x + this.width) ||
          (this.x >= otherobj.x && this.x <= otherobj.x + otherobj.width)
        ) {
          //Set the cell of the collide array representing top to true
          this.collideArr[1] = 1;
        }
      }

      //Check Bottom
      if ((this.y + this.height >= otherobj.y) && (this.y + this.height <= otherobj.y + 8)) {
        //If the other object is within the same horizontal plane as this object
        //OR if this object is within the same hotizontal plane of the other object
        if (
          (otherobj.x >= this.x && otherobj.x <= this.x + this.width) ||
          (this.x >= otherobj.x && this.x <= otherobj.x + otherobj.width)
        ) {
          //Set the cell of the collide array representing top to true
          this.collideArr[0] = 1;
        }
      }
    }),
    //Function to check if an object is at the boundaries of the screen
    (this.checkBounds = function() {
      //Grab the coordinates of the player object
      var myleft = this.x;
      var myright = this.x + this.width;
      var mytop = this.y;
      var mybottom = this.y + this.height;
      var maxHeight = gameArea.canvas.height;
      var maxWidth = gameArea.canvas.width;

      //Check collision with all 4 boundaries
      if (mybottom == maxHeight) {
        //Handles Bottom
        this.collideArr[0] = 1;
      }

      if (mytop == 0) {
        //Handles Top
        this.collideArr[1] = 1;
      }

      if (myright == maxWidth) {
        //Handles Right
        this.collideArr[2] = 1;
      }

      if (myleft == 0) {
        //Handles Left
        this.collideArr[3] = 1;
      }

      return;
    }),

    //Function to handle basic bullet and enemy collision
    (this.checkBullet) = function(obj)
    {
        //Setup values
        var x = this.x;
        var y = this.y;
        var r = this.x + this.width;
        var b = this.y + this.height;
        var x2 = obj.x;
        var y2 = obj.y;
        var r2 = obj.x + obj.width;
        var b2 = obj.y + obj.height;

        //Check if we collided
        var result = collides(x, y, r, b, x2, y2, r2, b2);
        return result;
    };
}

//Determines if we are at a specified interval for animation
function everyinterval(n) {
  // Mod 1 returns anything after the decimal
  if ((gameArea.frameNo / n) % 1 == 0) {
    return true;
  } else {
    return false;
  }
}

/*Function to handle updating the game area every frame to "animate" our canvas*/
function updateGameArea() {
  //Clear the game area so we can update it
  gameArea.clear();
  
  //Increment frame rate
  gameArea.frameNo += 1;

  //Reset the collide array and player speed before we determine what to do
  player.speedX = 0;
  player.speedY = 0;
  player.collideArr = [0, 0, 0, 0];

  //Redraw and update the map
  map.update();

  //Check if the player collided with a boundary
  player.checkBounds();

  //Check if any bullets contacted enemies
  for(var i=0; i < enemyArr.length; i++)
  {
      for(var j = 0; j < projectiles.length; j++)
      {
          var currentP = projectiles[j];
          var result = currentP.checkBullet(enemyArr[i]);

          if(result)
          {
              //Remove the bullet and break because this enemy is gone
              projectiles.splice(j, 1);
              enemyArr[i].health -= bulletDamage;
              healthBars[i].health -= bulletDamage;
              if(enemyArr[i].health <= 0) {
                //Spawn a fire on the enemies location
                fireArr.push(new object(64, 80, "images/fire_extended.png", enemyArr[i].x, enemyArr[i].y, 0, 0, "fire", fireArr.length));
                enemyArr.splice(i, 1);
                score += killValue;
                healthBars.splice(i, 1);
              }
              break;
          }
      }
  }

  //Update difficulty every 20 seconds
  if(everyinterval(1000))
  {
    if(toughness > 50)
    {
      toughness = toughness - 20;
      console.log("Toughness is: " + toughness);
    }

    if(enemySpeed < 8)
    {
      enemySpeed = enemySpeed + 1;
    }

    scorePerSecond += 10;
  }

  //Randomly spawn enemies if applicable
  if(gameArea.frameNo == 1 || everyinterval(toughness))
  {
      //Generate a random number to determine if we spawn from the left or right side
      var rand1 = getRandomInt(1, 10);
      
      //5 or less we spawn from the left
      if(rand1 <= 5)
      {
          //Generate a random number to determine initial Y coordinate
          let rand2 = getRandomInt(15, 22);
          rand2 = rand2 * 8 //Ensures we have a multiple of 8
          //Create the enemy
          var newEnemy = new object(64, 88, "images/enemy_right.png", 48, rand2, 100, 0, "enemy", "R");
          enemyArr.push(newEnemy);
          healthBars.push(new object(healthBarWidth, healthBarHeight, "", 48, rand2 - healthBarMargin, 100, 0, "healthbar", ""));

          console.log("Successfully pushed one left side enemy and size of enemyArr is");
          console.log(enemyArr.length);
      }

      else if(rand1 > 5)
      {
          //Generate a random number to determine initial Y coordinate
          var rand3 = getRandomInt(40, 60);
          rand3 = rand3 * 8 //Ensures we have a multiple of 8
          //Create the enemy
          var newEnemy2 = new object(64, 88, "images/enemy_left.png", 1200, rand3, 100, 0, "enemy", "L");
          enemyArr.push(newEnemy2);
          healthBars.push(new object(healthBarWidth, healthBarHeight, "", 1200, rand3 - healthBarMargin, 100, 0, "healthbar", ""));

          console.log("Successfully pushed one right side enemy");
          console.log(enemyArr.length);
      }
  }

  //Handle player collision
  animatedObjects.forEach(function(x){
    player.checkCollision(x);
  }
  )

  //Set Values if the player is trying to move the piece
  if (gameArea.keys && gameArea.keys[37]) {
    //Left
    direction = 0;
    if(!(gameArea.keys && gameArea.keys[32])) {player.image.src = "images/character_left_large.png";}
    if (player.collideArr[3] == 0) player.speedX = -8;
    else player.speedX = 0;
  }

  if (gameArea.keys && gameArea.keys[39]) {
    //Right
    direction = 1;
    if(!(gameArea.keys && gameArea.keys[32])) {player.image.src = "images/character_right_large.png";}
    if (player.collideArr[2] == 0) player.speedX = 8;
    else player.speedX = 0;
  }

  if (gameArea.keys && gameArea.keys[38]) {
    //Up
    direction = 2;
    if(!(gameArea.keys && gameArea.keys[32])) {player.image.src = "images/character_up_large.png";}
    if (player.collideArr[1] == 0) player.speedY = -8;
    else player.speedY = 0;
  }

  if (gameArea.keys && gameArea.keys[40]) {
    //Down
    direction = 3;
    //Don't change the image if the character is firing
    if(!(gameArea.keys && gameArea.keys[32])) {player.image.src = "images/character_down_large.png";}
    if (player.collideArr[0] == 0) player.speedY = 8;
    else player.speedY = 0;
  }

  // up and left
  if (gameArea.keys && gameArea.keys[38] && gameArea.keys[37]) {
    direction = 4;
  }

  // up and right
  if (gameArea.keys && gameArea.keys[38] && gameArea.keys[39]) {
    direction = 5;
  }

  // down and right
  if (gameArea.keys && gameArea.keys[40] && gameArea.keys[39]) {
    direction = 6;
  }
  
  // down and left
  if (gameArea.keys && gameArea.keys[40] && gameArea.keys[37]) {
    direction = 7;
  }

  // depending on direction of player and if they press the space bar, the correct projectile is added
  if (gameArea.keys && gameArea.keys[32] && ((Date.now() - lastFire) > 100)) {
    //space
    switch (direction) {
      case 0:
        projectiles.push(
          new object(
            16,
            16,
            "images/beam_left.png",
            player.x,
            player.y + player.height / 2,
            0,
            0,
            "projectile",
            {
              direction: 0
            }
          )
        );
        lastFire = Date.now();
        player.image.src = "images/sword_left.png";
        break;
      case 1:
        projectiles.push(
          new object(
            16,
            16,
            "images/beam_right.png",
            player.width + player.x,
            player.y + player.height / 2,
            0,
            0,
            "projectile",
            {
              direction: 1
            }
          )
        );
        lastFire = Date.now();
        player.image.src = "images/sword_right.png";
        break;
      case 2:
        projectiles.push(
          new object(
            16,
            16,
            "images/beam_up.png",
            player.x + player.width / 2,
            player.y,
            0,
            0,
            "projectile",
            {
              direction: 2
            }
          )
        );
        lastFire = Date.now();
        player.image.src = "images/sword_up.png";
        break;
      case 3:
        projectiles.push(
          new object(
            16,
            16,
            "images/beam_down.png",
            player.x + player.width / 2,
            player.y + player.height,
            0,
            0,
            "projectile",
            {
              direction: 3
            }
          )
        );
        lastFire = Date.now();
        player.image.src = "images/sword_down.png";
        break;
        //diagonal directions
        case 4:
          projectiles.push(
            new object(
              16,
              16,
              "images/beam_up_left.png",
              player.x,
              player.y,
              0,
              0,
              "projectile",
              {
                direction: 4
              }
            )
          );
          lastFire = Date.now();
          player.image.src = "images/sword_up.png";
          break;
        case 5:
          projectiles.push(
            new object(
              16,
              16,
              "images/beam_up_right.png",
              player.x + player.width,
              player.y,
              0,
              0,
              "projectile",
              {
                direction: 5
              }
            )
          );
          lastFire = Date.now();
          player.image.src = "images/sword_up.png";
          break;
        case 6:
          projectiles.push(
            new object(
              16,
              16,
              "images/beam_down_right.png",
              player.x + player.width,
              player.y + player.height,
              0,
              0,
              "projectile",
              {
                direction: 6
              }
            )
          );
          lastFire = Date.now();
          player.image.src = "images/sword_down.png";
          break;
        case 7:
          projectiles.push(
            new object(
              16,
              16,
              "images/beam_down_left.png",
              player.x,
              player.y + player.height,
              0,
              0,
              "projectile",
              {
                direction: 7
              }
            )
          );
          lastFire = Date.now();
          player.image.src = "images/sword_down.png";
          break;
    }
  }

  //Redraw animated objects
  animatedObjects.forEach(function(x) {
    x.update();
  });

  //Redraw static objects
  staticObjects.forEach(function(x) {
    x.update();
  });

  //Update the positions
  player.newPos();
  player.update();

  //Update projectile positions
  projectiles.forEach(projectile => {
    projectile.update();
  });

   //Enemy stuff here
   enemyAi();
   for(var i = 0; i < enemyArr.length; i++)
   {
     enemyNewPos(i);
     //console.log(enemyArr[i].x);
     enemyUpdate(i);
     healthBars[i].x += enemyArr[i].speedX;

     // if player is hit, they are immune for certain amount of time
     if(player.checkBullet(enemyArr[i]) && ((Date.now() - lastHit) > invincibleLength)) {
       lastHit = Date.now();
        hit = true;

       player.health -= enemyDamage;

       setTimeout(() => {
        hit = false;
       }, invincibleLength)
       
     }
   }

   //update the healthbar locations and size 
   healthBars.forEach( bar => {
     bar.update();
   });

   //Update fire/enemy death animations
   fireArr.forEach(function(x)
   {
     x.update();
   });

   //Update heart images accordingly
   if(player.health == 90) {heart1.frame = 2;}
   else if(player.health == 80) {heart1.frame = 4;}
   else if(player.health == 70) {heart2.frame = 2;}
   else if(player.health == 60) {heart2.frame = 4;}
   else if(player.health == 50) {heart3.frame = 2;}
   else if(player.health == 40) {heart3.frame = 4;}
   else if(player.health == 30) {heart4.frame = 2;}
   else if(player.health == 20) {heart4.frame = 4;}
   else if(player.health == 10) {heart5.frame = 2;}

   //Redraw hearts
   heartArr.forEach(function(x)
   {
     x.update();
   });

   //Redraw score
   scoreObject.update();
   difficultyObject.update();

   //Check if we need to end the game
   if(isOver){
     gameArea.stop();
   }
   
}

//Basic collision detection function for 2 boxes
//Only works for polygons
function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

/**
 * Takes no values and operates on the global array of enemies enemyArr.
 * If enemies are within a small bound of either side of the screen,
 * this function performs the neccessary work of swapping their direction
 * to the opposite side of the screen. In essence enemies walk back in forth
 * with static Y directions
 */
function enemyAi()
{
    //Check if we need to swap the direction of any enemies
    for(var i=0; i<enemyArr.length; i++)
    {
        //If we are within 40 pixels of the right border
        if(enemyArr[i].x >= (canvasWidth - 80))
        {
            //Change image and data value
            enemyArr[i].image.src = 'images/enemy_left.png'
            enemyArr[i].frame = 0;
            enemyArr[i].data = "L";
        }

        else if(enemyArr[i].x <= 16)
        {
            enemyArr[i].image.src = 'images/enemy_right.png'
            enemyArr[i].frame = 0;
            enemyArr[i].data = "R";
        }

        //Update the speed values accordingly
        if(enemyArr[i].data == "R")
        {
            enemyArr[i].speedX = enemySpeed;
            enemyArr[i].speedY = 0;
        }

        else if(enemyArr[i].data == "L")
        {
            enemyArr[i].speedX = -enemySpeed;
            enemyArr[i].speedY = 0;
        }

    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Function that takes an index of the enemyArr corresponding to an enemy
 * And updates that enemies positional values based on their speed
 */
function enemyNewPos(i)
{
    enemyArr[i].x += enemyArr[i].speedX;
    enemyArr[i].y += enemyArr[i].speedY;
  }

/**
 * Function that takes an index of the enemyArr corresponding to an enemy
 * And draws that enemy to the screen + updates their animation frame if applicable
 */
function enemyUpdate(i)
{
    ctx = gameArea.context;
    ctx.drawImage(
        enemyArr[i].image,
        enemyArr[i].width * enemyArr[i].frame,
        0,
        enemyArr[i].width,
        enemyArr[i].height,
        enemyArr[i].x,
        enemyArr[i].y,
        enemyArr[i].width,
        enemyArr[i].height
      );

        
      //Update the frame if we are at a 10th interation
      if (everyinterval(10)) 
      {
        if (enemyArr[i].frame == 3) {
            enemyArr[i].frame = 0;
        } else {
            enemyArr[i].frame = enemyArr[i].frame + 1;
        }
      }
}
