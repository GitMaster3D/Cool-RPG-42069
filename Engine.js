import * as InputManager from "/InputManager.js";

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var sprites = new Image();
sprites.src = "images/Tileset.png";

var spriteWidth = 32;
var spriteHeight = 32;

var backgroundWidth = 100;
var backgroundHeight = 30;

// Extend this to create objects that are visible easily
// The Constructor of the base class must be called with super() when extending in order to make this work
export default class GameObject
{
    constructor(pos, spritesheetPos) 
    {
        this.pos = pos;
        this.spritesheetPos = spritesheetPos;
        this.alive = true;
    }

    MoveX(amount)
    {
        this.pos.x += amount;
    }

    MoveY(amount)
    {
        this.pos.y += amount;
    }

    Move(amount_Vec)
    {
        this.pox.x += amount_Vec.x;
        this.pos.y += amount_Vec.y;
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
    }
}

// Used as Position Data
export class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
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


var standartSprite = new Vector2(23, 16);
var gameObjects = new Map(); //Keep track of all instanciated Game objects
var pressedKeys = {}; //Keep track of all keys currently pressed

// Call this to create a simple GameObject
export function InstanciateGO(pos, sprite, name)
{
    var go = new GameObject(pos, sprite);
    gameObjects.set(name, go);
    return go;
}

// Call this for extensions of Gameobjects and Gameobjects that 
// already have been created
export function SpawnGO(GameObject, name)
{
    var go = GameObject;
    gameObjects.set(name, go);
    return go;
}

// Area in wich the Background should be drawn
var background = new MapSprites(
    new Vector2(1, 1),
    new Vector2(backgroundWidth, backgroundHeight),
    standartSprite
);

// Get called each frame
async function OnUpdate()
{
    clear();

    drawBG(background);
    gameObjects.forEach((k, v) => k.OnDraw());
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
export function draw(spritesheetPos, spritePos)
{
    context.drawImage(sprites, spritesheetPos.x * spriteWidth, spritesheetPos.y * spriteHeight, spriteWidth, spriteHeight, spriteWidth * spritePos.x, spriteHeight * spritePos.y, spriteWidth, spriteHeight)
}

//Draws any Gameobject
export function drawGO(gameobject)
{
    draw(gameobject.spritesheetPos, gameobject.pos);
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
    context.clearRect(0,0,25000,25000);
}
