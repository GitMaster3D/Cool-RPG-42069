function render_health_Potion(PosX,PosY)
{
    var Health_potion = new GameObject(new Vector2(PosX |0 ,PosY | 0),new Vector2(2,25));
}

function render_heart(PosX,PosY)
{
    var heart = new GameObject(new Vector2(PosX|0,PosY|0),new Vector2(6,25))
}

function render_bonus_heart(PosX,PosY)
{
    var bonus_heart = new GameObject(new Vector2(PosX|0,PosY|0),new Vector2(7,25))
}

function render_heart_empty(PosX,PosY)
{
    var heart_empty = new GameObject(new Vector2(PosX|0,PosY|0),new Vector2(8,25))
}

function render_sword(PosX,PosY,sword_Number)
{
    var sword = new GameObject(new Vector2(PosX|0,PosY|0),new Vector2(4 + sword_Number,25))
}