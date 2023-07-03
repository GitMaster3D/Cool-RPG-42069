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
    if (player.dead) return;

    saveVal("go", gameObjects);
    saveVal("mPos", new Vector2(mapx, mapy));

    saveVal("weapons", weapons);
    saveVal("item", items_);

    saveVal("Killcount", killedEnemys);
    saveVal("EnemyCount", enemyCount);
    saveVal("DoorOpen", doorOpen);
}

function gLoad() {

    var weaponData = loadVal("weapons");
    var items_ = loadVal("item");

    killedEnemys = loadVal("Killcount");
    enemyCount = loadVal("EnemyCount");
    doorOpen = loadVal("DoorOpen");

    for (var i = 0; i < weaponData; i++)
    {
        var w = new Sword();
        w.assign(weaponData[i]);
    }

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
                break;

            case "Enemy":
                if (gameObjects[i] == undefined) {
                    var b = new Enemy(new Vector2(3, 3), new Vector2(3, 3));
                    Object.assign(b, go[i]);
                    break;
                }
                Object.assign(gameObjects[i], go[i]);
                break;

            case "Player":
                Object.assign(gameObjects[i], go[i]);
                break;
         }
    }
}