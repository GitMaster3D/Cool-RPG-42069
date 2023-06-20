var NPC;
var NPCX = 4;
var NPCY = 2;
var conver = []  ;
window.addEventListener("DOMContentLoaded",()=>
{
    console.log("Loaded");

    NPC = new GameObject(new Vector2(NPCX,NPCY),new Vector2(0,2));
        
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
        conver.push("Ich bin halt anders");
        conver.push("Ich bin einfach schon 2 Jahre alt! Kannst du das glauben?");
        conver.push("Danke dass du heute hier bist!");
        conver.push("Sonniger Tag heute");
        conver.push("Was, es ist schon so spät?!");
        conver.push("Ich mag dieses Wetter");
        conver.push("Hey :)");
        conver.push("Bonjour");
        conver.push("Auf welcher Schule warst du?");
        conver.push("Du lässt mich nicht im Stich oder?");
        conver.push("Beeil dich es wird bald dunkel!");
        conver.push("Bitte helfen Sie mir ich bin in Gefahr!");
        conver.push("Ich habe heute Geburtstag! ");
});




    window.addEventListener("MInput",()=>
    {
        if(Math.round(player.pos.x) == Math.round(NPCX) && Math.round(player.pos.y) == Math.round(NPCY))
        {
            Dialog();
        }
          
            
    });

    
    function Dialog()
    {
        var zufallsx = Math.floor((Math.random() * conver.length));
        alert(conver[zufallsx]);
        
    }