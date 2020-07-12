import Phaser from 'phaser';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
