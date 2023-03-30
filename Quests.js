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