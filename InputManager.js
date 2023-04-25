//import * as Engine from "/Engine.js";
//import GameObject from './Engine.js';


function InitInputManager()
{
    console.log("Initiated Input manager"); 
}


const upInputEvent = new Event("UpInput");
const downInputEvent = new Event("DownInput");
const rightInputEvent = new Event("RightInput");
const leftInputEvent = new Event("LeftInput");
const spaceInputEvent = new Event("SpaceInput");

const upReleaseEvent = new Event("UpRelease");
const downReleaseEvent = new Event("DownRelease");
const rightReleaseEvent = new Event("RightRelease");
const leftReleaseEvent = new Event("LeftRelease");
const spaceReleaseEvent = new Event("SpaceRelease");

function KeyPress(key)
{
    switch (key)
    {
        case "KeyA":
            window.dispatchEvent(leftInputEvent);
        break;

        case "KeyD":
            window.dispatchEvent(rightInputEvent);
        break;

        case "KeyW":
            window.dispatchEvent(upInputEvent);
        break;

        case "KeyS":
            window.dispatchEvent(downInputEvent);
        break;

        case "Space":
            window.dispatchEvent(spaceInputEvent);
        break;
    }   
}


function KeyRelease(key)
{
    switch (key)
    {
        case "KeyA":
            window.dispatchEvent(leftReleaseEvent);
        break;

        case "KeyD":
            window.dispatchEvent(rightReleaseEvent);
        break;

        case "KeyW":
            window.dispatchEvent(upReleaseEvent);
        break;

        case "KeyS":
            window.dispatchEvent(downReleaseEvent);
        break;

        case "Space":
            window.dispatchEvent(spaceReleaseEvent);
        break;
    }   
}
