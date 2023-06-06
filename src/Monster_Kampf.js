//Klassen für die spiel Bestandteile werden erstellt
class Held{
    constructor(x,y,schluessel,schwert,lebendig,leben)
    {
        this.x = x;
        this.y = y;
        this.schluessel = schluessel;
        this.schwert = schwert
        this.lebendig = lebendig;
        this.leben = leben;
    };
};
class sword {
    constructor(damage,x,y) {
        this.damage = damage;
        this.x = x;
        this.y = y;
    }
}
class Monster{
    constructor(x,y,lebendig,leben){
        this.x = x;
        this.y = y;
        this.lebendig = lebendig;
        this.leben = leben;
    };
};

//werte werde den Klassen hinzugefuegt
var held = new Held(4*sgx,1*sgy,false,schwert,false,3);
var Schwert1 = new sword(1,3*sgx,5*sgy);
var Schwert2 = new sword(2,4*sgx,5*sgy);
var Schwert3 = new sword(3,5*sgx,5*sgy)
var monster1 = new Monster(2*sgx,2*sgy,true,1);
var monster2 = new Monster(5*sgx,4*sgy,true,2);
var monster3 = new Monster(9*sgx,7*sgy,true,3);
var monster4 = new Monster(10*sgx,13*sgy,true,4);
schwert = [Schwert1,Schwert2,Schwert3]

//Monster und Held werden gezeichnet
function hintergrund() {
    if (monster1.lebendig==true) {
    context.drawImage(sprites,3*sgx,2*sgy,sgx,sgy,monster1.x,monster1.y,sgx,sgy);   
   }
   if (monster2.lebendig==true) {
    context.drawImage(sprites,50*sgx,2*sgy,sgx,sgy,monster2.x,monster2.y,sgx,sgy); 
   }
   if (monster3.lebendig==true) {
       context.drawImage(sprites,29*sgx,8*sgy,sgx,sgy,monster3.x,monster3.y,sgx,sgy); 
   }
   if (monster4.lebendig==true){
       context.drawImage(sprites,11*sgx,8*sgy,sgx,sgy,monster4.x,monster4.y,sgx,sgy); 
   }
   if(held.leben==true){
        context.drawImage(sprites,3*sgx,9*sgy,sgx,sgy,held.x,held.y,sgx,sgy)
   }
}

//Erstellt Schwerter
function schwertplus() {
    if (held.x/sgx==18&&held.y/sgy==7) {
        
        zeichne();
    }
}

//Tastenklick events werden hinzugefuegt
function tasten(event){

    if (event.keyCode==37||event.keyCode==65) {//links
      if (map[held.y/sgy][(held.x/sgx)-1]!=1){        
         if (map[held.y/sgy][(held.x/sgx)-1]!=4) {
          held.x = held.x-sgx;
          zeichne()
         }
        }
    }
  
  if (event.keyCode==38||event.keyCode==87) {//hoch
    if (map[(held.y/sgy)-1][held.x/sgx]!=1){        
        if (map[(held.y/sgy)-1][held.x/sgx]!=4) {
         held.y = held.y-sgx;
         zeichne()
   }
};
  
  if (event.keyCode==39||event.keyCode==68) {//rechts
    if (map[held.y/sgy][(held.x/sgx)+1]!=1){        
        if (map[held.y/sgy][(held.x/sgx)+1]!=4) {
         held.x = held.x+sgx;
         zeichne()
   }
}
  }  
  
  if (event.keyCode==40||event.keyCode==83) {//runter
    if (map[(held.y/sgy)+1][held.x/sgx]!=1){        
        if (map[(held.y/sgy)+1][held.x/sgx]!=4) {
         held.y = held.y+sgx;
         zeichne()
        }
    }
 }
  
  if (event.keyCode==32) {//space
      schwertplus();
      toroeffnen();
      levelbeenden();
      naechstesLevel();
      zeichne();
  }
  }
}

//Vergleich ob Spieler und Monster auf dem gleichen Feld stehen.
//Schaden des scwertes wird von den Leben der Monster abgezogen
function Kampf() {
    if (held.x==monster1.x&&held.y==monster1.y) {
        if (held.schwert || held.cSchwert) {
            monster1.leben -= Schwert.damage;
            if (monster1.leben <= 0) {
                monster1.lebendig = false
            }
            if (monster1.lebendig == false) {
                monster1.x = 34 * sgx;
                monster1.y = 34 * sgx;
            }
        }else if(held.schwert == false|| held.cSchwert == false){
            held.leben -= 1;
        }
    }

        if (held.x==monster2.x&&held.y==monster2.y) {
            if (held.schwert || held.cSchwert) {
                monster2.leben -= Schwert.damage;
                if (monster2.leben <= 0) {
                    monster2.lebendig = false
                }
                if (monster2.lebendig == false) {
                    monster2.x = 34 * sgx;
                    monster2.y = 34 * sgx;
                }
            }else if(held.schwert == false|| held.cSchwert == false){
                held.leben -= 1;
            }
        }
        
        if (held.x==monster3.x&&held.y==monster3.y) {
            if (held.schwert || held.cSchwert) {
                monster3.leben -= Schwert.damage;
                if (monster3.leben <= 0) {
                    monster3.lebendig = false
                }
                if (monster3.lebendig == false) {
                    monster3.x = 34 * sgx;
                    monster3.y = 34 * sgx;
                }
            }else if(held.schwert == false|| held.cSchwert == false){
                held.leben -= 1;
            }
        }

        if (held.x==monster4.x&&held.y==monster4.y) {
            if (held.schwert || held.cSchwert) {
                monster4.leben -= Schwert.damage;
                if (monster4.leben <= 0) {
                    monster4.lebendig = false
                }
                if (monster4.lebendig == false) {
                    monster4.x = 34 * sgx;
                    monster4.y = 34 * sgx;
                }
            }else if(held.schwert == false|| held.cSchwert == false){
                held.leben -= 1;
            }
        }
        
}