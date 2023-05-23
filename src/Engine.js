
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var sprites = new Image();
sprites.src = "./assets/images/Tileset.png";

const spriteWidth = 32;
const spriteHeight = 32;
var spriteSheetWidth = 64;

var backgroundWidth = 20;
var backgroundHeight = 15;

var currentTiles;

// Extend this to create objects that are visible easily
// The Constructor of the base class must be called with super() when extending in order to make this work
class GameObject
{
    constructor(pos = Vector2, spritesheetPos = Vector2, alpha = 1, scale = new Vector2(1, 1)) 
    {
        this.pos = pos;

        this.scale = scale;
        
        this.spritesheetPos = spritesheetPos;
        this.alive = true;
        this.id = 0;
        this.alpha = alpha;

        this.suppressPosition = false; //Prevents this from being shown in currentTiles

        SpawnGO(this);
    }

    SetID(id)
    {
        this.id = id;
    }

    MoveX(amount)
    {
        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.x += amount;

        if (!this.suppressPosition)
            this.UpdatePosition();
    }

    MoveY(amount)
    {
        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.y -= amount;

        if (!this.suppressPosition)
            this.UpdatePosition();
    }

    Move(amount_Vec = Vector2)
    {
        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.Add(amount_Vec);

        if (!this.suppressPosition)
            this.UpdatePosition();
    }

    InvalidatePosition(lastPosition = Vector2)
    {
        let index = currentTiles[lastPosition.x][lastPosition.y].indexOf(this);
        if (index > -1) 
        { // only splice array when item is found
            // 2nd parameter means remove one item only
            currentTiles[Math.floor(lastPosition.x)][Math.floor(lastPosition.y)].splice(index, 1);
        }
    }
        
    UpdatePosition()
    {
        currentTiles[Math.floor(this.pos.x)][Math.floor(this.pos.y)].push(this);       
    }

    OnDraw()
    {
        if (this.alive)
        {
            drawGO(this);
        }
    }

    Destroy()
    {
        this.alive = false;
        delete gameObjects[this.id];
    }

    SetPos(potition = Vector2)
    {
        this.InvalidatePosition(this.pos);
        this.pos = potition;
        this.UpdatePosition();
    }
}

// Used as Position Data
class Vector2
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    Add(addVector = Vector2)
    {
        this.x += addVector.x;
        this.y += addVector.y;
    }

    Substract(substractVector = Vector2)
    {
        this.x -= substractVector.x;
        this.y -= substractVector.y;
    }

    SubstractClamped(substractVector = Vector2, minX, minY, maxX, maxY)
    {
        this.x = Clamp(this.x - substractVector.x, minX, maxX);
        this.y = Clamp(this.y - substractVector.y, minY, maxY);
    }

    LerpUnclamped(vector = Vector2, t)
    {
        this.x = LerpUnclamped(this.x, vector.x, t);
        this.y = LerpUnclamped(this.y, vector.y, t);
    }

    Lerp(vector = Vector2, t)
    {
        this.x = Lerp(this.x, vector.x, t);
        this.y = Lerp(this.y, vector.y, t);
    }

    Divide(divisionNumber)
    {
        this.x /= divisionNumber;
        this.y /= divisionNumber;
    }

    Multiply(multiplicationNumber)
    {
        this.x *= multiplicationNumber;
        this.y *= multiplicationNumber;
    }

    Normalize()
    {
        var magnitude = this.Magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }
}

// used to Determine in wich area the Background should be drawn
class MapSprites
{
    constructor(startPos = Vector2, endPos = Vector2, sprite = Vector2)
    {
        this.startPos = startPos;
        this.endPos = endPos;
        this.sprite = sprite;
    }
}

var autoName_ = 0;
var standartSprite = new Vector2(23, 16);
var gameObjects = {}; //Keep track of all instanciated Game objects
var pressedKeys = {}; //Keep track of all keys currently pressed

// Call this to create a simple GameObject
function InstanciateGO(pos = Vector2, sprite = Vector2)
{
    var go = new GameObject(pos, sprite);
    gameObjects[++autoName_] = go;
    go.SetID(autoName_);

    return go;
}

// Call this for extensions of Gameobjects and Gameobjects that 
// already have been created
function SpawnGO(GameObject)
{
    var go = GameObject;
    gameObjects[++autoName_] = go;
    go.SetID(autoName_);

    GameObject.UpdatePosition();

    return go;
}

// Area in wich the Background should be drawn
var background = new MapSprites(
    new Vector2(1, 1),
    new Vector2(backgroundWidth, backgroundHeight),
    standartSprite
);


const updateEvent = new Event("OnUpdate");

var deltaTime = 0.01;
var lastUpdate = 0.01;

// Get called each frame
async function OnUpdate()
{
    clear();

    var now = Date.now();
    var dt = (now - lastUpdate) / 1000;
    lastUpdate = now;

    if (dt > 10)
    {
        console.error("Frametime was over 10s!");
    }
    else
    {
        deltaTime = dt;
    }

    //Draw background
    drawBG(background);

    //Draw Game objects
    for (const [key, value] of Object.entries(gameObjects))
    {
        gameObjects[key].OnDraw();
    }
    
    //Reset global alpha from drawing
    context.globalAlpha = 1;
    
    window.dispatchEvent(updateEvent);
}

// Initialize the game Engine
function Init()
{
    // 2D array for all tiles
    currentTiles = new Array(backgroundWidth);
    for (var i = 0; i < backgroundWidth; i++)
    {
        currentTiles[i] = new Array(backgroundHeight);
        for (var j = 0; j < backgroundHeight; j++)
        {
            currentTiles[i][j] = new Array();
        }
    }

    InitInputManager();

    // Listen for Key Down Events
    document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    
    if (pressedKeys[code] == false || pressedKeys[code] == null)
    {
        KeyPress(code);
    }

    pressedKeys[code] = true;

    }, false);

    // Listen for Key Up Events
    document.addEventListener('keyup', (event) => {
        var name = event.key;
        var code = event.code;
        
        if (pressedKeys[code] == true || pressedKeys[code] == null)
        {
            KeyRelease(code);
        }

        pressedKeys[code] = false;
        }, false);


    window.main = () => {
        window.requestAnimationFrame(main);
        
        OnUpdate();
    };
    main();
    extractVector2Arrays("map.json");
}

//Load Event
window.addEventListener('DOMContentLoaded', () => {
    Init();
});


//Draws sprite at Position
function draw(spritesheetPos, spritePos, alpha = 1, scale = new Vector2(1, 1))
{
    context.save();

    context.globalAlpha = alpha;
    context.scale(scale.x, scale.y);



    context.drawImage(sprites, spritesheetPos.x * spriteWidth, spritesheetPos.y * spriteHeight, spriteWidth, spriteHeight, 
        spriteWidth * spritePos.x / scale.x, spriteHeight * spritePos.y / scale.y, spriteWidth, spriteHeight);

    context.restore();
}

//Draws any Gameobject
function drawGO(gameobject)
{
    draw(gameobject.spritesheetPos, gameobject.pos, gameobject.alpha, gameobject.scale);
}

//Draws given Background
function drawBG(mapSprites = MapSprites)
{
    for (let i = 0; i < (mapSprites.endPos.x - mapSprites.startPos.x); i++)
    {
        for (let j = 0; j < (mapSprites.endPos.y - mapSprites.startPos.y); j++)
        {
            draw(mapSprites.sprite, new Vector2(i + 1, j + 1));
        }
    }
}


//Clears sprites
function clear()
{
    context.clearRect(0,0,2500,2500);
}