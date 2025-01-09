import { Scene } from 'phaser';

// TODO: Create a separate class for all objects in the scene. So platform, player, etc. If it's an object in the game, it should
// have its own class. OOP. Don't forget that.
export class Game extends Scene {
    background: Phaser.GameObjects.Image;
    camera: Phaser.Cameras.Scene2D.Camera;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    floors: Phaser.GameObjects.Group;
    jumpHeight: number = 100;
    msg_text : Phaser.GameObjects.Text;
    /*
    It's a Phaser.Physics.Arcade.Sprite because we have the physics set to 'arcade' in the config, and the player is a sprite of that.
    Post: https://stackoverflow.com/questions/64825479/property-does-not-exist-on-union-type-on-phaser-with-typescript
    Github: https://github.com/HR-CMGT/CLE4-phaser-workshop
    */
    player: Phaser.Physics.Arcade.Sprite;
    runSpeed: number = 300;

    constructor() {
        super('Game');
    }

    preload() {
        // setPath is so I do not have to use relative paths for the spritesheets
        this.load.setPath('assets/sprites');
        this.load.spritesheet('run', 'Run.png', { frameHeight: 200, frameWidth: 200 });
        this.load.spritesheet('idle', 'Idle.png', { frameHeight: 200, frameWidth: 200 });
        this.load.spritesheet('jump', 'Jump.png', { frameHeight: 200, frameWidth: 200 });
        this.load.spritesheet('fall', 'Fall.png', { frameHeight: 200, frameWidth: 200 });

        this.load.setPath('assets')
        this.load.image('tile', 'Assets_City.png');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            align: 'center',
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8
        });

        this.msg_text.setOrigin(0.5);

        // this.input.once('pointerdown', () => {
        //     this.scene.start('GameOver');
        // });

        this.player = this.physics.add.sprite(100, 100, 'idle');
        this.createPlayerAnimations();
        
        // TODO: Find the bounds of your world / window, because that's what needs to be used
        // this.physics.world.setBounds(0, 0, 400, 400);

        this.floors = this.physics.add.group({
            allowGravity: false,
            immovable: true
        })

        this.floors.create(100, 400, 'tile');

        this.physics.add.collider(this.player, this.floors);

        /*
        The Scene Input Manager Plugin.
        this.input.keyboard property will only be available if defined in the Scene Injection Map
        and the plugin is installed. Hence why we have to use optional chaining.
        Post: https://phaser.discourse.group/t/what-is-the-scene-injection-map-and-where-is-it-documented/10219
        Github: https://github.com/phaserjs/phaser/blob/v3.55.2/src/scene/InjectionMap.js
        */
        this.cursors = this.input.keyboard?.createCursorKeys();

    
    }

    update() {
        // Horizontal movement handling
        if (this.cursors?.left.isDown) {
            this.moveLeft();
        } else if (this.cursors?.right.isDown) {
            this.moveRight();
        } else {
            this.idle();
        }

        if (this.cursors?.space.isDown) {
            this.jump();
        }
    }

    createPlayerAnimations() {
        this.anims.create({
            key: 'idleAnimation',
            frames: this.anims.generateFrameNumbers('idle', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'runAnimation',
            frames: this.anims.generateFrameNames('run', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 16,
            repeat: -1
        })

        this.anims.create({
            key: 'jumpAnimation',
            frames: this.anims.generateFrameNumbers('jump', { frames: [0, 1] }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'fallAnimation',
            frames: this.anims.generateFrameNames('fall', { frames: [0, 1] }),
            frameRate: 4,
            repeat: -1
        })
    }

    moveLeft() {
        this.player.setVelocityX(-this.runSpeed);
        this.player.flipX = true;
        this.player.play('runAnimation', true);
    }

    moveRight() {
        this.player.setVelocityX(this.runSpeed);
        this.player.flipX = false;
        this.player.play('runAnimation', true);
    }

    idle() {
        this.player.setVelocityX(0);
        this.player.play('idleAnimation', true);
    }

    // TODO: The jump feels way too floaty. But it works. I will tweak it later once I flesh the game out more.
    jump() {
        this.player.setVelocityY(-this.jumpHeight);
        this.player.play('jumpAnimation', true);
    }
}
