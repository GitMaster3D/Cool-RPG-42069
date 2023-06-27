async function extractVector2Arrays(name = "", layerAmount = 2) {
    path = "./assets/maps/map"+mapx+"_"+mapy+".json";
    mapData = await GetTileset(path);

    const tilePositions = [];
    const tileIds = [];

    
    // Load each Layer
    for (let j = 0; j < layerAmount; j++)
    {
        // Load single layer
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

                if (j == 1 && tileId == 65)
                {
                    go.walkable = false;
                }
            }
        }
    }

    // Old layer2 code
    /*
    let layer2 = mapData.layers[1];
    for (let i = 0; i < layer2.data.length; i++) {
        const tileId = layer2.data[i];
        if (tileId !== 0) {
            const x = i % width;
            const y = Math.floor(i / width);
            tilePositions.push([x, y]);
            tileIds.push(tileId);
            
            var vec = TileidToVec(tileId);
            go = new GameObject(new Vector2(x, y), vec);
            
            if (tileId == 65)
            {
                go.walkable = false;
            }
        }
    }
    */
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