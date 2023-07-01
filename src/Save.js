const save = document.getElementById("s");
save.addEventListener("click", (event) => {
    gSave();
});

const load = document.getElementById("l");
load.addEventListener("click", (event) => {
    gLoad();
});

function saveVal(name = "", value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function loadVal(name = "") {
    return JSON.parse(localStorage.getItem(name));
}

function gSave() {
    saveVal("go", gameObjects);
    saveVal("mPos", new Vector2(mapx, mapy));
}

function gLoad() {
    var go = loadVal("go");
    var mPos = loadVal("mPos");

    mapx = mPos.x;
    mapy = mPos.y;
    extractVector2Arrays();

    for (var i in go) {
         switch (go[i].name) {
            case "GameObject":
                if (gameObjects[i] == undefined) {
                    var b = new GameObject(new Vector2(3, 3), new Vector2(3, 3));
                    Object.assign(b, go[i]);
                    break;
                }
                Object.assign(gameObjects[i], go[i]);
                break;

            case "CoolGuy":
                if (gameObjects[i] == undefined) {
                    var b = new CoolGuy(new Vector2(3, 3), new Vector2(3, 3));
                    Object.assign(b, go[i]);
                    break;
                }
                Object.assign(gameObjects[i], go[i]);

            case "Player":
                Object.assign(gameObjects[i], go[i]);
                break;
         }
    }
}