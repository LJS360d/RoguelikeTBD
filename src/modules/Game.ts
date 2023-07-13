import {
  Color,
  Engine,
} from 'excalibur';

import { Player } from './Player';

class Game extends Engine {
    constructor(canvasRef: HTMLCanvasElement) {
        super({
            canvasElement: canvasRef,
            backgroundColor: Color.Black,
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        });
    }


    initialize() {
        void this.start();
    }

    addPlayer(player: Player): void {
        this.add(player);

    }
}


export default Game;