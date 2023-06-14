let sprite = new Image();
sprite.src = "./assets/images/light.png";

let pointlights = {};
let autoNameLighting = 0;


class PointLight 
{
    constructor (pos, instensity, imageDimensions, scale = new Vector2(1, 1))
    {
        this.pos = pos;
        this.pos.x /= scale.x;
        this.pos.y /= scale.y;


        this.instensity = instensity;

        this.dimensions = imageDimensions;



        this.alpha = instensity;
        this.scale = scale;

        pointlights[autoNameLighting++] = this;
    }

    OnUpdate()
    {
        context.globalAlpha = this.instensity;

        var xPos = this.pos.x * spriteWidth - this.dimensions.x / 2;
        var yPos = this.pos.y * spriteHeight - this.dimensions.y / 2;

        context.save();
        context.scale(this.scale.x, this.scale.y);

        context.drawImage(
            sprite, // Sprite
            xPos, // x position on canvas
            yPos, // y position on canvas
            this.dimensions.x, // x Size of the image
            this.dimensions.y // y size of the image
            ); 

        context.restore();
    }
}


// This event will be called as soon as this script gets loaded by the html file
window.addEventListener('DOMContentLoaded', () => {
    InitLighting();
});


function InitLighting()
{
    window.addEventListener("OnUpdate", () =>
    {
        for (let i = 0; i < Object.entries(pointlights).length; i++)
        {
            pointlights[i].OnUpdate();
        }
    });

    var light = new PointLight(new Vector2(10, 5), 0.5, new Vector2(1920, 1080), new Vector2(0.3, 0.3));
}


