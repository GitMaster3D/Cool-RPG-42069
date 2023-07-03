

var weapons = [];
var items_ = [];

var currentWeapon = 0;
var currentItem = 0;

var currentWeaponCooldown = 0;
var currentItemCooldown = 0;

window.addEventListener("OnUpdate", () =>
{
    currentWeaponCooldown -= deltaTime;
    currentItemCooldown -= deltaTime;
});

window.addEventListener("CommaInput", () =>
{
    NextWeapon();
});

function UseItem()
{
    items_[currentItem % items_.length].Use();
}

function UseWeapon()
{
    weapons[currentWeapon % weapons.length].Use();
}

function AddItem(item)
{
    items_.push(item);

}

function AddWeapon(weapon)
{
    weapons.push(weapon);
}

function NextItem()
{
    return items_[(currentItem++) % items_.length];
}

function NextWeapon()
{
    return weapons[(currentWeapon++) % weapons.length];
}

class item
{
    constructor(cooldown = 0)
    {
        this.cooldown = cooldown;
    }

    Use()
    {
        if (currentItemCooldown > 0) return;

        currentItemCooldown = this.cooldown;

        console.log("Nothing to see here");
    }
}

class weapon
{
    constructor(cooldown = 0)
    {
        this.cooldown = cooldown;
    }

    Use()
    {
        if (currentWeaponCooldown > 0) return;

        currentWeaponCooldown = this.cooldown;

        console.log("Nothing to see here");
    }
}

class Potion extends item
{
    constructor(healAmount, cooldown = 20)
    {
        super(cooldown);

        this.healAmount = healAmount;
    }

    Use()
    {
        if (currentItemCooldown > 0) return;

        currentItemCooldown = this.cooldown;

        player.health = Clamp(player.health + this.healAmount, 0, player.maxHealth);
    }
}

class Sword extends weapon
{
    constructor(aoeX, aoeY, damage  = 3, cooldown = 0.5)
    {
        super(cooldown);

        this.aoeX = aoeX;
        this.aoeY = aoeY;
        this.damage = damage;
    }

    Use()
    {
        if (currentWeaponCooldown > 0) return;

        currentWeaponCooldown = this.cooldown;

        var attackPos = new Vector2(player.pos.x, player.pos.y);

        if (player.lookDirection.y != 0)
        {
            attackPos.y += player.lookDirection.y > 0 ? 
            player.lookDirection.y :
            (player.lookDirection.y) - this.aoeX + 1;
        }

        if (player.lookDirection.x != 0)
        {
            attackPos.x += player.lookDirection.x > 0 ?
            player.lookDirection.x :
            player.lookDirection.x - this.aoeX + 1;
        }


        if (player.lookDirection.y != 0)
        {
            // Y Attack
            for (var j = 0; j < this.aoeX; j++)
            {
                for (var i = -Math.floor(this.aoeY / 2); i < Math.ceil(this.aoeY / 2); i++)
                {
                    this.DealDamage(new Vector2((attackPos.x + i), (attackPos.y + j)));
                }
            }
        }
        else
        {
            // X attack
            for (var j = 0; j < this.aoeX; j++)
            {
                for (var i = -Math.floor(this.aoeY / 2); i < Math.ceil(this.aoeY / 2); i++)
                {
                    this.DealDamage(new Vector2((attackPos.x + j), (attackPos.y + i)));
                }
            }
        }
    }

    DealDamage(pos = Vector2)
    {
        (async () => await PlayParticles("HitIndicator.json", pos))();

        for (var i = 0; i < enemyBuffer.length; i++)
        {
            if (enemyBuffer[i].pos.x == pos.x && enemyBuffer[i].pos.y == pos.y && enemyBuffer[i].enabled)
            {
                enemyBuffer[i].LoseLife(this.damage);
                PlayParticles("EnemyHitParticles.json", pos);
            }
        }
    }
}
