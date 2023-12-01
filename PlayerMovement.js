function moveForwardRight(units) {
  player.moveRight();
}

function moveForwardLeft(units) {
  player.moveLeft();
}

Sk.builtins.moveForwardRight = function (units) {
  moveForwardRight(units);
};
Sk.builtins.moveForwardLeft = function (units) {
  moveForwardLeft(units);
};
