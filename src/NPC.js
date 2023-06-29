
var VILX = 5;
var VILY = 3;

var OGRX = 4;
var OGRY = 4;

var DRAGX = 9;
var DRAGY = 5;

var FRagezX = 5;
var FRagezY = 6;

var NPCVILloaded = true;
var NPCOGRloaded = true;
var NPCDRAGloaded = true;
var NPCFRAGloaded = true;

var Villager;
var ogre;
var fDragon;
var FRagez;

var conver = []  ;
var NPCsx = [];
var NPCsy = [];

window.addEventListener("DOMContentLoaded",()=>
{
    
  
    Villager = new CoolGuy(new Vector2(VILX,VILY), new Vector2( 4, 2));  
    ogre = new CoolGuy(new Vector2(OGRX,OGRY), new Vector2(0,3));
    fDragon = new CoolGuy(new Vector2(DRAGX,DRAGY), new Vector2(2,3));
    FRagez = new CoolGuy(new Vector2(DRAGX,DRAGY), new Vector2(0,21));


        NPCsx.push(VILX);
        NPCsx.push(OGRX);
        NPCsx.push(DRAGX);
        NPCsx.push(FRagezX);

        NPCsy.push(VILY);
        NPCsy.push(OGRY);
        NPCsy.push(DRAGY);
        NPCsy.push(FRagezY);




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
        UpdateNPC();
        
        
});

function UpdateNPC()
{
    if(mapx == 2 && mapy == 3)
    {
       
        NPCVILloaded = true;
        Villager.alpha = 1;
        Villager.ChangeDrawingOrder(100);
    }
    else 
    {
        NPCVILloaded = false;  
        Villager.alpha = 0.0;
    }


    if(mapx == 3 && mapy == 3)
    {
     
        NPCOGRloaded = true;
        ogre.alpha = 1.0
        ogre.ChangeDrawingOrder(100);
    }
    else 
    {
        NPCOGRloaded = false;
        ogre.alpha = 0.0;  
    }

    /*if(mapx == 3 && mapy == 2)
    {
        
        NPCFRAGloaded = true;
        FRagez.alpha = 1.0
        Fraget.ChangeDrawingOrder(100);                             //platzhalter
    }
    else 
    {
        NPCFRAGloaded = false;
        FRagez.alpha = 0.0;  
    }*/


    if(mapx == 2 && mapy == 2)
    {
        
        NPCDRAGloaded = true;
        fDragon.alpha = 1.0
        fDragon.ChangeDrawingOrder(100);
    }
    else 
    {
        NPCDRAGloaded = false;
        fDragon.alpha = 0.0;  
    }
}

    window.addEventListener("OnMapChange",()=>{
        console.log("map x,y"+ mapx + "" + mapy);
        console.log(NPCVILloaded);
        UpdateNPC();
    });


    window.addEventListener("TInput",()=>                                   //sobalt man vor dme NPC steht, redet man mit ihm mit "T"
    {
        for (var i = 0;i < NPCsx.length; i++){
            if(Math.round(player.pos.x) == Math.round(NPCsx[i]) && Math.round(player.pos.y) == (Math.round(NPCsy[i])+1))
            {
                Dialog();
            }
        }
       
       
            
    });



    function Dialog()
    {
        if (NPCVILloaded == true){
            var zufallsx = Math.floor((Math.random() * conver.length));
            alert(conver[zufallsx]);
        }

        if (NPCOGRloaded == true)
        {
            alert("ughrahr");
        }

        if (NPCDRAGloaded == true) 
        {
            alert("bwuah *spits fire*");
        }
      
    }

    class CoolGuy extends GameObject
    {

        constructor(pos, sprite)
        {
            super(pos,sprite);
        }
    }
