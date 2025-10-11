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
    // x, y
    this.body.setMaxVelocity(250, 400);
    // slow character down when not accelerating
    this.body.setDragX(750);

    this.keys = scene.cursorKeys;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.keys.left.isDown) {
      // move character to the left
      this.body.setAccelerationX(-1000);

      // horizontally flip rendering of sprite
      this.setFlipX(true);

      // position the collision box properly
      this.body.offset.x = 8;
    } else if (this.keys.right.isDown) {
      // move character to the right
      this.body.setAccelerationX(1000);
      // reset
      this.setFlipX(false);
      this.body.offset.x = 12;
    } else {
      this.body.setAccelerationX(0);
    }

    // tell us whether the key has just been pressed down or not.
    // note about this method is that it will only return true the first time that you call
    // if you want to use the the result of the test multiple times within a single frame you really need
    // to assign it to a variable like we're doing here.
    const didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

    // jump logic, it will automatically pulled down
    // onFloor() - make sure that it will jump if body is on the floor
    if (didPressJump && this.body.onFloor()) {
    // if (this.keys.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-400);
    }

    // if you hold the up button, it will jump full -400
    // if you just tap the up button, it will limit the jump to 150
    if (!this.keys.up.isDown && this.body.velocity.y < -150) {
      this.body.setVelocityY(-150);
    }
  }
}

export default Hero;