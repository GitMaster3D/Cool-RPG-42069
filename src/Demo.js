
// Wird ausgeführe sobals diese Datei in HTML geladen wurde
window.addEventListener('DOMContentLoaded', () => {
    InitDemo();
});



// Wird als Pseudo void main verwendet
function InitDemo()
{
    
    // Hier wird ein weiteres Gameobject erzeugt.
    // Da dieses nach dem Spieler erzeugt wurde, wird es vor dem Spieler Angezeigt.
    var randomTile = new GameObject(new Vector2(5, 4), new Vector2(20, 17));
    var NPTest = new GameObject(new Vector2(4,2),new Vector2(0,2));
    var NPX = 4;
    var NPY = 2;


    

    window.addEventListener("SpaceInput",()=>
    {
        if (player.x == 4 && player.y ==2){
            var TesstDialog = new GameObject(new Vector2(7,8), new Vector2(0,8))
        }
    });

    window.addEventListener("MInput",()=>
    {
        if(player.pos.x == NPX && player.pos.y == NPY)
        {
            Dialog();
        }
          
            
    });

var conver = []  ;
    conver.push("Nul");
    conver.push("Ganz schön windig heute");
    conver.push("Ich bin halt anders");
    conver.push("Ich bin einfach schon 2 Jahre alt! Kannst du das glauben?");
    conver.push("Danke dass du heute hier bist!");
    conver.push("Sonniger Tag heute");
    conver.push("Was, es ist schon so spät?!");
    conver.push("Beeile dich! Sonst bringt dich das Monster auch um!“");
    conver.push("Let‘s goooooooo!!! Ich cringo");
    conver.push("Ich mag dieses Wetter");
    conver.push("Hey :)");
    conver.push("Bonjour");
    conver.push("Auf welcher Schule warst du?");
    conver.push("Du lässt mich nicht im Stich oder?");
    conver.push("Beeil dich es wird bald dunkel!");
    conver.push("Bitte helfen Sie mir ich bin in Gefahr!");
    conver.push("Ich habe heute Geburtstag! ");
    
    function Dialog()
    {
        var zufallsx = Math.floor((Math.random() * conver.length) + 1);
        alert(conver[zufallsx]);
        
    }

    
    

    console.log(currentTiles[5][4]); //Giebt alle gameObjects an der Position 5 | 4 aus

    
    
    // Hier wird nach dem Eventr SpaceRelease gelauscht, was vom
    // input manager versendet wird, sobald die leertaste losgelassen wurde
    window.addEventListener("SpaceRelease", () =>
    {
        // Mit Playsound können audio dateien aus 
        // dem "Audio" ordner abgespielt werden
        // übergeben wird der name der Datei inklusive Dateiformat
        PlaySound("heheheha_.mp3");
    });


    // Events sind Methoden, die auf einem objekt aufgerufen werden. Jedes event hat einen String als "namen".
    var myEvent = new Event("MyEvent");

    // Mit dispatch Event kann eine Event versendet werden, 
    // Hier wird ein Event auf dem Fenster gesendet
    window.dispatchEvent(myEvent);

    // Hier wird mit dem Particle system ein Partikeleffekt abgespielt.
    // Hierzu muss:
    //  -Die Particles.json datei im "Particles" ordner liegen, in dieser datei befinden
    //  sich auch die Einstellungen für den Partikeleffekt
    //
    // -Der name Der Particles.json datei übergeben werden 
    
    PlayParticles("TestParticles2.json");
}

