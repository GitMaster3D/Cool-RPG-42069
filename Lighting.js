import * as Engine from "/Engine.js";
import GameObject, { Vector2, context } from './Engine.js';
import { Lerp, LerpUnclamped }  from "./Mathmatics.js";

let sprite = new Image();
sprite.src = "images/light.png";

let pointlights = {};
let autoName = 0;


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

        pointlights[autoName++] = this;
    }

    OnUpdate()
    {
        Engine.context.globalAlpha = this.instensity;

        var xPos = this.pos.x * Engine.spriteWidth - this.dimensions.x / 2;
        var yPos = this.pos.y * Engine.spriteHeight - this.dimensions.y / 2;

        Engine.context.save();
        Engine.context.scale(this.scale.x, this.scale.y);

        Engine.context.drawImage(
            sprite, // Sprite
            xPos, // x position on canvas
            yPos, // y position on canvas
            this.dimensions.x, // x Size of the image
            this.dimensions.y // y size of the image
            ); 

        Engine.context.restore();
    }
}


// This event will be called as soon as this script gets loaded by the html file
window.addEventListener('DOMContentLoaded', () => {
    Init();
});


function Init()
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


