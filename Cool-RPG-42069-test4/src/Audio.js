
//Load Event
window.addEventListener('DOMContentLoaded', () => {
    InitAudio();
});

function InitAudio()
{

}

// Plays sound witht the given name inside the "Audio" Folder
function PlaySound(name = "Path")
{
    var sound = new Audio("/Audio/Sound/" + name);
    sound.play();
}