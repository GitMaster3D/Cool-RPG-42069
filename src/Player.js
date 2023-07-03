var player;
var moveDirection;
var moveXTimer;
var moveYTimer;
const moveTime = 0.15;
const camFollowSpeed = 15;

// Klassen die mit "extends Gameobject" enden, also eine Erweiterung von Gameobject sind
// können von der Engine automatisch Gerendert werden und enthalten
// nützliche Funktionen wie z.b. MoveX, moveY, Destroy und SetPos
class Player extends GameObject {
    constructor(pos, spritesheetPos, health) {
    
        // Super ruft den Konstruktor der klasse auf, die
        // erweitert wird, hier Gameobject.
        // Dies wird hier benötigt, damit es richtig funktioniert
        super(pos, spritesheetPos);


        this.health = 24;
        this.maxHealth = 24;
        this.dead = false;
        this.lookDirection = new Vector2(1, 0);
    }

    WalkableCheck(xmove, ymove)
    {
        var arr = currentTiles[Math.floor(this.pos.x + xmove)][Math.floor(this.pos.y + ymove)];

        for (var i = 0; i < arr.length; i++)
        {
            if (!arr[i].walkable && arr[i].alive && arr[i].enabled)
            {
                return false;
            }
        }

        return true;
    }

    MoveX(amount)
    {
        if (this.dead) return;


        this.lookDirection.x = amount > 0 ? 1 : -1;
        this.lookDirection.y = 0;

        if (!this.WalkableCheck(amount, 0))
        {
            return;
        }

        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.x += amount;

        if (!this.suppressPosition)
            this.UpdatePosition();

        console.log(this.pos);
    }

    MoveY(amount)
    {
        if (this.dead) return;

        this.lookDirection.y = amount > 0 ? -1 : 1;
        this.lookDirection.x = 0;

        if (!this.WalkableCheck(0, -amount))
        {
            return;
        }

        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.y -= amount;

        if (!this.suppressPosition)
            this.UpdatePosition();

        console.log(this.pos);

    }

    Move(amount_Vec = Vector2)
    {
        if (this.dead) return;

        this.lookDirection.x = amount_Vec.x > 0 ? 1 : -1;
        this.lookDirection.y = amount_Vec.y > 0 ? -1 : 1;

        if (!this.WalkableCheck(amount_Vec.x, -amount_Vec.y))
        {
            return;
        }

        if (!this.suppressPosition)
            this.InvalidatePosition(this.pos);

        this.pos.Add(amount_Vec);

        if (!this.suppressPosition)
            this.UpdatePosition();
    }

    LoseLife(amount)
    {
        this.health -= amount;

        
        if (this.health <= 0)
        {
            // Death Effects
            ShakeCamera(0.4, 2);
            PlayParticles("PlayerDeathParticles.json", this.pos);
            
            this.dead = true;
            this.enabled = false;

            window.dispatchEvent(new Event("pDead"));
        }
        else
        {
            // Hit effects
            ShakeCamera(0.2, 1.2);
            PlayParticles("PlayerHitParticles.json", this.pos);
        }
    }
}


// Attack
window.addEventListener("SpaceInput", () =>
{
    UseWeapon();
});

window.addEventListener("EInput", () =>
{
    UseItem();
});



var HasMoved = false;
var mapx = 2;
var mapy = 3;
var newMap = "";

window.addEventListener("DOMContentLoaded", () =>
{
    moveDirection = new Vector2(0, 0);
    moveXTimer = moveTime;
    moveYTimer = moveTime;

    AddItem(new Potion(12, 20));
    AddWeapon(new Sword(2, 3, 3, 0.5));

    // Jedes Gameobject benötigt einen Vector2 (Punkt auf einem Koordinatensystem) mit 
    // Einer x und einer Y koordinate als Position, und einen 2. der angiebt, welcher
    // Sprite aus dem Spritesheet gerendert werden soll
    //
    // Um eine Klasse die Gameobject erweitert oder ein Gameobject loszuwerden
    // kann man .Destroy() verwenden. hier also player.Destroy();

    player = new Player(new Vector2(4, 7), new Vector2(37, 31));
    player.activeEverywhere = true; 


    // Drawingorder auf 100 damit es vor der map gerendert wird
    player.ChangeDrawingOrder(100);

    // mit .alpha kann die Transparenz verändert Werden
    player.alpha = 1;
    // mit .scale kann die größe von gameobjects verändert werden
    player.scale.x = 1;
    player.scale.y = 1;

    window.addEventListener("OnUpdate", () =>
    {
        moveXTimer -= deltaTime;
        moveYTimer -= deltaTime;

        var move = new Vector2(
            (player.pos.x - cameraPosition.x),
            (player.pos.y - cameraPosition.y)
        );

        cameraPosition = new Vector2(cameraPosition.x + move.x * deltaTime * camFollowSpeed, cameraPosition.y + move.y * deltaTime * camFollowSpeed);

        var movedX = false;
        var movedY = false;
        if (moveYTimer <= 0)
        {
            if (moveDirection.y == 1)
            {
                MoveUp();
                movedY = true;
            }
    
            if (moveDirection.y == -1)
            {
                MoveDown();
                movedY = true;
            }
    
            if (movedY)
                moveYTimer = moveTime;
        }

        if (moveXTimer <= 0)
        {
            if (moveDirection.x == -1)
            {
                MoveLeft();
                movedX = true;
            }
    
            if (moveDirection.x == 1)
            {
                MoveRight();
                movedX = true;
            }


            if (movedX)
                moveXTimer = moveTime;
        }

    

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
        moveDirection.y = 1;
    });

    window.addEventListener("RightInput",()=>
    {
        moveDirection.x = 1;
    });

    window.addEventListener("LeftInput",()=>
    {
        moveDirection.x = -1;
    });

    window.addEventListener("DownInput",()=>
    {
        moveDirection.y = -1;
    })


    window.addEventListener("DownRelease", () =>
    {
        if (moveDirection.y == -1)
        {
            moveDirection.y = 0;
        }
    });

    window.addEventListener("UpRelease", () =>
    {
        if (moveDirection.y == 1)
        {
            moveDirection.y = 0;
        }
    });

    window.addEventListener("LeftRelease", () =>
    {
        if (moveDirection.x == -1)
        {
            moveDirection.x = 0;
        }
    });

    window.addEventListener("RightRelease", () =>
    {
        if (moveDirection.x == 1)
        {
            moveDirection.x = 0;
        }
    });
    
    
    function MoveUp()
    {
        if(player.pos.y!=0){
            player.MoveY(1); //Bewege den Spieler um 1 nach oben
    
            HasMoved=true;
        }
    
        if(player.pos.y <= 0 && HasMoved){
            mapy--;
            extractVector2Arrays()
            player.pos.y =19;
            HasMoved=false;
            window.dispatchEvent(new Event("OnMapChange"));
        }   
    }
    
    function MoveDown()
    {
        if(player.pos.y!=19){
            player.MoveY(-1); //Bewege den Spieler um 1 nach unten        
            HasMoved=true;
        }
    
        if(player.pos.y>=19&&HasMoved){
            mapy++;
            extractVector2Arrays()
            player.pos.y = 0;
            HasMoved=false;

            window.dispatchEvent(new Event("OnMapChange"));
        }
    }

    function MoveLeft()
    {
        if(player.pos.x!=0){
            player.MoveX(-1); //Bewege den Spieler um 1 nach links
            HasMoved=true;
        }
    
        if(player.pos.x<=0&&HasMoved){
            mapx--;
            extractVector2Arrays()
            player.pos.x = 19;
            HasMoved=false;

            window.dispatchEvent(new Event("OnMapChange"));

        }
    }

    function MoveRight()
    {
        if(player.pos.x!=19){
            player.MoveX(1); //Bewege den Spieler um 1 nach rechts
            HasMoved=true;
        }
    
        if(player.pos.x>=19&&HasMoved){
            mapx++;
            extractVector2Arrays()
            player.pos.x = 0;
            HasMoved=false;

            window.dispatchEvent(new Event("OnMapChange"));
        }
    
    }
});
