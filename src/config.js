import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scale: {
    width: 500,
    height: 320,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    // specify engine we will use
    default: 'arcade',
    arcade: {
      // configure world <static> ArcadeWorldConfighttps://docs.phaser.io/api-documentation/typedef/types-physics-arcade
      gravity: {
        y: 750
      },
      // for debugging
      debug: true,
      debugShowVelocity: true,
      debugShowBody: true,
      debugShowStaticBody: true,
    }
  },
};
