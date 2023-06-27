var NPC;
var NPCX = 4;
var NPCY = 2;
var conver = []  ;
var lvl1conver = [];
var lel4conver = [];
var lvl5conver = [];
var lvl6conver = [];
window.addEventListener("DOMContentLoaded",()=>
{
    console.log("Loaded");

    NPC = new GameObject(new Vector2(NPCX,NPCY),new Vector2(0,2));
        
     //Allgemein
        conver.push("Gott zum Gruße!");
        conver.push("Habet Dank.");
        conver.push("Am gestrigen Tage..");
        conver.push("Handgeklapper");
        conver.push("Es ist mir eine Freude Euch hier zu erblicken");
        conver.push("Beeilt Euch, bevor die Nacht hereinbricht!");
        conver.push("Bonjour! Comment allez-vous aujourd'hui?");
        conver.push("Ihr werdet mir helfen dieses Monster zu töten, nicht wahr?");
        conver.push("Beeilet euch! Sonst bringt Euch das Monster auch noch um!");
        conver.push("Ganz schön windig heute");
        conver.push("Ich bin halt anders.");
        conver.push("Ich bin einfach schon 2 Jahre alt! Kannst du das glauben?");
        conver.push("Danke dass du heute hier bist!");
        conver.push("Sonniger Tag heute.");
        conver.push("Was, es ist schon so spät?!");
        conver.push("Ich mag dieses Wetter");
        conver.push("Hey :)");
        conver.push("Bonjour");
        conver.push("Du lässt mich nicht im Stich oder?");
        conver.push("Beeil dich es wird bald dunkel!");
        conver.push("Bitte helfen Sie mir ich bin in Gefahr!");
        conver.push("Ich habe heute Geburtstag! ");
        conver.push("Gehabt Euch wohl!");
        conver.push("Ich mag Pizza.");

        //Wald 
        lvl1conver.push("Die Bäume spenden wundervollen Schatten, findet ihr nicht auch?");
        lvl1conver.push("Es ist angenehm kühl hier.");
        lvl1conver.push("Hört Ihr die Vögel, wie sie singen?");
        lvl1conver.push("Meinst du es gibt hier Gnome?");
        lvl1conver.push("Ich gehe gerne im Wald spazieren.");
        lvl1conver.push("Man hört den Wind durch die Bäume heulen.");
        lvl1conver.push("Pass auf wenn du Feuer machst der Boden ist sehr trocken!");
        lvl1conver.push("War das eben ein Drache?");
        lvl1conver.push("Schau! Ein Apfelbaum!");

        //Insel
        lel4conver.push("Man hört das Meeresrauschen.");
        lel4conver.push("Meint Ihr hier im Meer leben Seeungeheuer?");
        lel4conver.push("Ganz schön einsam hier.");
        lel4conver.push("Mir ist warm. Wollen wir nach etwas Schatten suchen?");
        lvl4conver.push("Lass uns schwimmen gehen!");
        lvl4conver.push("Ich habe früher am Strand immer gerne Muscheln gesammelt.");
        lvl4conver.push("Lass uns angeln gehen!");
        lvl4conver.push("Ich will nach Hause");
        lvl4conver.push("Früher habe ich immer Sandburgen gebaut, wenn ich am Strand war.");

        //Stadt und Wald
        lvl5conver.push("Der Kontrast zwischen Dort und Wald ist hübsch.");
        lvl5conver.push("Im Dorf ist es so warm... Aber im Wald ist es auszuhalten.");
        lvl5conver.push("Der Weg zum Wald ist sehr holprig.");
        lvl5conver.push("Lass uns in den Wald klettern gehen!");
        lvl5conver.push("Lass uns in die Stadt gehen.");
        lvl5conver.push("La la la la la la laaaaaaaa ♪♪♪");
        lvl5conver.push("Auf welcher Schule warst du?");
        lvl5conver.push("Wohin führen Eure Schritte?");
        lvl5conver.push("Ich glaube es regnet bald.");

        //Stadt
        lvl6conver.push("Heute ist wieder Markt.");
        lvl6conver.push("Warst du schon auf dem Markt?");
        lvl6conver.push("Hier auf dem Markt gibt es den frischesten Fisch weit und breit!");
        lvl6conver.push("So ein schönes Fachwerk!");
        lvl6conver.push("Wann wurde dieses Haus gebaut?");
        lvl6conver.push("Der Bürgermeister will eine neue Straße nach Gießen bauen lassen. Hofftentlich zeitnah!");
        lvl6conver.push("Ich habe Angst, dass die Pest kommt¡");
        lvl6conver.push("Ein Männlein steht im Walde ganz still und stumm ♪♪♪");
        lvl6conver.push("Nach dem Sonnenuntergang, schließen sich die Tore. Also seiet rechtzeitig wieder da!");
        lvl6conver.push("Wohin des Weges?");
        lv16conver.push("Auf einen Humpen auf mich in die Wirtschaft später, wenn du willst.");
        lvl6conver.push("Es ist mir eine Freude, Euch hier zu erblicken!");    
        lvl6conver.push("Warum ist es heute so warm? 31°C!!!");





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