async function extractVector2Arrays(name = "") {
    path = "./assets/maps/" + name;
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
        }
    }
}



async function GetTileset(name = "") {
    var response = await fetch(name);
    return await response.json();
}


function TileidToVec(id = 0) {
    var y = 0;
    id--;

    while (id > spriteSheetWidth)
    {
        id -= spriteSheetWidth;
        y++;
    }


    return new Vector2(id | 0, y | 0 );
}