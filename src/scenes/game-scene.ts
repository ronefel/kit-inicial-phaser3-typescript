import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Physics.Arcade.Sprite;
  private platforms: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    this.player = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'man');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(300);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'platform').setScale(0.5).refreshBody();
    this.platforms.create(200, 400, 'platform').setScale(0.5).refreshBody();
    this.platforms.create(400, 100, 'platform').setScale(0.5).refreshBody();
    this.platforms.create(100, 250, 'platform').setScale(0.5).refreshBody();
    this.platforms.create(700, 220, 'platform').setScale(0.5).refreshBody();

    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.setSize(getGameWidth(this), getGameHeight(this));

    this.cameras.main.startFollow(this.player, true, 0.14, 0.14);
    //this.cameras.main.setZoom(1.8);

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  public update(): void {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-this.speed);

      //this.player.anims.play('left', true);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(this.speed);

      //this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      //this.player.anims.play('turn');
    }

    if (this.cursorKeys.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
    }
  }
}
