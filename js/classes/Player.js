class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
    super({ imageSrc, frameRate, animations, loop });
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }

  update(nums) {
    // this is the blue box
    // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.updateHitbox();

    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )

    this.checkForVerticalCollisions();
  }

  moveRight() {
    this.switchSprite("runRight");
    this.velocity.x = 5;
    this.lastDirection = "right";
  }

  moveLeft() {
    this.switchSprite("runLeft");
    this.velocity.x = -5;
    this.lastDirection = "left";
  }

  handleInput(keys) {
    if (this.preventInput) return;
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.moveRight();
    } else if (keys.a.pressed) {
      this.moveLeft();
    } else {
      if (this.lastDirection === "left") this.switchSprite("idleLeft");
      else this.switchSprite("idleRight");
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exists
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x axis going to the left
        if (this.velocity.x < -0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exists
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
// const playerObj = new Player({
//   imageSrc: "./img/king/idle.png",
//   frameRate: 11,
//   animations: {
//     idleRight: {
//       frameRate: 11,
//       frameBuffer: 2,
//       loop: true,
//       imageSrc: "./img/king/idle.png",
//     },
//     idleLeft: {
//       frameRate: 11,
//       frameBuffer: 2,
//       loop: true,
//       imageSrc: "./img/king/idleLeft.png",
//     },
//     runRight: {
//       frameRate: 8,
//       frameBuffer: 4,
//       loop: true,
//       imageSrc: "./img/king/runRight.png",
//     },
//     runLeft: {
//       frameRate: 8,
//       frameBuffer: 4,
//       loop: true,
//       imageSrc: "./img/king/runLeft.png",
//     },
//     enterDoor: {
//       frameRate: 8,
//       frameBuffer: 4,
//       loop: false,
//       imageSrc: "./img/king/enterDoor.png",
//       onComplete: () => {
//         console.log("completed animation");
//         gsap.to(overlay, {
//           opacity: 1,
//           onComplete: () => {
//             level++;

//             if (level === 4) level = 1;
//             levels[level].init();
//             player.switchSprite("idleRight");
//             player.preventInput = false;
//             gsap.to(overlay, {
//               opacity: 0,
//             });
//           },
//         });
//       },
//     },
//   },
// });
