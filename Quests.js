const questClicks = {};

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

<div id='sword-quest' class='quest' data-count='5' data-reward='sword'>Click Me Lots !!</div>
<div class='reward' id='sword'>Here is a sword</div>

<div id='shield-quest' class='quest' data-count='3' data-reward='shield'>Click Me Lots !!</div>
<div class='reward' id='shield'>Here is a sword</div>
