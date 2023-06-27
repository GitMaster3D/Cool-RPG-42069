var NPC;
var NPCShop;
var Kräuter;
var NPCX = 8;
var NPCY = 4;
var NPC2;
var conver = []  ;
window.addEventListener("DOMContentLoaded",()=>
{
    console.log("Loaded");

   

    
        NPCShop = new CoolGuy(new Vector2(9,3), new Vector2(43,15));
        NPCShop.ChangeDrawingOrder(101);
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
        console.log("Tinput");
        if(Math.round(player.pos.x) == Math.round(NPCX) && Math.round(player.pos.y) == (Math.round(NPCY)+1))
        {
            Dialog();
        }
       
        if(Math.round(player.pos.x) == Math.round(9) && Math.round(player.pos.y) == (Math.round(3)+1))
        {
            DialogShop();
        }
            
    });


    function DialogShop()
    {
        console.log("Geht in Shop");
        alert(conver[0]);
    }

    function KräuterSammlerQuest ()
    {
        console.log(Kräuter);
        alert(conver[3]);
    }


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

    function OnMapUpdate()
    {
        if(mapx == 0 && mapy == 0)
        {
            NPC = new CoolGuy(new Vector2(NPCX - NPCX,NPCY - NPCY), new Vector2(4,2));  
            NPC.ChangeDrawingOrder(100);
        }
        else 
        {
            
        }
    
        if(mapx == 1 && mapy == 0)
        {
            NPC2 = new CoolGuy(new Vector2(10,2), new Vector2(0,3));
            NPC2.ChangeDrawingOrder(100);
        }
    }