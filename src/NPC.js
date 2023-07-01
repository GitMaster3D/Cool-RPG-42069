
var VILX1 = 15;
var VILY1 = 9;

var VILX2 = 4;
var VILY2 = 8;

var VILX3 = 12;
var VILY3 = 15;

var JaegerX = 4;
var JaegerY = 6;

var merchantX = 7;
var merchantY = 5;

var buffX = 9;
var buffY = 4;

var SteinX = 5;
var SteinY = 3;

var SkelettX = 3;
var SkelettY = 4;

var NPCVIL1loaded = true;
var NPCVIL2loaded = true;
var NPCVIL3loaded = true;
var NPCJAGloaded = true;            //loaded sind, um zu überprüfen, ob sie auf der map geladen sind
var NPCMERloaded = true;
var NPCBUFloaded = true;
var NPCSTEloaded = true;
var NPCSKEloaded = true;

var Villager1;
var Villager2;
var Villager3;
var Jaeger;
var Merchant;
var fakehorse;
var Buff;
var Stein;
var Skelett;

var conver = []  ;
var Jaegerconver = [];
var Merchantconver = [];
var Skelettconver = [];
var NPCsx = [];
var NPCsy = [];

window.addEventListener("DOMContentLoaded",()=>
{
  
    Villager1 = new CoolGuy(new Vector2(VILX1,VILY1), new Vector2( 4, 2));  
    Villager2 = new CoolGuy(new Vector2(VILX2,VILY2), new Vector2( 4, 2)); 
    Villager3 = new CoolGuy(new Vector2(VILX3,VILY3), new Vector2( 4, 2)); 
    Jaeger = new CoolGuy(new Vector2(JaegerX,JaegerY), new Vector2(15,1));
    Merchant = new CoolGuy(new Vector2(merchantX,merchantY), new Vector2(20,9));                    //NPC´s kriegen ihre gemalte position
    fakehorse = new CoolGuy(new Vector2(merchantX + 1,merchantY), new Vector2(53,4));
    Buff = new CoolGuy(new Vector2(buffX ,buffY), new Vector2(37,9));
    Stein = new CoolGuy(new Vector2(SteinX ,SteinY), new Vector2(8,11));
    Skelett = new CoolGuy(new Vector2(SkelettX ,SkelettY), new Vector2(21,8));

    Villager1.activeEverywhere = true;
    Villager2.activeEverywhere = true;
    Villager3.activeEverywhere = true;
    Jaeger.activeEverywhere = true;
    Merchant.activeEverywhere = true;
    fakehorse.activeEverywhere = true;
    Buff.activeEverywhere = true;
    Stein.activeEverywhere = true;
    Skelett.activeEverywhere = true;


        NPCsx.push(VILX1);
        NPCsx.push(VILX2);
        NPCsx.push(VILX3);
        NPCsx.push(JaegerX);
        NPCsx.push(merchantX)
        NPCsx.push(buffX);
        NPCsx.push(SteinX);
        NPCsx.push(SkelettX);
                                        // X und Y von möglichen NPC´s werden in ein Array gepusht
        NPCsy.push(VILY1);
        NPCsy.push(VILY2);
        NPCsy.push(VILY3);
        NPCsy.push(JaegerY);
        NPCsy.push(merchantY);
        NPCsy.push(buffY);
        NPCsy.push(SteinY);
        NPCsy.push(SkelettY);

        //              |
        //Skelett texte v
        Skelettconver.push("Na, was geht ab? Ich habe heute alle Knochenwitzbücher durchgelesen!");
        Skelettconver.push("Wisst ihr, warum Skelette immer so ruhig sind? Weil sie keine Nerven haben!");
        Skelettconver.push("Ich habe gehört, dass ich ein wenig zu hohl im Kopf bin. Aber hey, besser hohl als gar nichts im Kopf!");
        Skelettconver.push("Warum tragen Skelette keine Uhren? Weil sie keinen Fleischarm haben, um sie anzulegen!");
        Skelettconver.push("Habt ihr schon mal von einem Skelett gehört, das Angst vor Hunden hat? Es hat Knochenhunde in den Beinen!");
        Skelettconver.push("Was ist der Lieblingssong der Skelette? 'Bad to the Bone' natürlich!");
        Skelettconver.push("Warum sind Skelette schlechte Lügner? Weil man ihnen sofort ins Gesicht sieht, wenn sie die Mundwinkel krumm machen!");
        Skelettconver.push("Was sagt ein Skelett, wenn es sich hinsetzt? 'Ich brauche eine Wirbelpause!'");
        Skelettconver.push("Habt ihr gehört, dass ich beim Tanzen immer die Knochen schwingen lasse? Ich bin der absolute Hüftenschocker!");
        Skelettconver.push("Warum spielen Skelette nie Verstecken? Weil sie immer durchschauen!");
        Skelettconver.push("Was macht ein Skelett im Winter? Es setzt sich an den Knochenkamin und wärmt sich auf!");
        Skelettconver.push("Warum haben Skelette so wenige Freunde? Sie haben einfach zu viel Humor - es knochenurig!");
        Skelettconver.push("Wusstet ihr, dass es unter Skeletten einen echten Knochenkult gibt? Sie sind ganz wild auf Knochen-Tanzpartys!");           
        Skelettconver.push("Warum sind Skelette immer so gut drauf? Weil sie keine Muskeln haben, die sie runterziehen könnten!");
        Skelettconver.push("Wisst ihr, wie ein Skelett seinen Tee trinkt? Aus einer Knorpeltasse, natürlich!");
        Skelettconver.push("Was ist ein Skelett ohne Humor? Ein Knochenbruch!");
        Skelettconver.push("Warum sind Skelette so schlecht im Boxen? Weil sie immer einen Knochenbruch riskieren!");
        Skelettconver.push("Habt ihr gehört, dass Skelette ihr Geld immer in den Knochenmarkt investieren? Sie wissen, wie man den Markt knochenfidel rockt!");
        Skelettconver.push("Warum sind Skelette immer so unentschlossen? Weil sie ihre Meinung nicht in den Knochen geschrieben haben!");
        Skelettconver.push("Was ist der Lieblingssport der Skelette? Knochenschwimmen!");
        Skelettconver.push("Warum sind Skelette gute Detektive? Weil sie immer die Knochenarbeit erledigen!");
        Skelettconver.push("Warum hat das Skelett kein Telefon? Weil es keinen Hörer hat, um abzuheben!");
        Skelettconver.push("Habt ihr gehört, dass Skelette keine Geisterbahn fahren? Sie haben Angst, ihre Knochen zu verlieren!");
        Skelettconver.push("Was ist der Lieblingsfilm der Skelette? 'Die Firma Knöchenhaus'!");
        Skelettconver.push("Warum sollten Skelette niemals Pokern spielen? Sie können ihr Pokerface einfach nicht verstecken!");


        //                 |
        //Wandelnder texte v
        Merchantconver.push("Mein nächstes Zeil ist die Hauptstadt");
        Merchantconver.push("Mein Pferd begleitet mich überall hin");
        Merchantconver.push("Ich bin noch frische 95 Jahre alt");
        Merchantconver.push("Mein  Stand wird in der Stadt aufgemacht");
        Merchantconver.push("Ich bin erst seid 3 Jahren auf reisen");
        Merchantconver.push("Der Weg zur Hauptstadt ist lang, aber die Aussicht auf neue Abenteuer treibt mich an.");
        Merchantconver.push("Die Straßen sind manchmal gefährlich, aber ich habe immer einen wachsamen Blick.");
        Merchantconver.push("Das Reisen ist eine Kunst, die ich über die Jahre perfektioniert habe.");
        Merchantconver.push("Der Himmel heute Nacht ist voller Sterne. Ein wahrhaft magischer Anblick.");
        Merchantconver.push("Die Leute entlang des Weges haben so viele interessante Geschichten zu erzählen.");
        Merchantconver.push("Es ist erstaunlich, wie unterschiedlich die Landschaften auf dem Weg in die Hauptstadt sind.");
        Merchantconver.push("Ein guter Schlaf ist unterwegs oft eine Rarität. Man muss sich an kleine Freuden erfreuen.");
        Merchantconver.push("Ich habe das Vergnügen, viele reisende Seelen kennenzulernen und ihre Geschichten zu hören.");
        Merchantconver.push("Die Hauptstadt ist ein Schmelztiegel der Kulturen und Ideen. So inspirierend.");
        Merchantconver.push("Auf meinen Reisen habe ich einige versteckte Orte entdeckt, die nur wenige kennen.");
        Merchantconver.push("Manchmal vermisse ich die Ruhe meines kleinen Dorfes, aber das Abenteuer ruft.");
        Merchantconver.push("Der Geruch von frischgebackenem Brot in den Dörfern entlang des Weges ist einfach unwiderstehlich.");
        Merchantconver.push("Ich schätze die einfachen Freuden des Lebens, wie einen Sonnenuntergang am Flussufer.");
        Merchantconver.push("Jede Begegnung auf meiner Reise ist eine Gelegenheit, neue Freundschaften zu knüpfen.");
        Merchantconver.push("Die Hauptstadt wird bald in Sicht kommen. Ich bin gespannt, was mich dort erwartet.");
        Merchantconver.push("Mein treuer Begleiter hier ist das schnellste Pferd, das ihr je gesehen habt.");
        Merchantconver.push("Dieses Pferd hat eine erstaunliche Ausdauer. Es ist immer bereit, weitere Meilen zurückzulegen.");
        Merchantconver.push("Unser Pferd hat einen sanften Charakter und ist ein wahrer Freund in jeder Situation.");
        Merchantconver.push("Dieses Pferd ist so klug und gehorsam. Es fühlt sich fast an, als könnte es meine Gedanken lesen.");
        Merchantconver.push("Manchmal habe ich das Gefühl, dass unser Pferd mir Geheimnisse flüstert. Es hat eine unglaubliche Intuition.");


        //            |
        //Jäger texte v
        Jaegerconver.push("Die Tiere sind weg");
        Jaegerconver.push("Die Monster sind eine Nummer zu hoch für mich");
        Jaegerconver.push("Ich habe noch 20 Pfeile in meinem köcher");
        Jaegerconver.push("Ja, ich bin ein centauer");
        Jaegerconver.push("Ich bin der förster in diesem Wald");
        Jaegerconver.push("Die Wälder sind mein Zuhause. Hier finde ich Ruhe und Nahrung.");
        Jaegerconver.push("Als Centaur habe ich den Vorteil der Schnelligkeit und Stärke in der Jagd.");
        Jaegerconver.push("Die Geräusche des Waldes sind wie Musik in meinen Ohren.");
        Jaegerconver.push("Die Spuren im Waldboden verraten mir, welches Wild hier entlanggezogen ist.");
        Jaegerconver.push("Das Gefühl des Bogens in meinen Händen ist unvergleichlich.");
        Jaegerconver.push("Ich kenne jeden Pfad und jede Schlucht in diesem Gebiet.");
        Jaegerconver.push("Die Wildnis gibt mir die Kraft und den Mut, meine Beute zu verfolgen.");
        Jaegerconver.push("Ein erfahrener Jäger weiß, dass Geduld der Schlüssel zum Erfolg ist.");
        Jaegerconver.push("Das Verschmelzen von Mensch und Pferd gibt mir eine besondere Verbindung zur Natur.");
        Jaegerconver.push("Die Geschwindigkeit des Galopps ermöglicht es mir, selbst die schnellsten Tiere einzuholen.");
        Jaegerconver.push("Meine Pfeile fliegen wahr und treffen immer ins Schwarze.");
        Jaegerconver.push("Die Jagd ist eine Kunst, die ich seit meiner Kindheit perfektioniere.");
        Jaegerconver.push("Ich respektiere das Tier, das ich erlege, und verwende jedes Teil für Nahrung und Werkzeuge.");
        Jaegerconver.push("Die Jagd ist nicht nur ein Mittel zum Überleben, sondern auch eine Art der Meditation.");
        Jaegerconver.push("Die Natur gibt mir Hinweise und Signale, die nur ein Jäger verstehen kann.");
        Jaegerconver.push("Die Freiheit und der Adrenalinkick, wenn ich meiner Beute hinterherjage, sind unbeschreiblich.");
        

        //               |
        //Villager texte v
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
        conver.push("Die Ernte war dieses Jahr reichlich, dank des milden Wetters.");
        conver.push("Die Königin hat ein wunderschönes Kleid getragen beim letzten Bankett.");
        conver.push("Meine Frau hat gestern das beste Brot gebacken, das ich je gegessen habe.");
        conver.push("Die Kinder im Dorf haben eine neue Versteckspielvariante erfunden.");
        conver.push("Das Wetter wird immer kühler, der Winter naht.");
        conver.push("Habt Ihr schon gehört, dass der Schmied eine neue Schmiede eröffnet hat?");
        conver.push("Der Händler hat frische Gewürze aus fernen Ländern im Angebot.");
        conver.push("Die Straßen sind zurzeit sicher. Die Wachen leisten gute Arbeit.");
        conver.push("Mein Vater hat mir beigebracht, wie man ein Pferd reitet. Es ist ein unvergleichliches Gefühl.");
        conver.push("Die Apfelbäume im Obstgarten tragen in diesem Jahr besonders süße Früchte.");
        conver.push("Die Bücherei hat eine neue Sammlung alter Geschichten und Legenden erhalten.");
        conver.push("Der Schäfer hat ein neues Schaf in seiner Herde. Es ist besonders zutraulich.");
        conver.push("Meine Großmutter hat mir eine wertvolle Brosche vererbt. Sie sagt, sie bringe Glück.");
        conver.push("Die Schüler in der Dorfschule lernen fleißig und machen gute Fortschritte.");
        conver.push("Der Schmied hat mir gestern einen Nagel geschmiedet, der noch nie so perfekt war.");
        conver.push("Die Dorfbewohner haben beschlossen, eine neue Brücke über den Fluss zu bauen.");
        conver.push("Die Blumen im Garten des Klosters blühen in den schönsten Farben.");
        conver.push("Das Bäckerpaar feiert heute ihren Hochzeitstag. Es gibt eine große Feier.");
        conver.push("Der Wald am Rande des Dorfes ist voller Beeren und Pilze. Perfekt für einen Ausflug.");
        conver.push("Das Pferderennen am Sonntag verspricht spannend zu werden. Ich wette auf den schwarzen Hengst.");

        UpdateNPC();

        
        
        
});

function UpdateNPC()                    //läd die NPC´s, die auf dem karten abschnitt sind
{
    if(mapx == 2 && mapy == 3)              //wenn es der abschnitt ist, wird loaded true gestzt, sie werden sichtbar und  die drawing order wird 100
    {  
       NPCSTEloaded = true;
       Stein.alpha = 1;
       Stein.ChangeDrawingOrder(100);
    }
    else                                       // wenn es nciht ist, wird loaded false und sie werden unsichtbar
    {
        NPCSTEloaded = false;
        Stein.alpha = 0.0;
    }

    if(mapx == 1 && mapy == 1)
    {
        NPCJAGloaded = true;
        Jaeger.alpha = 1.0
        Jaeger.ChangeDrawingOrder(100);                             
    }
    else 
    {
        NPCJAGloaded = false;
        Jaeger.alpha = 0.0;  
    }


    if(mapx == 2 && mapy == 2)
    {
        NPCBUFloaded = true;
        Buff.alpha = 1;
        Buff.ChangeDrawingOrder(100);

        NPCVIL1loaded = true;
        Villager1.alpha = 1;
        Villager1.ChangeDrawingOrder(100);

        NPCVIL2loaded = true;
        Villager2.alpha = 1;
        Villager2.ChangeDrawingOrder(100);

        NPCVIL3loaded = true;
        Villager3.alpha = 1;
        Villager3.ChangeDrawingOrder(100);
    }
    else if (mapx == 3 && mapy == 2)
    {

        NPCBUFloaded = false;
        Buff.alpha = 0.0;  

        NPCVIL1loaded = true;
        Villager1.alpha = 1;
        Villager1.ChangeDrawingOrder(100);

        NPCVIL2loaded = true;
        Villager2.alpha = 1;
        Villager2.ChangeDrawingOrder(100);

        NPCVIL3loaded = true;
        Villager3.alpha = 1;
        Villager3.ChangeDrawingOrder(100);
    }
    else 
    {
        NPCBUFloaded = false;
        Buff.alpha = 0.0;  

        NPCVIL1loaded = false;  
        Villager1.alpha = 0.0;

        NPCVIL2loaded = false;  
        Villager2.alpha = 0.0;

        NPCVIL3loaded = false;  
        Villager3.alpha = 0.0;
    }


    if(mapx == 2 && mapy == 1)
    {
        NPCMERloaded = true;
        Merchant.alpha = 1.0
        Merchant.ChangeDrawingOrder(100);
        fakehorse.alpha = 1;
        fakehorse.ChangeDrawingOrder(100);
    }
    else 
    {
        NPCMERloaded = false;
        Merchant.alpha = 0.0;  
        fakehorse.alpha = 0;
    }

    if(mapx == 3 && mapy == 3)
    {
        console.log(SkelettX,SkelettY);
        NPCSKEloaded = true;
        Skelett.alpha = 1;
        Skelett.ChangeDrawingOrder(100);
    }
    else 
    {
        NPCSKEloaded = false;
        Skelett.alpha = 0;
    }

    

}

    window.addEventListener("OnMapChange",()=>{                 //bei einem Karten abschnitt wechsel wird Update NPC geladen (guckt welcher abschnitt geladen ist und läd die npc´s darauf)
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
        if (((NPCVIL1loaded == true) | (NPCVIL2loaded == true) | (NPCVIL3loaded == true)) && (player.pos.x != buffX && player.pos.y != buffY))      //wenn mit einem der villager geredet wird, dann wird ein conver text gewählt
        {
            var zufallsx = Math.floor((Math.random() * conver.length));
            alert(conver[zufallsx]);
        }

        if (NPCBUFloaded == true && (Math.round(player.pos.x) == Math.round(buffX) && Math.round(player.pos.y) == (Math.round(buffY)+1)))       //checkt ob man vor dem buff typ steht und ob der geladen ist
        {
            alert("Hey bro, du siehst stark aus! Im westen vom Strand ist etwas böses, irgendeine Dunkle Magie");
        }

        if (NPCJAGloaded == true)
        {
            var zufallsj = Math.floor((Math.random() * Jaegerconver.length));
            alert(Jaegerconver[zufallsj]);
        }

        if (NPCMERloaded == true)
        {
            var zufallsm = Math.floor((Math.random() * Merchantconver.length));                     //sobald  einer der loadeds true ist, wird die conversation von dem NPc geladen
            alert(Merchantconver[zufallsm]);
        }

        if (NPCSTEloaded == true)
        {
            alert("*Stein geräusche*");
        }

        if ((NPCSKEloaded == true))
        {
            var zufallsS = Math.floor((Math.random() * Skelettconver.length));
            alert(Skelettconver[zufallsS]);
        }
      
    }

    class CoolGuy extends GameObject
    {

        constructor(pos, sprite)
        {
            super(pos,sprite);
        }
    }
