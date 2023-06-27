
function InitInputManager()
{
    console.log("Initiated Input manager"); 
}


const upInputEvent = new Event("UpInput");
const downInputEvent = new Event("DownInput");
const rightInputEvent = new Event("RightInput");
const leftInputEvent = new Event("LeftInput");
const spaceInputEvent = new Event("SpaceInput");
const tinputEvent = new Event("TInput");
const jinpputEvent = new Event("JInput");
const ninpputEvent = new Event("NInput");

const upReleaseEvent = new Event("UpRelease");
const downReleaseEvent = new Event("DownRelease");
const rightReleaseEvent = new Event("RightRelease");
const leftReleaseEvent = new Event("LeftRelease");
const spaceReleaseEvent = new Event("SpaceRelease");
const tReleaseEvent = new Event("TRelease");
const jReleaseEvent = new Event("JRelease");
const nReleaseEvent = new Event("NRelease");

function KeyPress(key = "")
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

        case "KeyT":
            window.dispatchEvent(tinputEvent);
        break;

        case "Space":
            window.dispatchEvent(spaceInputEvent);
        break;

        case "KeyJ":
            window.dispatchEvent(jinputEvent);
        break;

        case "KeyN":
            window.dispatchEvent(nInputEvent);
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

        case "KeyT":
            window.dispatchEvent(tReleaseEvent);
        break;

        case "Space":
            window.dispatchEvent(spaceReleaseEvent);
        break;

        case "KeyJ":
            window.dispatchEvent(jReleaseEvent);
        break;

        case "KeyN":
            window.dispatchEvent(nReleaseEvent);
        break;
    }   
}
