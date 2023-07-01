var ctx = document.querySelector(".HUD canvas").getContext("2d");

window.addEventListener('DOMContentLoaded', () => {
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;
});

window.addEventListener("OnUpdate", () => {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    HeartsHUD();
    ItemsHUD();
    DrawText();
})

window.addEventListener("resize",() =>
{
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;
});

function DrawText() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("- LIFE -", 90, 25);

    ctx.fillStyle = "white";
    ctx.fillText("SLOT 1", 300, 25);
    ctx.fillText("SLOT 2", 400, 25);
}

function HeartsHUD() {
    let fullHearts = Math.floor(player.health / 4);
    let remainingHealth = (((player.health / 4) - fullHearts));

    for (let i = 0; i < player.maxHealth / 4; i++) {
        if (i < fullHearts)
            DrawToHUD(new Vector2(6, 25), new Vector2(i / 2, 0.44), 1, new Vector2(0.5, 0.5), "full");
        else
            DrawToHUD(new Vector2(8, 25), new Vector2(i / 2, 0.44), 1, new Vector2(0.5, 0.5), "full"); 
        }

        switch (remainingHealth) {
            case 0.75:
                DrawToHUD(new Vector2(6, 25), new Vector2(fullHearts / 2, 0.44), 1, new Vector2(0.5, 0.5), "three-quarters");
                break;
            case 0.50:
                DrawToHUD(new Vector2(6, 25), new Vector2(fullHearts / 2, 0.44), 1, new Vector2(0.5, 0.5), "half");
            case 0.25:
                DrawToHUD(new Vector2(6, 25), new Vector2(fullHearts / 2, 0.44), 1, new Vector2(0.5, 0.5), "quarter");
                break;
            default:
                break;
    }
}

function ItemsHUD() {
    DrawToHUD(new Vector2(4, 28), new Vector2(3.9, 0.44), 1, new Vector2(0.5, 0.5), "full");
    DrawToHUD(new Vector2(0, 25), new Vector2(5.15, 0.44), 1, new Vector2(0.5, 0.5), "full");
}

function DrawToHUD(spritesheetPos, spritePos, alpha = 1, scale = new Vector2(1, 1), heartType = "full") {
    ctx.save();

    ctx.globalAlpha = alpha;
    ctx.scale(scale.x * globalScale, scale.y * globalScale);

    let clipWidth;
    switch (heartType) {
        case 'full':
            clipWidth = spriteWidth;
            break;
        case 'three-quarters':
            clipWidth = spriteWidth * 0.75;
            break;
        case 'half':
            clipWidth = spriteWidth * 0.5;
            break;
        case 'quarter':
            clipWidth = spriteWidth * 0.25;
            break;
    }

    ctx.beginPath();
    ctx.rect(spriteWidth * spritePos.x / scale.x, spriteHeight * spritePos.y / scale.y, clipWidth, spriteHeight);
    ctx.clip();

    ctx.drawImage(sprites, spritesheetPos.x * spriteWidth, spritesheetPos.y * spriteHeight, spriteWidth, spriteHeight,
        spriteWidth * spritePos.x / scale.x, spriteHeight * spritePos.y / scale.y, spriteWidth, spriteHeight);

    ctx.restore();
}

function DrawItem(spritesheetPos, spritePos, alpha = 1, scale = new Vector2(1, 1)) {
    ctx.save();

    ctx.globalAlpha = alpha;
    ctx.scale(scale.x * globalScale, scale.y * globalScale);

    ctx.drawImage(sprites, spritesheetPos.x * spriteWidth, spritesheetPos.y * spriteHeight, spriteWidth, spriteHeight,
        spriteWidth * spritePos.x / scale.x, spriteHeight * spritePos.y / scale.y, spriteWidth, spriteHeight);

    ctx.restore();
}