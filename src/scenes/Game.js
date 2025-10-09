import Phaser from 'phaser';
import Hero from '../entities/Hero';

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
    // convenient way to use up, left, right down and space
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown-SPACE', () => {
      console.log('Pressed space')
    })

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // subscribe to an event, like when space key is 'released' (up)
    this.space.on('up', () => {
      console.log('Released space')
    })

    // sprite can support animation
    this.anims.create({
      key: 'hero-running',
      // you can add configs
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      frameRate: 10, // speed
      repeat: -1 // loop
    });
    
    this.hero = new Hero(this, 250, 160);
  }

  update(time, delta) {
    if (this.cursorKeys.left.isDown) {
      console.log('holding a space')
    }
  }
}

export default Game;