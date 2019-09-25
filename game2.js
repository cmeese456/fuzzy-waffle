/* Declare Game Variables Gere */
//lol
var player; //Player Variable
var animatedObjects = []; //Array of animated objects
var staticObjects = []; //Array of static objects
var score; //Tracks the score
var map; //Variable to handle the background image
var backgroundImage; //Image used to tile the background
var pattern; //Pattern for background
//var startCanvas; //Canvas used for the startgame functionality
//var startImage; //Image used in the starting screen canvas above
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
const projectileSpeed = 15;
var lastFire = 0;
var enemyArr = [];
//enemyArr.push(enemy1);
//enemyArr.push(enemy2);

//Variables for dynamic height and width, commenting to save but
//Static window size probably best option
//var wWidth = Math.floor(window.innerWidth/8.0) * 8;
//var wHeight = Math.floor(window.innerHeight/8.0) * 8;

//Game Window Dimensions
const canvasHeight = 720;
const canvasWidth = 1280;

let direction;

var enemy_right = new Image();
enemy_right.source = "images/enemy_right.png";

var enemy_left = new Image();
enemy_left.source = "images/enemy_left.png";


/* This function handles starting the game by initializing players, objects and enemies
    As well as setting up the map */
function startGame() {
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
    240,
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
    280,
    0,
    0,
    "tree"
  );
  var tree6 = new object(
    64,
    64,
    "images/trees_final.png",
    536,
    224,
    0,
    0,
    "tree"
  );
  var tree7 = new object(
    64,
    64,
    "images/trees_final.png",
    696,
    224,
    0,
    0,
    "tree"
  );
  var tree8 = new object(
    64,
    64,
    "images/trees_final.png",
    696,
    280,
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

  //Create enemies here
  //var enemy1 = new object(64, 88, "images/enemy_right.png", 48, 240, 100, 0, "enemy", "R");
  //enemyArr.push(enemy1);
  //check top
  //Initialize Score
  //score = new gameObject("30px", "Consolas", "black", 1000, 40, "text");

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
    map.image.src = "lose.png";
    map.newPos();
    map.update();
    clearInterval(this.interval);
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
  if (type != "background") {
    this.image = new Image(); //Creates an image object
    this.image.src = source; //Sets the source to point to our image file location
  }

  //Update function to handle updating the position of objects
  (this.update = function() {
    //Grab the current context
    ctx = gameArea.context;

    //Handle player movement
    if (type == "player") {
      //Stop animating if the player is not moving
      if (this.speedX == 0 && this.speedY == 0) {
        this.frame = 0;
      }
      
      //Draw the player object using drawImage
      //This allows us to dynamically crop the sprite map
      //image, sx, sy, swidth, sheight, x, y, width, height(64,64)
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
      ctx.rect(this.x, this.y, 5, 5);
      ctx.stroke();
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
      if (this.x <= otherobj.x + otherobj.width) {
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
      if (this.x + this.width >= otherobj.x) {
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
      if (this.y <= otherobj.y + otherobj.height) {
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
      if (this.y + this.height >= otherobj.y) {
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

          if(result == true)
          {
              //Remove the bullet and break because this enemy is gone
              projectiles.splice(j, 1);
              break;
          }
      }
  }

  //Randomly spawn enemies if applicable
  if(gameArea.frameNo == 1 || everyinterval(200))
  {
      //Generate a random number to determine if we spawn from the left or right side
      var rand1 = getRandomInt(1, 10);
      
      //5 or less we spawn from the left
      if(rand1 <= 5)
      {
          //Generate a random number to determine initial Y coordinate
          let rand2 = getRandomInt(20, 30);
          rand2 = rand2 * 8 //Ensures we have a multiple of 8
          //Create the enemy
          var newEnemy = new object(64, 88, "images/enemy_right.png", 48, rand2, 100, 0, "enemy", "R");
          enemyArr.push(newEnemy);

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

          console.log("Successfully pushed one right side enemy");
          console.log(enemyArr.length);
      }
  }

  //Set Values if the player is trying to move the piece
  if (gameArea.keys && gameArea.keys[37]) {
    //Left
    direction = 0;
    player.image.src = "images/character_left_large.png";
    if (player.collideArr[3] == 0) player.speedX = -8;
    else player.speedX = 0;
  }

  if (gameArea.keys && gameArea.keys[39]) {
    //Right
    direction = 1;
    player.image.src = "images/character_right_large.png";
    if (player.collideArr[2] == 0) player.speedX = 8;
    else player.speedX = 0;
  }

  if (gameArea.keys && gameArea.keys[38]) {
    //Up
    direction = 2;
    player.image.src = "images/character_up_large.png";
    if (player.collideArr[1] == 0) player.speedY = -8;
    else player.speedY = 0;
  }

  if (gameArea.keys && gameArea.keys[40]) {
    //Down
    direction = 3;
    player.image.src = "images/character_down_large.png";
    if (player.collideArr[0] == 0) player.speedY = 8;
    else player.speedY = 0;
  }

  if (gameArea.keys && gameArea.keys[32] && ((Date.now() - lastFire) > 100)) {
    //space
    console.log("herr");
    switch (direction) {
      case 0:
        projectiles.push(
          new object(
            5,
            5,
            "",
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
        break;
      case 1:
        projectiles.push(
          new object(
            5,
            5,
            "",
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
        break;
      case 2:
        projectiles.push(
          new object(
            5,
            5,
            "",
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
        break;
      case 3:
        projectiles.push(
          new object(
            5,
            5,
            "",
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
   }
}

//Basic collision detection function for 2 boxes
//Only works for polygons
function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

function enemySwitch() {
  if (enemy1.x == 1208) {
    enemy1.image.src = 'images/enemy_left.png';
    enemy1.speedX = -8;
  } else if (enemy1.x == 48) {
    enemy1.image.src = 'images/enemy_right.png';
    enemy1.speedX = 8;
  }

  if (enemy2.x == 1200) {
    enemy1.image.src = 'images/enemy_left.png';
    enemy2.speedX = -8;
  } else if (enemy2.x == 48) {
    enemy1.image.src = 'images/enemy_right.png';
    enemy2.speedX = 8;
  }
}

//Handles enemy speed updates
function enemyAi()
{
    //Check if we need to swap the direction of any enemies
    for(var i=0; i<enemyArr.length; i++)
    {
        //If we are within 40 pixels of the right border
        if(enemyArr[i].x >= (canvasWidth - 16))
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
            enemyArr[i].speedX = 8;
            enemyArr[i].speedY = 0;
        }

        else if(enemyArr[i].data == "L")
        {
            enemyArr[i].speedX = -8;
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


/* Legacy Start Image Code*/
/*$(function(){
    //create a canvas and append it to the HTML body
    startCanvas = document.createElement("canvas");
    startCanvas.id = "startCanvas";
    startCanvas.width = canvasWidth;
    startCanvas.height  = canvasHeight;
    document.body.appendChild(startCanvas);
  
    //logic for switching between background images
    startImage = new Image();
    var count = 0;
    startImage.src = "images/start-screen.png"
    startImage.addEventListener('load',function(){
      startCanvas.getContext("2d").drawImage(startImage,0,0,startCanvas.width,startCanvas.height)
    });
  
    //set its event listener to run startGame function when the user clicks
    $('#startCanvas').on("click", startGame);
}); */

function enemyNewPos(i)
{
    enemyArr[i].x += enemyArr[i].speedX;
    enemyArr[i].y += enemyArr[i].speedY;
}

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
