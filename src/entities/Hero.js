import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

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
    this.input = {};

    this.setupMovement();
  }

  setupMovement() {
    this.moveState = new StateMachine({
      init: 'standing',
      transitions: [
        { name: 'jump', from: 'standing', to: 'jumping'},
        { name: 'flip', from: 'jumping', to: 'flipping'},
        { name: 'fall', from: 'standing', to: 'falling'},
        { name: 'touchdown', from: ['jumping', 'flipping', 'falling'], to: 'standing'}, // from can be set to * (wildcard)
      ],
      methods: {
        // give us info about state change and transition
        onEnterState: (lifecycle) => {
          console.log(lifecycle)
        },
        // there are lifecycle like onEnterJumping()
        onJump: () => {
          this.body.setVelocityY(-400);
        },
        onFlip: () => {
          this.body.setVelocityY(-300);
        },
      },
    });

    this.movePredicates = {
      // each of these will return boolean 
      // whether we should make the matching transition
      jump: () => {
        return this.input.didPressJump;
      },
      flip: () => {
        return this.input.didPressJump;
      },
      fall: () => {
        return !this.body.onFloor();
      },
      touchdown: () => {
        return this.body.onFloor();
      },
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

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

    // if you hold the up button, it will jump full -400
    // if you just tap the up button, it will limit the jump to 150
    if (this.moveState.is('jumping') || this.moveState.is('flipping')) {
      if (!this.keys.up.isDown && this.body.velocity.y < -150) {
        this.body.setVelocityY(-150);
      }      
    }

    // code that calls transitions, check what transitions are valid
    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        this.moveState[t]();
        break;
      }
    }
  }
}

export default Hero;