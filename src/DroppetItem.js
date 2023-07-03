class DroppedItem extends GameObject
{
    constructor(pos, sprite, item)
    {
        super(pos, sprite);
        this.item = item;
    }

    Pickup()
    {
        AddItem(this.item);
        NextItem();
        this.Destroy();
    }
}

class DroppedWeapon extends GameObject
{
    constructor(pos, sprite, weapon)
    {
        super(pos, sprite);
        this.weapon = weapon;
    }

    Pickup()
    {
        AddWeapon(this.weapon);
        NextWeapon();
        this.Destroy();
    }
}


window.addEventListener("DOMContentLoaded", () =>
{
    var weapon = new DroppedWeapon(new Vector2(18, 2), new Vector2(30, 28), new Sword(4, 3, 5, 1.8));
    weapon.mapPosition = new Vector2(3, 1);
    weapon.ChangeDrawingOrder(5000);
});



window.addEventListener("RInput", () =>
{
    var pos = player.pos.Copy();

    pos.Round();
    var arr = currentTiles[pos.x][pos.y];

    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i].constructor.name == "DroppedItem" || arr[i].constructor.name == "DroppedWeapon")
        {
            arr[i].Pickup();
        }
    }
});