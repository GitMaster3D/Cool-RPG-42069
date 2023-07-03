
//Load Event
window.addEventListener('DOMContentLoaded', () => {
    InitAudio();
});

async function InitAudio()
{
    PlaySong("titleSong RPG.mp3")
}

function PlaySong(name = "Path")
{
    /*
    var sound = new Audio("/assets/audio/Music" + name);
    sound.play();
    */
}



// Plays sound witht the given name inside the "Audio" Folder
function PlaySound(name = "Path")
{
    /*
    var sound = new Audio("/assets/audio/Sound/" + name);
    sound.play();
    */
}

