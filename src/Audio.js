
//Load Event
window.addEventListener('DOMContentLoaded', () => {
    InitAudio();
});

function InitAudio()
{
    PlaySong("titleSong RPG.mp3")
}

function PlaySong(name = "Path")
{
    var sound = new Audio("/Audio/Music/" + name);
    sound.play();
}



// Plays sound witht the given name inside the "Audio" Folder
function PlaySound(name = "Path")
{
    var sound = new Audio("/Audio/Sound/" + name);
    sound.play();
}

