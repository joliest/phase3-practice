import Phaser from 'phaser';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
      frameWidth: 32,
      frameHeight: 64,
      // you can add startFrame or endFrame
    });
  }

  create(data) {
    // sprite can support animation
    this.anims.create({
      key: 'hero-running',
      // you can add configs
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      frameRate: 10, // speed
      repeat: -1 // loop
    });

    this.player = this.add.sprite(400, 300, 'hero-run-sheet');
    this.player.anims.play('hero-running'); // assign key
  }

  update(time, delta) {}
}

export default Game;