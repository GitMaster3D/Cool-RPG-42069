const questClicks = {};
var quests = false;
var questslvl=new quests1;
var Bossquests=false

quests1=0;

const questClick = ({dataset: {count: c, reward : r}}) => {
  questClicks[r] += 1;
  if(questClicks[r] >= c) document.querySelector(`#${r}`).style.display = 'block';
};

document.addEventListener('click', ({target}) => {
  if(target.matches('.quest')) {
    questClick(target);
  }
});

// Init all quests
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.quest').forEach(({dataset: { reward: r }}) => questClicks[r] = 0);
});
if (quests == true)
{
  quests1++;
  quests=false;
}

if(quests1==1)
{
  xp=xp+5;
}

if(quests1==2)
{
  xp=xp+(5*2);
}
  
if((level>=50)&&(quests1==30))
{
  Bossquests=true;
}
