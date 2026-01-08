import Phaser from 'phaser';
import Hero from '../entities/Hero';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
      frameWidth: 32,
      frameHeight: 64,
      // you can add startFrame or endFrame
    });
  }

  create(data) {
    // convenient way to use up, left, right down and space
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // sprite can support animation
    this.anims.create({
      key: 'hero-running',
      // you can add configs
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      frameRate: 10, // speed
      repeat: -1 // loop
    });
    
    this.hero = new Hero(this, 250, 160);

    // adding new platform
    const platform = this.add.rectangle(220, 240, 260, 10, 0x4BcB7C);
    // add it to physics world
    // true means static, cannot be moved by object
    this.physics.add.existing(platform, true);
    // make our hero interact with the platform
    this.physics.add.collider(this.hero, platform)
  }

  update(time, delta) {}
}

export default Game;