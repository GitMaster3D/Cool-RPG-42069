var enemyCount = 0;
var killedEnemys = 0;

var dungeonBlock1;
var dungeonBlock2;
var doorOpen = false;

window.addEventListener("EnemyDeath", () => 
{
    killedEnemys++;
    if (killedEnemys >= enemyCount && !doorOpen)
    {
        window.dispatchEvent(new Event("DoorOpen"));
        doorOpen = true;
    }

    if (killedEnemys >= enemyCount && doorOpen)
    {
        window.dispatchEvent(new Event("OnWin"));
    }

    console.log(killedEnemys);
    console.log(enemyCount);
});

window.addEventListener("OnWin", () =>
{
    alert("All enemys are dead, you won!");
});

window.addEventListener("DoorOpen", () => 
{
    dungeonBlock1.Destroy();
    dungeonBlock2.Destroy();


    killedEnemys = 0;
    enemyCount = 0;
    SpawnDungeonEnemys();
});


window.addEventListener("DOMContentLoaded", () =>
{
    SpawnOverworldenemys();

    
    // "Door"
    dungeonBlock1 = new GameObject(new Vector2(17, 3), new Vector2(0, 18));
    dungeonBlock2 = new GameObject(new Vector2(17, 2), new Vector2(0, 18));

    dungeonBlock1.ChangeDrawingOrder(100);
    dungeonBlock2.ChangeDrawingOrder(100);

    dungeonBlock1.walkable = false;
    dungeonBlock2.walkable = false;

    dungeonBlock1.mapPosition = new Vector2(3, 1);
    dungeonBlock2.mapPosition = new Vector2(3, 1);

    dungeonBlock1.enabled = false;
    dungeonBlock2.enabled = false;
});

function SpawnDungeonEnemys()
{
    // Dungeon Entry
    SpawnEnemy(new Vector2(1, 1), new Vector2(4, 1), new Vector2(62, 4), 12,  0.35);
    SpawnEnemy(new Vector2(13, 5), new Vector2(4, 1), new Vector2(62, 4), 12,  0.35);
    SpawnEnemy(new Vector2(8, 12), new Vector2(4, 1), new Vector2(62, 4), 12,  0.35);

    // Green part
    SpawnEnemy(new Vector2(9, 6), new Vector2(5, 1), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(7, 9), new Vector2(5, 1), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(7, 12), new Vector2(5, 1), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(10, 3), new Vector2(5, 1), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(13, 5), new Vector2(5, 1), new Vector2(62, 4), 12,  0.35);
    SpawnEnemy(new Vector2(12, 12), new Vector2(5, 1), new Vector2(40, 31), 10, 0.25);


    // Lava part
    SpawnEnemy(new Vector2(9, 6), new Vector2(5, 2), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(7, 12), new Vector2(5, 2), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(13, 5), new Vector2(5, 2), new Vector2(62, 4), 12,  0.35);
    SpawnEnemy(new Vector2(12, 12), new Vector2(5, 2), new Vector2(40, 31), 10, 0.25);
    SpawnEnemy(new Vector2(12, 6), new Vector2(5, 2), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(8, 3), new Vector2(5, 2), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(11, 1), new Vector2(5, 2), new Vector2(40, 31), 10, 0.25);
}

function SpawnOverworldenemys()
{
    // Village Middle
    SpawnEnemy(new Vector2(9, 6), new Vector2(2, 2), new Vector2(38, 31), 6);
    

    // Forest Left
    SpawnEnemy(new Vector2(9, 6), new Vector2(1, 2), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(12, 5), new Vector2(1, 2), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(7, 9), new Vector2(1, 2), new Vector2(38, 31), 6);

    // Upper Forest Left
    SpawnEnemy(new Vector2(10, 6), new Vector2(1, 1), new Vector2(20, 3), 15, 0.6);
    SpawnEnemy(new Vector2(7, 5), new Vector2(1, 1), new Vector2(20, 3), 15, 0.6);

    // Upper Right Forest
    SpawnEnemy(new Vector2(10, 6), new Vector2(2, 1), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(7, 12), new Vector2(2, 1), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(10, 3), new Vector2(2, 1), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(6, 9), new Vector2(2, 1), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(12, 8), new Vector2(2, 1), new Vector2(19, 2), 3, 0.2);
    SpawnEnemy(new Vector2(3, 5), new Vector2(2, 1), new Vector2(19, 2), 3, 0.2);

    // Marble
    SpawnEnemy(new Vector2(12, 12), new Vector2(3, 1), new Vector2(40, 31), 10, 0.25);
    SpawnEnemy(new Vector2(7, 8), new Vector2(3, 1), new Vector2(40, 31), 10, 0.25);
    SpawnEnemy(new Vector2(1, 1), new Vector2(3, 1), new Vector2(40, 31), 10, 0.25);

    // Graveyard
    SpawnEnemy(new Vector2(1, 1), new Vector2(3, 3), new Vector2(62, 4), 12,  0.35);
    SpawnEnemy(new Vector2(13, 5), new Vector2(3, 3), new Vector2(62, 4), 12,  0.35);
    SpawnEnemy(new Vector2(8, 12), new Vector2(3, 3), new Vector2(62, 4), 12,  0.35);
}


function KillAllEnemys()
{
    var maximumIterations = 100;
    while (enemyBuffer.length > 0 && maximumIterations > 0)
    {
        enemyBuffer.forEach(element =>
        {
            element.enabled = true;
            element.LoseLife(1000000);
        });
        maximumIterations--;
    }
}


function SpawnEnemy(pos, mapPos, sprite, health, moveTime = 0.5)
{
    var enemy = new Enemy(pos,  sprite, health, moveTime);
    enemy.ChangeDrawingOrder(50);
    
    enemy.mapPosition = mapPos;
    enemy.enabled = false;
    enemy.walkable = false;

    enemyCount++;
}


window.addEventListener("DOMContentLoaded", () =>
{
    var weapon = new DroppedWeapon(new Vector2(18, 2), new Vector2(30, 28), new Sword(3, 3, 8, 1.2));
    weapon.mapPosition = new Vector2(3, 1);
    weapon.ChangeDrawingOrder(5000);
    weapon.enabled = false;
});
