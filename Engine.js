import * as InputManager from "/InputManager.js";

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var sprites = new Image();
sprites.src = "images/Tileset.png";

var spriteWidth = 32;
var spriteHeight = 32;

var backgroundWidth = 20;
var backgroundHeight = 15;

// Extend this to create objects that are visible easily
// The Constructor of the base class must be called with super() when extending in order to make this work
export default class GameObject
{
    constructor(pos, spritesheetPos, alpha = 1) 
    {
        this.pos = pos;
        this.spritesheetPos = spritesheetPos;
        this.alive = true;
        this.id = 0;
        this.alpha = alpha;

        SpawnGO(this);
    }

    SetID(id)
    {
        this.id = id;
    }

    MoveX(amount)
    {
        this.pos.x += amount;
    }

    MoveY(amount)
    {
        this.pos.y -= amount;
    }

    Move(amount_Vec)
    {
        this.pox.x += amount_Vec.x;
        this.pos.y -= amount_Vec.y;
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

    SetPos(potition)
    {
        this.pos = potition;
    }

}


// Plays sound witht the given name inside the "Audio" Folder
export function PlaySound(name)
{
    var sound = new Audio("/Audio/" + name);
    sound.play();
}

// Used as Position Data
export class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Add(addVector)
    {
        this.x += addVector.x;
        this.y += addVector.y;
    }

    Substract(substractVector)
    {
        this.x -= substractVector.x;
        this.y -= substractVector.y;
    }

    SubstractClamped(substractVector, minX, minY, maxX, maxY)
    {
        this.x = Clamp(this.x - substractVector.x, minX, maxX);
        this.y = Clamp(this.y - substractVector.y, minY, maxY);
    }

    LerpUnclamped(vector, t)
    {
        this.x = LerpUnclamped(this.x, vector.x, t);
        this.y = LerpUnclamped(this.y, vector.y, t);
    }

    Lerp(vector, t)
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

export function GetVectorsqrMagnitude(vector)
{
    return vector.x * vector.x + vector.y * vector.y;
}

export function GetVectorMagnitude(vector)
{
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function NormalizeVector(vector)
{
    var magnitude = GetVectorMagnitude(vector);
    return new Vector2(vector.x / magnitude, vector.y / magnitude);
}

// used to Determine in wich area the Background should be drawn
export class MapSprites
{
    constructor(startPos, endPos, sprite)
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
function InstanciateGO(pos, sprite)
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

    return go;
}

// Area in wich the Background should be drawn
var background = new MapSprites(
    new Vector2(1, 1),
    new Vector2(backgroundWidth, backgroundHeight),
    standartSprite
);


const updateEvent = new Event("OnUpdate");

export var deltaTime = 0.01;
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
    
    window.dispatchEvent(updateEvent);
}

// Initialize the game Engine
function Init()
{
    InputManager.Init();

    // Listen for Key Down Events
    document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    
    if (pressedKeys[code] == false || pressedKeys[code] == null)
    {
        InputManager.KeyPress(code);
    }

    pressedKeys[code] = true;

    }, false);

    // Listen for Key Up Events
    document.addEventListener('keyup', (event) => {
        var name = event.key;
        var code = event.code;
        
        if (pressedKeys[code] == true || pressedKeys[code] == null)
        {
            InputManager.KeyRelease(code);
        }

        pressedKeys[code] = false;
        }, false);


    window.main = () => {
        window.requestAnimationFrame(main);
        
        OnUpdate();
    };
    main();

}

//Start Engine
sprites.onload = function() {
    Init();
};

//Draws sprite at Position
export function draw(spritesheetPos, spritePos, alpha = 1)
{
    context.globalAlpha = alpha;
    context.drawImage(sprites, spritesheetPos.x * spriteWidth, spritesheetPos.y * spriteHeight, spriteWidth, spriteHeight, spriteWidth * spritePos.x, spriteHeight * spritePos.y, spriteWidth, spriteHeight);
}

//Draws any Gameobject
export function drawGO(gameobject)
{
    draw(gameobject.spritesheetPos, gameobject.pos, gameobject.alpha);
}

//Draws given Background
function drawBG(mapSprites)
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
export function clear()
{
    context.clearRect(0,0,2500,2500);
}

export function LerpUnclamped (a, b, t)
{
    return a + t * ( b - a );
}

export function Lerp (a, b, t)
{
    return Clamp(a + t * ( b - a ), b, );
}

export function Clamp(a, min, max)
{
    if (a < min)
    {
        return min;
    }
    if (a > max)
    {
        return max;
    }

    return a;
}