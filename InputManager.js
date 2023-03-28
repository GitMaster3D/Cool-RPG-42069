import * as Engine from "/Engine.js";
import GameObject from './Engine.js';


let player;

// Use the following for objects that don't get initialized by the engine

//window.addEventListener('DOMContentLoaded', () => {
//    Init();
//});

export function Init()
{
    class Player extends GameObject {
        constructor(pos, spritesheetPos) {
        
            //Default GameObject Constructor
          super(pos, spritesheetPos);

          console.log("Spawned Player!");
      
        }
    }
      
    player = new Player(new Engine.Vector2(4, 4), new Engine.Vector2(22, 16));
    Engine.SpawnGO(player, "Player");
}

export function KeyPress(key)
{
    console.log("Pressed " + key);

    switch (key)
    {
        case "KeyA":
            player.MoveX(-1);
        break;

        case "KeyD":
            player.MoveX(1);
        break;

        case "KeyW":
            player.MoveY(-1);
        break;

        case "KeyS":
            player.MoveY(1);
        break;
    }   
}

export function KeyRelease(key)
{
    console.log("Released " + key);
}
