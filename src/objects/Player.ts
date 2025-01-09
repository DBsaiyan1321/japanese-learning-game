/*
Got this idea from here https://github.com/HR-CMGT/CLE4-phaser-workshop?tab=readme-ov-file#adding-a-sprite,
so make sure you understand it.
*/
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, 100, 100, 'idle');
    }
}