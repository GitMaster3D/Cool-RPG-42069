
// This event will be called as soon as this script gets loaded by the html file
window.addEventListener('DOMContentLoaded', () => {
    initMapHandler();
});

function initMapHandler()
{
    renderMap();
}

function renderMap()
{
    var map = getMap();
    for(let i = 0; i < map.length; i++)
    {
        drawGO(map[i]);
    }
}

function getMap()
{
    return [new GameObject(new Vector2(2, 1), new Vector2(20, 17))];
}