import Phaser from 'phaser';

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {

    // because we're creating the hero directly the factory methods before we're adding our game objects
    // to this scene and they were also adding them to the physics world.
    // But that's just not happening anymore so we need to do that manually.
    // key: 'hero-run-sheet'
    // default frame: 0
    super(scene, x, y, 'hero-run-sheet', 0)

    // ensures that our game object actually gets added to the
    // game world and to the physics world.  
    scene.add.existing(this);

    // This is how it looks in Game.js:
    // this.player = this.physics.add.sprite(250, 160, 'hero-run-sheet');
    // adds physics (e.g. gravity) to our object
    scene.physics.add.existing(this);

    this.anims.play('hero-running');

    
    // should collide with boundary of world
    this.body.setCollideWorldBounds(true)
    this.body.setSize(12,40);
    this.body.setOffset(12,23);

    this.keys = scene.cursorKeys;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.keys.left.isDown) {
      // move character to the left
      this.body.setVelocityX(-250);

      // horizontally flip rendering of sprite
      this.setFlipX(true);

      // position the collision box properly
      this.body.offset.x = 8;
    } else if (this.keys.right.isDown) {
      // move character to the right
      this.body.setVelocityX(250);
      // reset
      this.setFlipX(false);
      this.body.offset.x = 12;
    } else {
      this.body.setVelocityX(0);
    }
  }
}

export default Hero;