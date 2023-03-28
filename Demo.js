import * as InputManager from "/InputManager.js";
import * as Engine from "/Engine.js";
import GameObject from './Engine.js';

// This event will be called as soon as this script gets loaded by the html file
window.addEventListener('DOMContentLoaded', () => {
    Init();
});


// Gets executed when the script first gets loaded
// Declare classes that inherit form GameObject here:
function Init()
{
    //Player class that logs "Spawned Player!" when it spawns
    class Player extends GameObject {
        constructor(pos, spritesheetPos) {
        
            //Default GameObject Constructor
          super(pos, spritesheetPos);

          console.log("Spawned Player!");
      
        }
    }
    
    // Spawn classes that get extended by GameObjects
    // first ener Position, second enter the tile of the sprite sheet
    var player = new Player(new Engine.Vector2(4, 4), new Engine.Vector2(22, 16));
    
    // the player Needs to be spawned here so that the engine keeps track of the player
    Engine.SpawnGO(player, "Player"); 
    
    
    // Spawn primitive Gameobject.
    // InstanciateGO creates and spawns it at the same time, but it dosn't work with custom Gameobject variants
    // This tile will be rendered above the Player since it was spawned later
    var randomTile = Engine.InstanciateGO(new Engine.Vector2(5, 4), new Engine.Vector2(20, 17));


    // Listen for "UpInput" (gets called whenever W is pressed)
    // code inside gets executed as soon as it is pressed down
    window.addEventListener("UpInput", () =>
    {
        player.MoveY(1);
    });

    // RightRelease will be triggered whenever the D key is released
    window.addEventListener("RightRelease", () =>
    {
        player.MoveX(1);
    });
}

