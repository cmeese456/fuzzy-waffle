//declare a variable for the game piece
var myGamePiece;


//declare an array of obstacles
var myObstacles = [];

//Score tracking
var myScore;

//Background Variable
var myBackground;

//startGame function simply calls the method start on the object myGameArea
$(function startGame() {

    //Initializes the Game Piece
    myGamePiece = new component(90, 90, "red", 10, 120);

    myScore = new component("30px", "Consolas", "black", 1000, 40, "text");

    myBackground = new component(1280, 720, "background.png", 0, 0, "image");

    //Initializes the Canvas
    myGameArea.start();
});

//Start method dynamically creates a <canvas> element and inserts it
//as the first node of the <body> element
var myGameArea = {
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
          myGameArea.keys = (myGameArea.keys || []);
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })

        //Handles keyup
        window.addEventListener('keyup', function (e) {
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },

    //Clears the entire canvas so we can redraw new positions
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
    //Function to stop the game when a player dies
    stop : function() {
      myBackground.image.src = "lose.png";
      myBackground.newPos(); 
      myBackground.update();
      clearInterval(this.interval);
  }
}

//This function dynamically creates a component with the specified input as parameters
function component(width, height, color, x, y, type) {
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
        ctx = myGameArea.context;

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

//Determines if we are at a specified interval
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;} // Mod 1 returns anything after the decimal
  return false;
}

function random_num(min, max) {
  random = Math.floor(Math.random() * (+max - +min)) + +min; 

  return random
}

//Handles calling both the clear and update functions 
function updateGameArea() {
  var x, y;

  //Handles collision detection for any spawned objects
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myBackground.image.src = "lose.png";
      myBackground.newPos(); 
      myBackground.update();
      myGameArea.stop();
      return;
    } 
  }

  //Clear the canvas so we can update it
  myGameArea.clear();
  myGameArea.frameNo += 1;

  myBackground.newPos(); 
  myBackground.update();

  //Set the speed of the player
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0; 

  //At every 150th frame we execute this and create a new obstacle
  //50 frames a second = every 3 seconds spawns
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
      x = myGameArea.canvas.width;
      minHeight = 20;
      maxHeight = 200;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      minGap = 100;
      maxGap = 200;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      myObstacles.push(new component(100, height, "green", x, 0));
      myObstacles.push(new component(100, x - height - gap, "green", x, height + gap));
    }

  //Updates position of all obstacles in frame
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -3;
    myObstacles[i].update();
  }

  //Set Values if the player is trying to move the piece
  if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -5; }//Left
  if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 5; }//Right
  if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -5; }//Up
  if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 5; }//Down

  //Update Score
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();

  //Update the positions
  myGamePiece.newPos();
  myGamePiece.update();
}