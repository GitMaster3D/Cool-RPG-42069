

var weapons = [];
var items = [];

var currentWeapon = 0;
var currentItem = 0;

window.addEventListener("DOMContentLoaded", () =>
{
    console.log("189237409283578928354");
})

function UseItem()
{
    items[currentItem].Use();
}

function UseWeapon()
{
    weapons[currentWeapon].Use();
}

function AddItem(item)
{
    items.push(item);
}

function AddWeapon(weapon)
{
    weapons.push(weapon);
}

function NextItem()
{
    return items[(currentItem++) % items.length];
}

function NextWeapon()
{
    return weapons[(currentWeapon++) % weapons.length];
}

class item
{
    Use()
    {
        console.log("Nothing to see here");
    }
}

class weapon
{
    Use()
    {
        console.log("Nothing to see here");
    }
}

class Sword extends weapon
{
    constructor(aoeX, aoeY)
    {
        super();

        this.aoeX = aoeX;
        this.aoeY = aoeY;
    }

    Use()
    {
        var attackPos = player.pos.Copy();
        attackPos.Add(package.lookDirection);

        for (var i = 0; i < this.aoeX; i++)
        {
            for (var j = 0; j < this.aoeY; j++)
            {
                var go = new GameObject(new Vector2(pos.x + i, pos.y + j));
                go.ChangeDrawingOrder(1000);
                go.enabled = true;
            }
        }
    }
}

/*
class inventory_Manager//13|0-13|4
{
constructor(Slot1,Slot2,Slot3,Slot4,Slot5){
    this.Slot1 =Slot1;
    this.Slot2=Slot2;
    this.Slot3=Slot3;
    this.Slot4=Slot4;
    this.Slot5=Slot5;
}
}
*/