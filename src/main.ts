import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
// import { GameOver } from './scenes/GameOver';
// import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    backgroundColor: '#028af8',
    height: 768,
    parent: 'game-container',
    physics: {
        arcade: {
            debug: true,
            // debug: false,
            gravity: { x: 0, y: 300 } // TODO: What is the x value for?
        },
        default: 'arcade'
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT
    },
    scene: [
        Boot,
        Preloader,
        // MainMenu,
        MainGame,
        // GameOver
    ],
    type: Phaser.AUTO,
    width: 1024
};

export default new Game(config);
