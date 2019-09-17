/* Declare Game Variables Gere */
var player; //Player Variable
var enemies = []; //Array of enemies
var staticObjects  = []; //Array of static objects
var score; //Tracks the score
var map; //Variable to handle the background image
var startCanvas; //Canvas used for the startgame functionality
var startImage; //Image used in the starting screen canvas above
var backgroundImage; //Image used to tile the background
var pattern; //Pattern for background

//Variables for dynamic height and width, commenting to save but 
//Static window size probably best option
var wWidth = Math.floor(window.innerWidth/8.0) * 8;
var wHeight = Math.floor(window.innerHeight/8.0) * 8;

var canvasHeight = 720;
var canvasWidth = 1280;

/* This function handles the start game screen and runs on initial page load*/
$(function(){
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
});


/* This function handles starting the game by initializing players, objects and enemies
    As well as setting up the map */
function startGame()
{
    //Create the player here
    player = new object(16, 22, "images/character_up.png", 0, 0, 100, 64, 64, 0, "player");

    //Initialize the map
    map = new object(canvasWidth, canvasHeight, "images/background_tile.png", 0, 0, 0, 0, 0, 0, "background");

    //Create enemies here

    //Initialize Score
    //score = new gameObject("30px", "Consolas", "black", 1000, 40, "text");

    //Start the game
    gameArea.start();
}

/* gameArea variable which initializes the canvas, sets up and draws the initial background
   and adds listeners for keys
*/
var gameArea = 
{
    //Create the canvas
    canvas: document.createElement("canvas"),

    //Start method
    start: function() 
    {
        //Initialize the size of the window
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext('2d');
        this.frameNo = 0; //Counts frames
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); //Inserts at front

        //Setup the initial background and fill it
        pattern = this.context.createPattern(map.image, "repeat");
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
function object(width, height, source, x, y, health, scaledW, scaledH, frame, type)
{
    //Initialize with passed in values
    this.width = width;
    this.height = height;
    this.source = source; //Source for the image file
    this.x = x;
    this.y = y;
    this.health = health;
    this.scaledW = scaledW; //Plan to remove this and scale objects outside JS
    this.scaledH = scaledH; //Plan to remove this and scale objects outside JS
    this.frame = frame; //Only used for animating
    this.type = type; //Refers to the type of object for determining how to process

    //Set some additional parameters for the object
    this.collideArr = [0, 0, 0, 0]; //Handles collision
    
    this.image = new Image(); //Creates an image object
    this.image.src = source; //Sets the source to point to our image file location

    //Update function to handle updating the position of objects
    (this.update = function() 
    {
        //Grab the current context
        ctx = gameArea.context;

        //Handle player movement
        if(type == 'player')
        {
            //Stop animating if the player is not moving
            if(this.speedX == 0 && this.speedY == 0)
            {
                this.frame = 0;
            }

            //Draw the player object using drawImage
            //This allows us to dynamically crop the sprite map
            //image, sx, sy, swidth, sheight, x, y, width, height(64,64)
            ctx.drawImage(this.image, this.width * this.frame, 0, this.width, this.height, this.x, this.y, this.scaledW, this.scaledH);

            //Update the frame if we are at a 10th interation
            if(everyinterval(10))
            {
                if(this.frame == 3)
                {
                    this.frame = 0;
                }

                else
                {
                    this.frame = this.frame + 1;
                }
            }
        }

        else if(type == 'background')
        {
            ctx.fillStyle = source;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }),

    //Function to handle updating the position of a given object
    (this.newPos = function()
    {
        //Update the coordinates based on speed
        this.x += this.speedX;
        this.y += this.speedY;
    }),

    //Function to handle collision detection between an object and other objects
    (this.checkCollision = function(otherobj)
    {
        //Inset collision stuff here from Hunter
    }),

    //Function to check if an object is at the boundaries of the screen
    (this.checkBounds = function()
    {
        //Grab the coordinates of the player object
        var myleft = this.x;
        var myright = this.x + this.scaledW;
        var mytop = this.y;
        var mybottom = this.y + this.scaledH;
        var maxHeight = gameArea.canvas.height;
        var maxWidth = gameArea.canvas.width;

        //Check collision with all 4 boundaries
        if (mybottom == maxHeight) //Handles Bottom
        {
            this.collideArr[0] = 1;
        }

        if (mytop  == 0) //Handles Top
        {
            this.collideArr[1] = 1;
        }

        if(myright == maxWidth) //Handles Right
        {
            this.collideArr[2] = 1;
        }

        if(myleft == 0) //Handles Left
        {
            this.collideArr[3] = 1;
        }
    })
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
function updateGameArea()
{
    //Clear the game area so we can update it
    gameArea.clear();

    //Increment frame rate
    gameArea.frameNo += 1

    //Reset the collide array and player speed before we determine what to do
    player.speedX = 0;
    player.speedY = 0;
    player.collideArr = [0, 0, 0, 0]

    //Redraw and update the map
    map.update();

    //Insert collision detection with enemies here

    //Check if the player collided with a boundary
    player.checkBounds();

    //Set Values if the player is trying to move the piece
    if (gameArea.keys && gameArea.keys[37]) //Left
    {
        player.image.src = "images/character_left.png";
        if (player.collideArr[3] == 0) player.speedX = -8;
        else player.speedX = 0;
    }

    if (gameArea.keys && gameArea.keys[39]) //Right
    {
        player.image.src = "images/character_right.png";
        if (player.collideArr[2] == 0) player.speedX = 8;
        else player.speedX = 0;
    }

    if (gameArea.keys && gameArea.keys[38]) //Up
    {
        player.image.src = "images/character_up.png";
        if (player.collideArr[1] == 0) player.speedY = -8;
        else player.speedY = 0;
    }

    if (gameArea.keys && gameArea.keys[40]) //Down
    {
        player.image.src = "images/character_down.png";
        if (player.collideArr[0] == 0) player.speedY = 8;
        else player.speedY = 0;
    }

    //Update the positions
    player.newPos();
    player.update();
}