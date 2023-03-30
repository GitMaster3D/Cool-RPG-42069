import * as Engine from "/Engine.js";
import GameObject, { Lerp, LerpUnclamped, Vector2 } from './Engine.js';

// This event will be called as soon as this script gets loaded by the html file
window.addEventListener('DOMContentLoaded', () => {
    Init();
});

export default class ParticleSystemData
{
    constructor(amount, pos, spriteSheetPos, lifetime, startSpeedMultiplier, endSpeedMultiplier, dropoffMultiplier, minSpread, maxSpread, fadeoutStart)
    {
        this.amount = amount;
        this.pos = pos;
        this.spriteSheetPos = spriteSheetPos;
        this.lifetime = lifetime;
        this.startSpeedMultiplier = startSpeedMultiplier;
        this.endSpeedMultiplier = endSpeedMultiplier;
        this.dropoffMultiplier = dropoffMultiplier;
        this.minSpread = minSpread;
        this.maxSpread = maxSpread;
        this.fadeoutStart = fadeoutStart;
    }
}


var currentParticles = {};
var autoName = 0;

function Init()
{
    window.addEventListener("OnUpdate", () =>
    {
        for (const [key, value] of Object.entries(currentParticles))
        {
            currentParticles[key].UpdateParticle();
        }
    });

    window.ParticleTest = ParticleTest;
}


export async function GetParticleData(name)
{
    var data = import(name).then(system =>
    {
        var particleData = system.SendParticleSystemData();
        return particleData;
    });

    return data;
}

export function SpawnParticles(amount, pos, spriteSheetPos, lifetime, startSpeedMultiplier, endSpeedMultiplier, dropoffMultiplier, minSpread, maxSpread, fadeoutStart)
{


    class Particle extends GameObject
    {
        constructor(pos, spritesheetPos, lifetime, name) {
            super(pos, spritesheetPos);
            
            this.lifetime = lifetime;

            this.velocity = new Vector2(RandomRange(-1, 1), RandomRange(-1, 1));

            this.spread = RandomRange(minSpread, maxSpread);

            this.name = name;

            this.startLifetime = lifetime;
            this.lifetimeScale = this.startLifetime;

            this.startSpeedMultiplier = startSpeedMultiplier;
            this.endSpeedMultiplier = endSpeedMultiplier;
            this.fadeoutStart = fadeoutStart;
            this.fadeoutScale = 1;
        }
        
        UpdateParticle()
        {
            //Handle lifetime scale
            this.lifetime -= Engine.deltaTime;
            this.lifetimeScale = (1 - this.lifetime / this.startLifetime) * dropoffMultiplier;

            // Slow particles down over time
            this.velocity = (Engine.NormalizeVector(this.velocity));
            this.velocity.Multiply(Engine.Lerp(this.startSpeedMultiplier * this.spread, this.endSpeedMultiplier * this.spread, this.lifetimeScale));

            // Fade effect at the end
            if (this.lifetime <= this.fadeoutStart)
            {
                this.fadeoutScale = this.lifetime / this.fadeoutStart;

                this.alpha = LerpUnclamped(1, 0, 1 - this.fadeoutScale);
            }

            // Remove particles when they are end of life
            if (this.lifetime <= 0)
            {
                this.Destroy();
                
                delete currentParticles[this.name];
            }


            // Apply particle movement
            var moveDelta = new Vector2((this.velocity.x * Engine.deltaTime) || 0, (this.velocity.y * Engine.deltaTime) || 0);
            this.pos.Add(moveDelta);
        }
    }
    
    for (let i = 0; i < amount; i++)
    {
        var particle = new Particle(new Vector2(pos.x, pos.y), spriteSheetPos, lifetime, autoName);

        currentParticles[autoName++] = particle;

       // Engine.SpawnGO(particle);
    }
}


export function RandomRange(min, max)
{
    return Math.random() * (max - min) + min;
}

export async function PlayParticles(name)
{
    var path = "/Particles/" + name;
    var data = await GetParticleData(path);

    console.log(data);

    SpawnParticles(
        data.amount, 
        data.pos, 
        data.spriteSheetPos, 
        data.lifetime,
        data.startSpeedMultiplier,
        data.endSpeedMultiplier,
        data.dropoffMultiplier,
        data.minSpread,
        data.maxSpread,
        data.fadeoutStart 
        )
}


export async function ParticleTest()
{
    PlayParticles("DefaultParticles.js");
}

