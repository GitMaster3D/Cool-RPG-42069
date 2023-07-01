
var currentMapTiles = [];


async function extractVector2Arrays(layerAmount = 2) {

    window.dispatchEvent(new Event("MapLoad"));


    path = "./assets/maps/map"+mapx+"_"+mapy+".json";
    mapData = await GetTileset(path);

    const tilePositions = [];
    const tileIds = [];

    
    
    for (let j = 0; j < layerAmount; j++)
    {
        let layer = mapData.layers[j];
        const width = layer.width;
        const height = layer.height;

        for (let i = 0; i < layer.data.length; i++) {
            const tileId = layer.data[i];
            if (tileId !== 0) {
                const x = i % width;
                const y = Math.floor(i / width);
                tilePositions.push([x, y]);
                tileIds.push(tileId);
    
                go = new GameObject(new Vector2(x, y), TileidToVec(tileId));
                if (j == 0 && tileId == 65)
                {
                    go.walkable = false;
                }

                currentMapTiles.push(go);
            }
        }
    }

}



async function GetTileset(name = "") {
    var response = await fetch(name);
    return await response.json();
}



function TileidToVec(id = 0) {
    var y = 0;


    while (id > spriteSheetWidth)
    {
        id -= spriteSheetWidth;
        y++;
    }
    id--;
    return new Vector2(id | 0, y | 0 );
}

window.addEventListener("MapLoad", () =>
{

    for (let i = 0; i < currentMapTiles.length; i++)
    {
        currentMapTiles[i].Destroy();
    }
    currentMapTiles = [];

    // Deactivate and activate objects spawned in this map part
    for (const [key, value] of Object.entries(gameObjects))
    {
        if (gameObjects[key].mapPosition.x == mapx && gameObjects[key].mapPosition.y == mapy || gameObjects[key].activeEverywhere)
        {
            gameObjects[key].enabled = true;
        }
        else
        {
            gameObjects[key].enabled = false;
        }
    }


});