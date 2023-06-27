var Kräuter = 0;
var Wasser = 0;
var Sand = 0;
var Eisen = 0;
var Holz = 0;
var Leder = 0;
var Aquamarin = 0;
var Silber = 0;
var Trank = 0;

//mapx/mapy
var KräuterQuestFertig = false;
var WasserQuestFertig = false;
var SandQuestFertig = false;
var EisenQuestFertig = false;
var HolzQuestFertig = false;
var LederQuestFertig = false;
var AquamarinQuestFertig = false;
var SilberQuestFertig = false;
var TrankBrauenQuestFertig = false;


function Quest(){
    if(mapx == 0 && mapy == 0){
        KräuterSammeln();
        if(KräuterQuestFertig == true){
            WasserSammeln();

            if(WasserQuestFertig == true){
                SandSammeln();

                if(SandQuestFertig == true){
                    document.getElementById("p1").innerHTML = "Quest 1 erfolgreich abgeschlossen!";
                }
            }
        }
    }else
        if(mapx == 0 && mapy == 0){       //FEHLER------------------
            //Ressourcen Wasser, Sand, Kräuter gegen Trank im Inventar, im Shop, tauschen (QUEST2)
            
            Trank++;

        }else 
            if(mapx == 1 && mapy == 0){
                EisenSammeln();
                if(EisenQuestFertig == true){
                    HolzSammeln();

                        if(HolzQuestFertig == true){
                            document.getElementById("p1").innerHTML = "Quest 3 erfolgreich abgeschlossen!";
                        }
                }
            }else 
                if(mapx == 1 && mapy == 0){
                //ressourcen Holz, Eisen gegen Schwert im Inventar, im Shop, tauschen (QUEST4)
                }else
                    if(mapx == 0 && mapy == 1){
                        HolzSammeln();
                        if(HolzQuestFertig == true){
                            EisenSammeln();
                            if(EisenQuestFertig == true){
                                document.getElementById("p1").innerHTML = "Quest 5 erfolgreich abgeschlossen!";
                            }
                        }
                    }else 
                        if(mapx == 1 && mapy == 0){
                            //Ressourcen Holz, Eisen gegen ein Boot im Inventar, im Shop, tauschen (6)
                        }else 
                            if(mapx == 1 && mapy == 1){
                                SandSammeln();
                                if(SandQuestFertig == true){
                                    HolzSammeln();
                                    if(HolzQuestFertig== true){
                                        document.getElementById("p1").innerHTML = "Quest 7 erfolgreich abgeschlossen!";
                                    }
                                }
                            }else 
                                if(mapx == 1 && mapy ==1){
                                    //Ressourcen Sand, Holz gegen Spiegel im Inventar, im Shop, tauschen (QUEST8)
                                }else   
                                    if(mapx == 1 && mapy ==1){
                                        LederSammeln();
                                        if(LederQuestFertig == true){
                                            AquamarinSammeln();
                                            if(AquamarinQuestFertig == true){
                                                SilberSammeln();
                                                if(SilberQuestFertig == true){
                                                    document.getElementById("p1").innerHTML = "Quest 9 erfolgreich abgeschlossen!";
                                                }
                                            }
                                        }
                                    }



}

function KräuterSammeln(){
    if (Kräuter == 5){
        KräuterQuestFertig = true;
    }
}

function WasserSammeln(){
    if (Wasser == 5){
        WasserQuestFertig = true;
    }
}

function SandSammeln(){
    if (Sand == 5){
        SandQuestFertig = true;
    }
}

function HolzSammeln(){
    if (Holz == 5){
        HolzQuestFertig = true;
    }
}

function LederSammeln(){
    if (Leder == 5){
        Öeder = true;
    }

}

function AquamarinSammeln(){
    if (Aquamarin == 1){
        AquamarinQuestFertig = true;
    }
}

function SilberSammeln(){
    if (Silber == 1){
        SilberQuestFertig = true;
    }
}

function EisenSammeln(){
    if (Eisen == 1){
       EisenQuestFertig = true;
    }
}