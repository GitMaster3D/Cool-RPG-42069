// Klassen die mit "extends Gameobject" enden, also eine Erweiterung von Gameobject sind
// können von der Engine automatisch Gerendert werden und enthalten
// nützliche Funktionen wie z.b. MoveX, moveY, Destroy und SetPos
class Player extends GameObject {
    constructor(pos, spritesheetPos, health, damage) {
    
      // Super ruft den Konstruktor der klasse auf, die
      // erweitert wird, hier Gameobject.
      // Dies wird hier benötigt, damit es richtig funktioniert
      super(pos, spritesheetPos);
        this.health = health;
        this.damage = damage;
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
    var player = new Player(new Vector2(4, 7), new Vector2(37, 31),100,10);


    player.drawingOrder = 100;

    var monster1 = new Monster(new Vector2(2,2),new Vector2(9,8),1,30,2);
    var monster2 = new Monster(new Vector2(2,3),new Vector2(9,9),1,30,2);
    monster1.drawingOrder = 111;
    monster2.drawingOrder = 112;
    //var monster3 = new Monster(new Vector2(3,4),new Vector2(11,10),1,30,2);
    const Monsters = [monster1,monster2];
    //monster3.drawingOrder = 101;
    
    

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

    //Alle Monster estellen und schließend in das Array "Monsters[]" setzten:
        


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

    window.addEventListener("ArrowUpInput",()=>{
        
        for(x=0; x < Monsters.length; x=x+1){
            
            if((player.pos.x)==(Monsters[x].pos.x)&&(player.pos.y-1)==(Monsters[x].pos.y)){
                if((Monsters[x].health - player.damage) <= 0){
                    Monsters[x].Destroy();
                }else{
                    Monsters[x].health = (Monsters[x].health-player.damage);
                }
            }
        }
    });
    
    window.addEventListener("ArrowDownInput",()=>{
        for(x=0; x < Monsters.length; x=x+1){
            if((player.pos.x)==(Monsters[x].pos.x)&&(player.pos.y+1)==(Monsters[x].pos.y)){
                if((Monsters[x].health - player.damage) <= 0){
                    Monsters[x].Destroy();
                }else{
                    Monsters[x].health = (Monsters[x].health-player.damage);
                }
            }
        }
    });
    window.addEventListener("ArrowRightInput",()=>{
        for(x=0; x < Monsters.length; x=x+1){
            if((player.pos.x+1)==(Monsters[x].pos.x)&&(player.pos.y)==(Monsters[x].pos.y)){
                if((Monsters[x].health - player.damage) <= 0){
                    Monsters[x].Destroy();
                }else{
                    Monsters[x].health = (Monsters[x].health-player.damage);
                }
            }
        }
    });
    window.addEventListener("ArrowLeftInput",()=>{
        for(x=0; x < Monsters.length; x=x+1){
            if((player.pos.x-1)==(Monsters[x].pos.x)&&(player.pos.y)==(Monsters[x].pos.y)){
                if((Monsters[x].health - player.damage) <= 0){
                    Monsters[x].Destroy();
                }else{
                    Monsters[x].health = (Monsters[x].health-player.damage);
                }
            }
        }
    });


});