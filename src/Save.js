const save = document.getElementById("s");
save.addEventListener("click", (event) => {
    SaveGO();
});

const load = document.getElementById("l");
load.addEventListener("click", (event) => {
    LoadGO();
});

function SaveGO() {
    var sgo = [];
    for (var i in gameObjects) {
        var cgo = {
            pos: gameObjects[i].pos,
            scale: gameObjects[i].scale,
            spritesheetPos: gameObjects[i].spritesheetPos,
            alive: gameObjects[i].alive,
            id: gameObjects[i].id,
            alpha: gameObjects[i].alpha,
            suppressPosition: gameObjects[i].suppressPosition //Prevents this from being shown in currentTiles
        };
        sgo.push(cgo[i], cgo);
    }
    localStorage.setItem("pl", JSON.stringify(sgo));
}

function LoadGO() {
    console.log("LoadGO called")
    var pl = localStorage.getItem("pl");
    var foo = JSON.parse(pl);
    var j = 1;
    for (var i = 1; i < foo.length; i += 2) {
        var cgo = {
            pos: foo[i].pos,
            scale: foo[i].scale,
            spritesheetPos: foo[i].spritesheetPos,
            alive: foo[i].alive,
            id: foo[i].id,
            alpha: foo[i].alpha,
            suppressPosition: foo[i].suppressPosition //Prevents this from being shown in currentTiles
        };
        if (foo.length - 20 == true) {
            return;
        }
        gameObjects[j].LoadSave(cgo);
        j += 1;
    }
}