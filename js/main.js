const HanoiView = require('./hanoi-view');
const HanoiGame = require('./game');

$( () => {
  const el = $('.toh');
  const game = new HanoiGame();
  console.log("working");
  new HanoiView(game, el);
});
