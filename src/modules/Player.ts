import {
  Actor,
  vec,
} from 'excalibur';

import Assets from './Assets';

export class Player extends Actor {
    constructor() {
        super({
            pos: vec(150, 150),
            vel: vec(0, 0),
            width: 100,
            height: 100
        });
    }

    onInitialize() {
        this.graphics.add(Assets.test.toSprite());
        void Assets.test.load()
        
    }
}