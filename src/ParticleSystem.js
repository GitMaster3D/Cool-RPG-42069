
// This event will be called as soon as this script gets loaded by the html file
window.addEventListener('DOMContentLoaded', () => {
    InitParticleSystem();
});

class ParticleSystemData
{
    constructor(amount, pos, spriteSheetPos, lifetime, startSpeedMultiplier, endSpeedMultiplier, dropoffMultiplier, minSpread, maxSpread, fadeoutStart, spriteSheetPos_End, scaleRange)
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
        this.spriteSheetPos_End = spriteSheetPos_End;
        this.scaleRange = scaleRange;
    }
}


var currentParticles = {};
var autoName = 0;

function InitParticleSystem()
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


async function GetParticleData(name)
{
    // Get Particle JSON
    var response = await fetch(name);
    var obj = await response.json();

    //Convert Particle JSON to usable data
    var data = new ParticleSystemData(
        obj.Amount,
        new Vector2(RandomRange(obj.PosXMin, obj.PosXMax), RandomRange(obj.PosYMin, obj.PosYMax)),
        new Vector2(obj.SpriteSheetX_Start, obj.SpriteSheetY_Start),
        obj.Lifetime,
        obj.StartSpeedMultiplier,
        obj.EndSpeedMultiplier,
        obj.DropoffSpeedMultiplier,
        obj.MinSpread,
        obj.MaxSpread,
        obj.FadeoutStart,
        new Vector2(obj.SpriteSheetX_End, obj.SpriteSheetY_End),
        new Vector2(obj.Scale_Min, obj.Scale_Max)
    );


    return data;
}

class Particle extends GameObject
{
    constructor(pos, spritesheetPos, lifetime, name, startSpeedMultiplier, endSpeedMultiplier, dropoffMultiplier, minSpread, maxSpread, fadeoutStart, spriteSheetPos_End, scaleRange) 
    {
        var sprite = new Vector2(Math.round(RandomRange(spritesheetPos.x, spriteSheetPos_End.x)), Math.round(RandomRange(spritesheetPos.y, spriteSheetPos_End.y)));
        
        super(pos, sprite);
        this.suppressPosition = true;
        
        this.lifetime = lifetime;

        this.velocity = new Vector2(RandomRange(-1, 1), RandomRange(-1, 1));

        this.spread = RandomRange(minSpread, maxSpread);

        this.name = name;

        let scaleNumber = RandomRange(scaleRange.x, scaleRange.y);
        this.scale = new Vector2(scaleNumber, scaleNumber);

        this.startLifetime = lifetime;
        this.lifetimeScale = this.startLifetime;

        this.startSpeedMultiplier = startSpeedMultiplier;
        this.endSpeedMultiplier = endSpeedMultiplier;
        this.fadeoutStart = fadeoutStart;
        this.fadeoutScale = 1;
        this.dropoffMultiplier = dropoffMultiplier;
    }

    UpdateParticle()
    {
        //Handle lifetime scale
        this.lifetime -= deltaTime;
        this.lifetimeScale = (1 - this.lifetime / this.startLifetime) * this.dropoffMultiplier;
    
        // Slow particles down over time
        this.velocity = (NormalizeVector(this.velocity));
        this.velocity.Multiply(Lerp(this.startSpeedMultiplier * this.spread, this.endSpeedMultiplier * this.spread, this.lifetimeScale));
    
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
        var moveDelta = new Vector2((this.velocity.x * deltaTime) || 0, (this.velocity.y * deltaTime) || 0);
    
        this.Move(moveDelta);
    }
}

function SpawnParticles(amount, pos, spriteSheetPos, lifetime, startSpeedMultiplier, endSpeedMultiplier, dropoffMultiplier, minSpread, maxSpread, fadeoutStart, spriteSheetPos_End, scaleRange)
{        
    for (let i = 0; i < amount; i++)
    {
        var particle = new Particle(
            new Vector2(pos.x, pos.y),
                spriteSheetPos,
                lifetime, autoName,
                startSpeedMultiplier,
                endSpeedMultiplier,
                dropoffMultiplier, 
                minSpread, maxSpread,
                fadeoutStart,
                spriteSheetPos_End,
                scaleRange
                );

        currentParticles[autoName++] = particle;
    }
}

async function PlayParticles(name, pos = new Vector2(0, 0))
{
    var path = "./assets/particles/" + name;
    var data = await GetParticleData(path);


    SpawnParticles(
        data.amount, 
        new Vector2(data.pos.x + pos.x, data.pos.y + pos.y), 
        data.spriteSheetPos, 
        data.lifetime,
        data.startSpeedMultiplier,
        data.endSpeedMultiplier,
        data.dropoffMultiplier,
        data.minSpread,
        data.maxSpread,
        data.fadeoutStart,
        data.spriteSheetPos_End,
        data.scaleRange
        );
    
        
}




function ParticleTest()
{

    if (RandomRange(0, 1) > 0.5)
    {
        PlayParticles("TestParticles.json");
    }
    else
    {
        PlayParticles("TestParticles2.json");
    }
}


