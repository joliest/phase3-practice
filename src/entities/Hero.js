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
  }

}

export default Hero;