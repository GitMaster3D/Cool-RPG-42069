
var money=0,level=1,xp=0,levelxp=5,questsxp=0;

function updatecounters()
{
    
    if (quests1=true) //if quests done give XP to player
    {
        questsxp+5;
    }
    
    if(quests2=true)
    {
        questsxp+(5*2);
    }
    
    if (quests3=true)
    {
        questsxp+((5*2)*2);
    }
    
    xp=questsxp;
    questsxp=0;
    
    if (xp > levelxp) 
    {
        
        level+Math.floor(xp/levelxp);
        levelxp=(levelxp*2)/1,25;// je höher der Level desto mehr xp muss man leveln
        xp=0;//nach jeden levelup wird die exp anzahl auf 0 gesetzt

     }
     // Je höher der Level desto mehr XP braucht man

     if (level==10)
     {
        //freischalten Item
     }
     
     if (level==20)
     {
        //freischalten Item
     }

     if(level ==30)
     {
        //freischalten Item
     }

     if(level==40)
     {
        //freischalten Item
     }

     if(level==50)
     {
        //freischalten Item
     }

     if(level==60)
     {
        //freischalten Item
     }

     if(level==70)
     {
        //freischalten Item
     }

     if(level==80)
     {
        //freischalten Item
     }

     if(level==90)
     {
        //freischalten Item
     }

     if(level==100)
     {
        
        //freischalten Boss
        //freischalten Item
     }

     if(level==101)
     {
        //specialItams nur mit über level 100
     }

     if(level==102)
     {
        //specialItams nur mit über level 100
     }

     if(level==103)
     {
        //specialItams nur mit über level 100
     }

     if(level==104)
     {
        //specialItams nur mit über level 100
     }

     if(level==105)
     {
        //specialItams nur mit über level 100
     }

     document.getElementById("money").innerHTML = 'Money: ' + money;
        document.geElementById("xp").innerHTML = 'XP: ' + xp;
document.getElementById("level").innerHTML = 'Current level: ' + level;

}

function giveExp(number)
{

    money +=  50;
     xp +=  100;
     updatecounters();//update

}

window.onload=updatecounters;//onload init counters
