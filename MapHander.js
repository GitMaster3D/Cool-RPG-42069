import * as InputManager from "/InputManager.js";
import * as Engine from "/Engine.js";
import GameObject, { Vector2 } from './Engine.js';

// This event will be called as soon as this script gets loaded by the html file
window.addEventListener('DOMContentLoaded', () => {
    init();
});

function init()
{
    renderMap();
}

function renderMap()
{
    var map = getMap();
    for(let i = 0; i < map.length; i++)
    {
        Engine.drawGO(map[i]);
    }
}

function getMap()
{
    return [new GameObject(new Vector2(2, 1), new Vector2(20, 17))];
}