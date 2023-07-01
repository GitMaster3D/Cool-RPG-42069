var drawBackground = false;

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var sprites = new Image();
sprites.src = "./assets/images/Tileset.png";

const spriteWidth = 32;
const spriteHeight = 32;
var spriteSheetWidth = 64;

var cameraPosition;
var cameraOffset;
var camShakeAmount;
var camShakeIntensity;

var backgroundWidth = 100;
var backgroundHeight = 50;
var backgroundPos;


var pixelRatio = 1;
var globalScale = 2.5;
var width = 800 * globalScale;
var height = 600 * globalScale;
var renderScale = 1; // How high the resolution is

const xCamOffset = 13;
const yCamOffset = 8;

var drawBuffer = {};

var currentTiles;

var items = [];
var needsUpdate = true;

// Extend this to create objects that are visible easily
// The Constructor of the base class must be called with super() when extending in order to make this work
class GameObject
{
    constructor(pos = Vector2, spritesheetPos = Vector2, alpha = 1, scale = new Vector2(1, 1), drawingOrder = 0) 
    {
        this.pos = pos;
        this.walkable = true;

        this.scale = scale;
        
        this.spritesheetPos = spritesheetPos;
        this.alive = true;
        this.id = 0;
        this.alpha = alpha;
        this.drawingOrder = drawingOrder;

        this.suppressPosition = false; //Prevents this from being shown in currentTiles

        this.mapPosition = new Vector2(mapx, mapy);

        this.activeEverywhere = false;
        this.enabled = true;

        SpawnGO(this);
    }

    SetID(id)
    {
        if (!this.enabled) return;

        this.id = id;
        needsUpdate = true;
    }

    MoveX(amount)
    {
        if (!this.enabled) return;

        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.x += amount;

        if (!this.suppressPosition)
            this.UpdatePosition();
    }

    MoveY(amount)
    {
        if (!this.enabled) return;

        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.y -= amount;

        if (!this.suppressPosition)
            this.UpdatePosition();
    }

    Move(amount_Vec = Vector2)
    {
        if (!this.enabled) return;

        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.Add(amount_Vec);

        if (!this.suppressPosition)
            this.UpdatePosition();
    }

    InvalidatePosition(lastPosition = Vector2)
    {
        if (!this.enabled) return;

        let index = currentTiles[lastPosition.x][lastPosition.y].indexOf(this);
        if (index > -1) 
        { // only splice array when item is found
            // 2nd parameter means remove one item only
            currentTiles[Math.floor(lastPosition.x)][Math.floor(lastPosition.y)].splice(index, 1);
        }
    }
        
    UpdatePosition()
    {
        if (!this.enabled) return;

        currentTiles[Math.floor(this.pos.x)][Math.floor(this.pos.y)].push(this);       
    }

    OnDraw()
    {
        if (!this.enabled) return;

        if (this.alive)
        {
            drawBuffer[this.id] = this;
        }
    }

    Destroy()
    {
        if (!this.enabled) return;

        this.alive = false;
        delete gameObjects[this.id];
        needsUpdate = true;

        
        if (!this.suppressPosition && typeof currentTiles[this.pos.x][this.pos.y] !== undefined)
        {
            let index = currentTiles[this.pos.x][this.pos.y].indexOf(this);
            if (index > -1) 
            { // only splice array when item is found
                // 2nd parameter means remove one item only
                currentTiles[Math.floor(this.pos.x)][Math.floor(this.pos.y)].splice(index, 1);
            }
        }
    }

    SetPos(potition = Vector2)
    {
        if (!this.enabled) return;

        this.InvalidatePosition(this.pos);
        this.pos = potition;
        this.UpdatePosition();
    }

    ChangeDrawingOrder(newOrder)
    {
        if (!this.enabled) return;

        this.drawingOrder = newOrder;
        needsUpdate = true;
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

        return this;
    }

    Substract(substractVector = Vector2)
    {
        this.x -= substractVector.x;
        this.y -= substractVector.y;

        return this;
    }

    SubstractClamped(substractVector = Vector2, minX, minY, maxX, maxY)
    {
        this.x = Clamp(this.x - substractVector.x, minX, maxX);
        this.y = Clamp(this.y - substractVector.y, minY, maxY);

        return this;
    }

    LerpUnclamped(vector = Vector2, t)
    {
        this.x = LerpUnclamped(this.x, vector.x, t);
        this.y = LerpUnclamped(this.y, vector.y, t);

        return this;
    }

    Lerp(vector = Vector2, t)
    {
        this.x = Lerp(this.x, vector.x, t);
        this.y = Lerp(this.y, vector.y, t);

        return this;
    }

    Divide(divisionNumber)
    {
        this.x /= divisionNumber;
        this.y /= divisionNumber;

        return this;
    }

    Multiply(multiplicationNumber)
    {
        this.x *= multiplicationNumber;
        this.y *= multiplicationNumber;

        return this;
    }

    Normalize()
    {
        var magnitude = GetVectorMagnitude(this);
        this.x /= magnitude;
        this.y /= magnitude;

        return this;
    }

    Round()
    {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }

    RemoveNaN()
    {
        this.x = this.x | 0;
        this.y = this.y | 0;
        
        return this;
    }

    Equals(vec = Vector2)
    {
        var testX = this.x == vec.x;
        var testY = this.y == vec.y;

        return testX && testY;
    }

    Copy()
    {
        return new Vector2(this.x, this.y);
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

function PositionCheck(object, pos = Vector2)
{
    pos.Round();
    var arr = currentTiles[pos.x][pos.y];

    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i] == object)
        {
            return true;
        }
    }

    return false;
}

var autoName_ = 0;
var standartSprite = new Vector2(20, 19);
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

    drawBufferSorted = false;
    needsUpdate = true;

    return go;
}

function UpdateItems()
{
    if (needsUpdate)
    {
        items = [];
        for (var key in drawBuffer) {
            if (drawBuffer.hasOwnProperty(key)) {
                items.push( drawBuffer[key]  );
            }
        }
      
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return first.drawingOrder - second.drawingOrder;
        });
    
        needsUpdate = false;
    }
}

// Area in wich the Background should be drawn
var background = new MapSprites(
    new Vector2(-backgroundWidth / 2, -backgroundHeight / 2),
    new Vector2(backgroundWidth / 2, backgroundHeight / 2),
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

    // CamShake
    if (camShakeAmount > 0)
    {
        camShakeAmount -= deltaTime;
    }
    else
    {
        camShakeAmount = 0;
    }

    cameraOffset = new Vector2(xCamOffset + camShakeAmount * camShakeIntensity * RandomRange(-1, 1), yCamOffset + camShakeAmount * camShakeIntensity * RandomRange(-1, 1));



    //Draw background
    if (drawBackground)
    {
        drawBG(background);
    }

    // Create Draw Buffer
    for (const [key, value] of Object.entries(gameObjects))
    {
        gameObjects[key].OnDraw();
    }

    UpdateItems();
    // Draw Gameobjects
    for (var i = 0; i < items.length; i++)
    {
        drawGO(items[i]);
    }
    drawBuffer = {};

    //Reset global alpha from drawing
    context.globalAlpha = 1;
    
    window.dispatchEvent(updateEvent);
}

  
function UpdateAspect()
{
    pixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * renderScale;
    canvas.height = height * renderScale;
    
    canvas.style.width = `${width / pixelRatio}px`;
    canvas.style.height = `${height / pixelRatio}px`;

    context.mozImageSmoothingEnabled = false;  // firefox
    context.imageSmoothingEnabled = false;
}

// Initialize the game Engine
function Init()
{
    backgroundPos = new Vector2(-backgroundWidth / 2, -backgroundHeight / 2);
    cameraOffset = new Vector2(xCamOffset, yCamOffset);

    UpdateAspect();
    
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

    cameraPosition = new Vector2(0, 0);

    main();
    extractVector2Arrays("map.json");
}

function ShakeCamera(amount, intensity)
{
    camShakeAmount = amount
    camShakeIntensity = intensity;
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
    context.scale(scale.x * renderScale * globalScale, scale.y * renderScale * globalScale);

    context.drawImage(sprites, spritesheetPos.x * spriteWidth, spritesheetPos.y * spriteHeight, spriteWidth, spriteHeight, 
        spriteWidth * spritePos.x / scale.x, spriteHeight * spritePos.y / scale.y, spriteWidth, spriteHeight);

    context.restore();
}

//Draws any Gameobject
function drawGO(gameobject = GameObject)
{
    if (gameObjects === undefined) return;
    if (!gameobject.enabled) return;

    draw(gameobject.spritesheetPos, new Vector2(gameobject.pos.x - cameraPosition.x + cameraOffset.x, gameobject.pos.y - cameraPosition.y + cameraOffset.y), gameobject.alpha, gameobject.scale);
}

//Draws given Background
function drawBG(mapSprites = MapSprites)
{
    for (let i = 0; i < (mapSprites.endPos.x - mapSprites.startPos.x); i++)
    {
        for (let j = 0; j < (mapSprites.endPos.y - mapSprites.startPos.y); j++)
        {
            draw(mapSprites.sprite, new Vector2(i + 1 + backgroundPos.x, j + 1 + backgroundPos.y));
        }
    }
}


//Clears sprites
function clear()
{
    context.clearRect(0,0,2500,2500);
}