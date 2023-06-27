async function extractVector2Arrays(name = "") {
    path = "./assets/maps/map"+mapx+"_"+mapy+".json";
    mapData = await GetTileset(path);

    const tilePositions = [];
    const tileIds = [];

    let layer = mapData.layers[0];
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

            if (tileId == 1157)
            {
                go.walkable = false;
            }
        }
    }

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