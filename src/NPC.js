var NPC;
var NPCX = 8;
var NPCY = 4;
var NPC2;
var conver = []  ;   

    
var nppos = 0;
var NPC1loaded = true;
var NPC;
var NPC2;
var NPC2loaded;
window.addEventListener("DOMContentLoaded",()=>
{
    NPC = new CoolGuy(new Vector2(NPCX,NPCY), new Vector2( 4, 2));  
    NPC2 = new CoolGuy(new Vector2(6,8), new Vector2(0,3));

    // Plaziert NPC auf Mapteil 2 | 2
    NPC.mapPosition = new Vector2(2, 2);

    // Sorgt dafür dass NPCS2 überall aktiv ist (keine ahnung was der macht)
    NPC2.activeEverywhere = true;
    
    conver.push("Gott zum Gruße!");
    conver.push("Habet Dank");
    conver.push("Am gestrigen Tage..");
    conver.push("Handgeklapper");
    conver.push("Es ist mir eine Freude Euch hier zu erblicken");
    conver.push("Beeilt Euch, bevor die Nacht hereinbricht!");
    conver.push("Bonjour! Comment allez-vous aujourd'hui?");
    conver.push("Ihr werdet mir helfen dieses Monster zu töten nicht wahr?");
    conver.push("Beeilet euch! Sonst bringt Euch das Monster auch noch um!");
    conver.push("Ganz schön windig heute");
    
    NPC.ChangeDrawingOrder(100);
    NPC2.ChangeDrawingOrder(100);

    UpdateNPC();
});

function UpdateNPC()
{
    if(mapx == 2 && mapy == 2)
    {
        NPC1loaded = true;
        NPC.alpha = 1;
    }
    else 
    {
        NPC1loaded = false;  
        NPC.alpha = 0.0;
    }

    if(mapx == 1 && mapy == 0)
    {
        NPC2loaded = true;
        NPC2.alpha = 1.0
    }
    else 
    {
        NPC2loaded = false;
        NPC2.alpha = 0.0;  
    }
}

window.addEventListener("OnMapChange",()=>{
    console.log(NPC1loaded);
    UpdateNPC();
});


window.addEventListener("TInput",()=>                                   //sobalt man vor dme NPC steht, redet man mit ihm mit "T"
{
    console.log(mapx);
    console.log(mapy);
    console.log(NPC1loaded);
    if(Math.round(player.pos.x) == Math.round(NPCX) && Math.round(player.pos.y) == (Math.round(NPCY)+1))
    {
        Dialog();
    }
});



function Dialog()
{
    if (NPC1loaded == true){
        var zufallsx = Math.floor((Math.random() * conver.length));
        alert(conver[zufallsx]);
    }
}

class CoolGuy extends GameObject
{

    constructor(pos, sprite)
    {
        super(pos,sprite);
    }
}

