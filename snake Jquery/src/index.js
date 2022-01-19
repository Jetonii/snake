const SnakeView = require('./js/snake-view');

$(function () {
  const rootEl = $('.snake-game');
  new SnakeView(rootEl);
});
