const screen = document.querySelector(".screen canvas");
const sctx = screen.getContext("2d");

var dead = false;

window.addEventListener('DOMContentLoaded', () => {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight - ctx.canvas.offsetHeight;
    screen.style.display = "none";

    if (localStorage.getItem("go") == null) gSave();
});

window.addEventListener("resize", () => {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight - ctx.canvas.offsetHeight;
})

window.addEventListener("pDead", () => {
    screen.style.display = "block";

    sctx.clearRect(0, 0, screen.width, screen.height);
    sctx.font = "72px Arial";
    sctx.fillStyle = "white";
    sctx.textAlign ="center";
    sctx.fillText("GAME OVER", screen.width / 2, screen.height / 2);

    sctx.font = "36px Arial";
    sctx.fillText("Click to restart", screen.width / 2, screen.height / 2 + 50);

    dead = true;
})

screen.addEventListener("click", () => {
    if (dead == true) {
        screen.style.display = "none";
        gLoad();
        dead = false;
    }
})