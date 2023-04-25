
//Load Event
window.addEventListener('DOMContentLoaded', () => {
    Init();
});

function Init()
{

}

// Plays sound witht the given name inside the "Audio" Folder
function PlaySound(name = "Path")
{
    var sound = new Audio("/Audio/Sound/" + name);
    sound.play();
}