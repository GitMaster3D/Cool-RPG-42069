var enemyBuffer = [];

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


window.addEventListener("DOMContentLoaded", () =>
{
    SpawnEnemy(new Vector2(9, 6), new Vector2(2, 2), new Vector2(38, 31), 6);

    SpawnEnemy(new Vector2(9, 6), new Vector2(1, 2), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(12, 5), new Vector2(1, 2), new Vector2(38, 31), 6);
    SpawnEnemy(new Vector2(7, 9), new Vector2(1, 2), new Vector2(38, 31), 6);
});

function SpawnEnemy(pos, mapPos, sprite, health)
{
    var enemy = new Enemy(pos,  sprite, health);
    enemy.ChangeDrawingOrder(50);
    
    enemy.mapPosition = mapPos;
    enemy.enabled = false;
    enemy.walkable = false;
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
