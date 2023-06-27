// Klasse für die Monster
class Monster extends GameObject {


    constructor(pos, spritesheetPos, lvl, health, damage) {
    
      // Super ruft den Konstruktor der klasse auf, die
      // erweitert wird, hier Gameobject.
      // Dies wird hier benötigt, damit es richtig funktioniert
      super(pos, spritesheetPos);
    console.log("Spawned MonsterLVL1");
    this.lvl = lvl;
    this.health = health;
    this.damage = damage;
    }

    GetDamage(input_damage){
        Monster.health = Monster.health - input_damage;
      };
}


