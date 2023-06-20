// Klassen die mit "extends Gameobject" enden, also eine Erweiterung von Gameobject sind
// können von der Engine automatisch Gerendert werden und enthalten
// nützliche Funktionen wie z.b. MoveX, moveY, Destroy und SetPos
class Player extends GameObject {
    constructor(pos, spritesheetPos) {
    
      // Super ruft den Konstruktor der klasse auf, die
      // erweitert wird, hier Gameobject.
      // Dies wird hier benötigt, damit es richtig funktioniert
      super(pos, spritesheetPos);

    }
}

window.addEventListener("DOMContentLoaded", () =>
{
    // Jedes Gameobject benötigt einen Vector2 (Punkt auf einem Koordinatensystem) mit 
    // Einer x und einer Y koordinate als Position, und einen 2. der angiebt, welcher
    // Sprite aus dem Spritesheet gerendert werden soll
    //
    // Um eine Klasse die Gameobject erweitert oder ein Gameobject loszuwerden
    // kann man .Destroy() verwenden. hier also player.Destroy();
    var player = new Player(new Vector2(4, 7), new Vector2(37, 31));
    player.drawingOrder = 100;

    // mit .alpha kann die Transparenz verändert Werden
    player.alpha = 0.8;

    // mit .scale kann die größe von gameobjects verändert werden
    player.scale.x = 1;
    player.scale.y = 1;

    cameraOffset = new Vector2(12, 7);
    window.addEventListener("OnUpdate", () =>
    {
        cameraPosition = new Vector2(
            -Lerp(cameraPosition.x, player.pos.x, 0.5),
            -Lerp(cameraPosition.y, player.pos.y, 0.5)
        );
        
    });

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

    window.addEventListener("RightInput",()=>
    {
        player.MoveX(1); //Bewege den Spieler um 1 nach rechts
    });

    window.addEventListener("LeftInput",()=>
    {
        player.MoveX(-1); //Bewege den Spieler um 1 nach links
    });

    window.addEventListener("DownInput",()=>
    {
        player.MoveY(-1); //Bewege den Spieler um 1 nach unten
    })
});