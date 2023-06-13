
// Wird ausgeführe sobals diese Datei in HTML geladen wurde
window.addEventListener('DOMContentLoaded', () => {
    InitDemo();
});

// Klassen die mit "extends Gameobject" enden, also eine Erweiterung von Gameobject sind
// können von der Engine automatisch Gerendert werden und enthalten
// nützliche Funktionen wie z.b. MoveX, moveY, Destroy und SetPos
class Player extends GameObject {
    constructor(pos, spritesheetPos) {
    
      // Super ruft den Konstruktor der klasse auf, die
      // erweitert wird, hier Gameobject.
      // Dies wird hier benötigt, damit es richtig funktioniert
      super(pos, spritesheetPos);

      console.log("Spawned Player!");
  
    }
}

// Wird als Pseudo void main verwendet
function InitDemo()
{      
    // Jedes Gameobject benötigt einen Vector2 (Punkt auf einem Koordinatensystem) mit 
    // Einer x und einer Y koordinate als Position, und einen 2. der angiebt, welcher
    // Sprite aus dem Spritesheet gerendert werden soll
    //
    // Um eine Klasse die Gameobject erweitert oder ein Gameobject loszuwerden
    // kann man .Destroy() verwenden. hier also player.Destroy();
     var player = new Player(new Vector2(4, 4), new Vector2(22, 16));

    // mit .alpha kann die Transparenz verändert Werden
    player.alpha = 0.8;

    // mit .scale kann die größe von gameobjects verändert werden
    player.scale.x = 1;
    player.scale.y = 1;

    console.log(player.scale);

    
    
    // Hier wird ein weiteres Gameobject erzeugt.
    // Da dieses nach dem Spieler erzeugt wurde, wird es vor dem Spieler Angezeigt.
 var randomTile = new GameObject(new Vector2(5, 4), new Vector2(20, 17));

    
    
    // mit addeventlistener kann man nach events lauschen. 
    // Sobald ein Event mit dem "Namen" UpInput auf dem Fenster versendet
    // wird, wird der code in den geschweiften klammern ausgeführt.
    // Die Input Events sind im Input Manager einlesbar.
    // Eventlistener sollten möglichst früh hinzugefügt werden, um
    // unerwartetem verhalten vorzubeugen (hier schlechtes Beispiel)
    //
    // außerdem giebt es momentan noch "OnUpdate", was jeden frame ausgeführt wird, sowie 
    // 'DOMContentLoaded' von javascript, welches ausgeführt wird sobald die .js datei
    // Geladen wurde
    window.addEventListener("UpInput", () =>
    {
        player.MoveY(1); //Bewege den Spieler um 1 nach oben
    });
    window.addEventListener("DownInput", () =>
    {
        player.MoveY(-1); //Bewege den Spieler um 1 nach oben
    });
    window.addEventListener("RightInput", () =>
    {
        player.MoveX(1); //Bewege den Spieler um 1 nach oben
    });
    window.addEventListener("LeftInput", () =>
    {
        player.MoveX(-1); //Bewege den Spieler um 1 nach oben
    });
    

    console.log(currentTiles[5][4]); //Giebt alle gameObjects an der Position 5 | 4 aus


    // Wenn ein Gameobject manuell bewegt werden soll (ohne Move methode)
    // Muss die Position invalidiert und danach geupdatet werden
    // (Damit currentTiles funktioniert)
    player.InvalidatePosition(player.pos);
    player.pos.y -= 1;
    player.UpdatePosition();
    
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


