/* Declare Game Variables Gere */
var player; //Player Variable
var enemies = []; //Array of enemies
var animatedObjects  = []; //Array of animated objects
var staticObjects = []; //Array of static objects
var score; //Tracks the score
var map; //Variable to handle the background image
var backgroundImage; //Image used to tile the background
var pattern; //Pattern for background
//var startCanvas; //Canvas used for the startgame functionality
//var startImage; //Image used in the starting screen canvas above

//Variables for dynamic height and width, commenting to save but 
//Static window size probably best option
//var wWidth = Math.floor(window.innerWidth/8.0) * 8;
//var wHeight = Math.floor(window.innerHeight/8.0) * 8;

//Game Window Dimensions
var canvasHeight = 720;
var canvasWidth = 1280;

/* This function handles starting the game by initializing players, objects and enemies
    As well as setting up the map */
function startGame()
{
    //Create the player here
    player = new object(64, 88, "images/character_up_large.png", 600, 600, 100, 0, "player");

    //Initialize the map
    map = new object(canvasWidth, canvasHeight, "images/background_tile.png", 0, 0, 0, 0, "background");

    //Create fountain objects
    var fountain1 = new object(96, 94, "images/fountain3.png", 0, 0, 0, 0, "fountain");
    var fountain2 = new object(96, 94, "images/fountain3.png", 0, 632, 0, 0, "fountain");
    var fountain3 = new object(96, 94, "images/fountain3.png", 1184, 0, 0, 0, "fountain");
    var fountain4 = new object(96, 94, "images/fountain3.png", 1184, 632, 0, 0, "fountain");
    var fountain5 = new object(96, 94, "images/fountain3.png", 600, 240, 0, 0, "fountain");
    animatedObjects.push(fountain1);
    animatedObjects.push(fountain2);
    animatedObjects.push(fountain3);
    animatedObjects.push(fountain4);
    animatedObjects.push(fountain5);

    //Create tree objects
    var tree1 = new object(64, 64, "images/trees_final.png", 488, 656, 0, 0, "tree");
    var tree2 = new object(64, 64, "images/trees_final.png", 488, 600, 0, 0, "tree");
    var tree3 = new object(64, 64, "images/trees_final.png", 720, 656, 0, 0, "tree");
    var tree4 = new object(64, 64, "images/trees_final.png", 720, 600, 0, 0, "tree");
    var tree5 = new object(64, 64, "images/trees_final.png", 536, 280, 0, 0, "tree");
    var tree6 = new object(64, 64, "images/trees_final.png", 536, 224, 0, 0, "tree");
    var tree7 = new object(64, 64, "images/trees_final.png", 696, 224, 0, 0, "tree");
    var tree8 = new object(64, 64, "images/trees_final.png", 696, 280, 0, 0, "tree");
    animatedObjects.push(tree1);
    animatedObjects.push(tree2);
    animatedObjects.push(tree3);
    animatedObjects.push(tree4);
    animatedObjects.push(tree5);
    animatedObjects.push(tree6);
    animatedObjects.push(tree7);
    animatedObjects.push(tree8);

    //Create static bush objects
    var lrBush1 = new object(64, 32, "images/bush_left_right.png", 0, 96, 0, 0, "static"); //Start top left
    var lrBush2 = new object(64, 32, "images/bush_left_right.png", 48, 96, 0, 0, "static");
    var udBush1 = new object(32, 64, "images/bush_up_down.png", 104, 0, 0, 0, "static");
    var udBush2 = new object(32, 64, "images/bush_up_down.png", 104, 64, 0, 0, "static");
    var lrBush3 = new object(64, 32, "images/bush_left_right.png", 0, 600, 0, 0, "static"); //Start bottom left
    var lrBush4 = new object(64, 32, "images/bush_left_right.png", 48, 600, 0, 0, "static");
    var udBush3 = new object(32, 64, "images/bush_up_down.png", 104, 600, 0, 0, "static");
    var udBush4 = new object(32, 64, "images/bush_up_down.png", 104, 664, 0, 0, "static");
    var lrBush5 = new object(64, 32, "images/bush_left_right.png", 1216, 96, 0, 0, "static"); //Start top right
    var lrBush6 = new object(64, 32, "images/bush_left_right.png", 1168, 96, 0, 0, "static");
    var udBush5 = new object(32, 64, "images/bush_up_down.png", 1144, 0, 0, 0, "static");
    var udBush6 = new object(32, 64, "images/bush_up_down.png", 1144, 64, 0, 0, "static");
    var lrBush7 = new object(64, 32, "images/bush_left_right.png", 1216, 600, 0, 0, "static"); //Start bottom right
    var lrBush8 = new object(64, 32, "images/bush_left_right.png", 1168, 600, 0, 0, "static");
    var udBush7 = new object(32, 64, "images/bush_up_down.png", 1144, 600, 0, 0, "static");
    var udBush8 = new object(32, 64, "images/bush_up_down.png", 1144, 664, 0, 0, "static");
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
    var walkway1 = new object(160, 192, "images/walkway.png", 560, 600, 0, 0, "static");
    var hole = new object(64, 72, "images/hole.png", 960, 600, 0, 0, "static");
    var bones = new object(96, 64, "images/bones.png", 840, 616, 0, 0, "static");
    var headstone1 = new object(48, 64, "images/headstone.png", 240, 640, 0, 0, "static");
    var headstone2 = new object(48, 64, "images/headstone.png", 320, 600, 0, 0, "static");
    var headstone3 = new object(48, 64, "images/headstone.png", 400, 616, 0, 0, "static");
    staticObjects.push(walkway1);
    staticObjects.push(hole);
    staticObjects.push(bones);
    staticObjects.push(headstone1);
    staticObjects.push(headstone2);
    staticObjects.push(headstone3);

    //Create enemies here

    //Initialize Score
    //score = new gameObject("30px", "Consolas", "black", 1000, 40, "text");

    //Load background image
    //May want to load all images here but for now the player image is having no issues with loads
    backgroundImage = new Image();
    backgroundImage.src = "images/background_tile.png";
    backgroundImage.onload = function(){
        gameArea.start();
    };
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
function object(width, height, source, x, y, health, frame, type)
{
    //Initialize with passed in values
    this.width = width;
    this.height = height;
    this.source = source; //Source for the image file
    this.x = x;
    this.y = y;
    this.health = health;
    this.frame = frame; //Only used for animating
    this.type = type; //Refers to the type of object for determining how to process

    //Set some additional parameters for the object
    this.collideArr = [0, 0, 0, 0]; //Handles collision
    
    //This initializes the image for the created object
    //However we initialize background before we start the game
    if(type != 'background')
    {
        this.image = new Image(); //Creates an image object
        this.image.src = source; //Sets the source to point to our image file location
    }

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
            ctx.drawImage(this.image, this.width * this.frame, 0, this.width, this.height, this.x, this.y, this.width, this.height);

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

        //Handle drawing the background
        else if(type == 'background')
        {
            //Set the fill style to be the pattern we established before game launch
            //Then use it to fill the canvas with a rectangle
            ctx.fillStyle = pattern;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        else if(type == 'fountain')
        {
            //Draw the image
            ctx.drawImage(this.image, this.width * this.frame, 0, this.width, this.height, this.x, this.y, this.width, this.height);

            //Update animation frame if needed
            if(everyinterval(4))
            {
                if(this.frame == 2)
                {
                    this.frame = 0;
                }

                else
                {
                    this.frame = this.frame + 1;
                }
            }
        }

        else if(type == 'tree')
        {
            //Draw the tree
            ctx.drawImage(this.image, this.width * this.frame, 0, this.width, this.height, this.x, this.y, this.width, this.height);

            //Update the animation if needed
            if(everyinterval(50))
            {
                if(this.frame == 15)
                {
                    this.frame = 15;
                }

                else
                {
                    this.frame = this.frame + 1;
                }
            }
        }

        else if(type == "static")
        {
            ctx.drawImage(this.image, this.width * this.frame, 0, this.width, this.height, this.x, this.y, this.width, this.height);
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
        //Grab the necessary coordinate data from both objects
        var x = this.x;
        var y = this.y;
        var r = this.x + this.width;
        var b = r + this.height;
        var x2 = otherobj.x;
        var y2 = otherobj.y;
        var r2 = otherobj.x + otherobj.width;
        var b2 = r2 + otherobj.height;

        if(r > x2)
        {
            this.collideArr[2] = 1;
        }

        else if(x <= r2)
        {
            this.collideArr[3] = 1;
        }

        else if (b > y2)
        {
            this.collideArr[1] = 1;
        }

        else if(y <= b2)
        {
            this.collideArr[0] = 1;
        }

        //Run the collision detection
        /*
        if(collides(x, y, r, b, x2, y2, r2, b2))
        {
            return true;
        }

        else
        {
           return false;
        } */
    }),

    //Function to check if an object is at the boundaries of the screen
    (this.checkBounds = function()
    {
        //Grab the coordinates of the player object
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
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

        return;
    });
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
    gameArea.frameNo += 1;

    //Reset the collide array and player speed before we determine what to do
    player.speedX = 0;
    player.speedY = 0;
    player.collideArr = [0, 0, 0, 0];

    //Redraw and update the map
    map.update();

    //Insert collision detection with enemies here

    //Check if the player collided with a boundary
    player.checkBounds();

    //Check if the player collided with
    /* Commenting for now as it doesn't work 
    animatedObjects.forEach(function(x)
    {
        player.checkCollision(x);
    });  */

    //Set Values if the player is trying to move the piece
    if (gameArea.keys && gameArea.keys[37]) //Left
    {
        player.image.src = "images/character_left_large.png";
        if (player.collideArr[3] == 0) player.speedX = -8;
        else player.speedX = 0;
    }

    if (gameArea.keys && gameArea.keys[39]) //Right
    {
        player.image.src = "images/character_right_large.png";
        if (player.collideArr[2] == 0) player.speedX = 8;
        else player.speedX = 0;
    }

    if (gameArea.keys && gameArea.keys[38]) //Up
    {
        player.image.src = "images/character_up_large.png";
        if (player.collideArr[1] == 0) player.speedY = -8;
        else player.speedY = 0;
    }

    if (gameArea.keys && gameArea.keys[40]) //Down
    {
        player.image.src = "images/character_down_large.png";
        if (player.collideArr[0] == 0) player.speedY = 8;
        else player.speedY = 0;
    }

    //Redraw animated objects
    animatedObjects.forEach(function(x){
        x.update();
    });

     //Redraw static objects
     staticObjects.forEach(function(x){
        x.update();
    });

    //Update the positions
    player.newPos();
    player.update();
}

//Basic collision detection function for 2 boxes
//Only works for polygons
function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
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