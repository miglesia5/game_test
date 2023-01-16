// create a new Phaser game object with a game canvas of 800x600
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// preload assets
function preload() {
  game.load.image('player', 'player.png');
  game.load.image('enemy', 'enemy.png');
  game.load.image('level', 'level.png');
}

// create game objects
var player;
var enemies;
var level;

function create() {
  // create the player sprite
  player = game.add.sprite(400, 300, 'player');
  player.anchor.setTo(0.5, 0.5);

  // create a group of enemies
  enemies = game.add.group();
  for (var i = 0; i < 10; i++) {
    var enemy = game.add.sprite(Math.random() * 800, Math.random() * 600, 'enemy');
    enemy.anchor.setTo(0.5, 0.5);
    enemies.add(enemy);
  }

  // create the level background
  level = game.add.sprite(0, 0, 'level');
}

// update function, called every frame
function update() {
  // move the player based on user input
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    player.x -= 5;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    player.x += 5;
  }

  // check for collision between player and enemies
  game.physics.arcade.overlap(player, enemies, collisionHandler, null, this);
}

// collision handler function
function collisionHandler(player, enemy) {
  enemy.kill();
}
