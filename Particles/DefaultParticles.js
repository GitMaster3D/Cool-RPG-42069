import * as Engine from "../Engine.js";
import ParticleSystemData from "../ParticleSystem.js";
import { RandomRange } from "../Mathmatics.js";

export function SendParticleSystemData()
{
    return new ParticleSystemData(
        10,  // Amount => Wie vile Partikel spawnen
        new Engine.Vector2(RandomRange(1, 20), RandomRange(1, 15)), // Spawn pos => Wo die Partikel Erscheinen
        new Engine.Vector2(20, 17), //Sprite => Welcher Sprite vom Spritesheet gewählt werden soll
         3, // Lifetime => Wie vile sekunden bis die Partikel entfernt werden
         50, // Start Speed Multiplier => wie schnell die partikel beim spawnen sein sollen
         0, // End Speed Multiplier => wie schnell die Partikel minimal sein müssen
         30, // Dropoff Multiplier => wie schnell die Partikel die minimalgeschwindigkeit erreichen sollen

         -1, // min Spread
         1, // max Spread => wivil die Partikel von ihrer startgeschwindigkeit abweichen dürfen

         0.5 // fadeout start => wivile sekunden vor ende der Lebenszeit der Partikel sie anfangen sollen, langsam durchsichtiger zu werden
    );
}


