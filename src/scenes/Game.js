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
    this.add.sprite(400, 300, 'hero-run-sheet', 5);
  }

  update(time, delta) {}
}

export default Game;