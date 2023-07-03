var enemyBuffer = [];

var enemyCount = 0;
var killedEnemys = 0;

class Enemy extends GameObject
{
    constructor(pos, spritesheetPos, health = 5, moveTime = 0.5, damage = 3) {
        super(pos, spritesheetPos);
        
        this.health = health;

        this.moveTime = moveTime;
        this.moveTimer = moveTime;
        this.pathRecalculateMinDistance = 0; // How far the player has to be away from the target to recalculate the path


        this.path = [];
        this.pathIndex = 0;
        this.damage = damage;

        enemyBuffer.push(this);
    }

    LoseLife(amount)
    {
        if (!this.enabled) return;

        this.health -= amount;
        if (this.health <= 0)
        {
            PlayParticles("EnemyDeathParticles.json", this.pos);

            // Remove from enemybuffer
            let index = enemyBuffer.indexOf(this);
            if (index > -1)
            {
                enemyBuffer.splice(index, 1);
            }

            window.dispatchEvent(new Event("EnemyDeath"))
            this.Destroy();
        }
    }

    UpdateEnemy()
    {
        if (!this.enabled) return;

        this.moveTimer -= deltaTime;
        if (this.moveTimer <= 0)
        {
            // Find Path
            if (this.path === undefined || this.path.length == 0 || GetVectorDistance(this.path[this.path.length - 1], player.pos) > this.pathRecalculateMinDistance)
            {
                this.path = FindBestPath(this.pos, player.pos);
                this.pathIndex = 0;
            }
            
            // Move
            this.InvalidatePosition(this.pos);
            if (this.path.length > this.pathIndex)
            {
                this.pos = this.path[this.pathIndex++];
            }
            else if (!PositionCheck(player, this.pos))
            {
                var possibleMove = this.pos.Copy();
                
                if (IsWalkable(possibleMove.Add(new Vector2(RandomRange(-1, 1), RandomRange(-1, 1)).Normalize().Round().RemoveNaN())))
                {
                    // Alternative Movement (When no path is available)
                    this.pos = possibleMove;
                }
            }
            this.UpdatePosition();
            
            // Hit Player
            if (PositionCheck(player, this.pos))
            {
                player.LoseLife(this.damage);
            }
            
            
            this.moveTimer = this.moveTime;
        }
    }
}

window.addEventListener("EnemyDeath", () => 
{
    killedEnemys++;
    if (killedEnemys >= enemyCount)
    {
        window.dispatchEvent(new Event("OnWin"));
        console.log("Win!!!");
    }

    console.log(killedEnemys);
    console.log(enemyCount);
});

window.addEventListener("DOMContentLoaded", () =>
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



    var dungeonBlock1 = new GameObject(new Vector2(18, 2), new Vector2(30, 28));
});

function SpawnEnemy(pos, mapPos, sprite, health, moveTime = 0.5)
{
    var enemy = new Enemy(pos,  sprite, health, moveTime);
    enemy.ChangeDrawingOrder(50);
    
    enemy.mapPosition = mapPos;
    enemy.enabled = false;
    enemy.walkable = false;

    enemyCount++;
}


window.addEventListener("OnUpdate", () =>
{
    if (enemyBuffer === undefined) return;
    if (enemyBuffer.length <= 0) return;
    
    
    enemyBuffer.forEach(element =>
    {
        if (element.enabled)
        {
            element.UpdateEnemy();
        }
    });
    
});

