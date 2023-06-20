var NPC;
var NPCX = 8;
var NPCY = 4;
var NPC2;
var conver = []  ;
window.addEventListener("DOMContentLoaded",()=>
{
    console.log("Loaded");

    NPC = new CoolGuy(new Vector2(8,4), new Vector2(4,2));  
    NPC.ChangeDrawingOrder(100);
    
        
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
        
});




    window.addEventListener("TInput",()=>                                   //sobalt man vor dme NPC steht, redet man mit ihm mit "M"
    {
        if(Math.round(player.pos.x) == Math.round(NPCX) && Math.round(player.pos.y) == (Math.round(NPCY)+1))
        {
            Dialog();
        }
          
            
    });

    
    function Dialog()
    {
        var zufallsx = Math.floor((Math.random() * conver.length));
        alert(conver[zufallsx]);
        
    }

    class CoolGuy extends GameObject
    {

        constructor(pos, sprite)
        {
            super(pos,sprite);
        }
    }