const moves = {
  moveForwardRight: function () {
    player.moveForwardRight();
  },
  moveForwardLeft: function () {
    player.moveForwardLeft();
  },
  jumpLeft: function () {
    // player.velocity.x -= 64;
    // if (player.velocity.y === 0) player.velocity.y = -25;
    // player.update();
    player.jumpLeft();
  },
  jumpRight: function () {
    player.jumpRight();
  },
  openDoor: function () {
    openDoorFunc();
  },
};

// Convert JavaScript function into Python object that is callable:
Sk.builtins.move_right = function () {
  moves.moveForwardRight();
};

Sk.builtins.move_left = function () {
  moves.moveForwardLeft();
};

Sk.builtins.jump_left = function () {
  moves.jumpLeft();
};

Sk.builtins.jump_right = function () {
  moves.jumpRight();
};

Sk.builtins.open_exit = function () {
  moves.openDoor();
};
